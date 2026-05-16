/**
 * StateManager.js — Sistema de Persistencia Local con IndexedDB
 * AEGIS v6.0 — Módulo Core de Almacenamiento
 * 
 * Responsabilidades:
 * - Gestión de estado persistente usando IndexedDB (50MB+ vs 5MB localStorage)
 * - CRUD de datos de usuario (XP, nivel, racha, progreso)
 * - Historial de sesiones de estudio
 * - Proofs of Work (validación de comprensión)
 * - Export/Import JSON para backups manuales
 * 
 * Arquitectura: Sin backend, 100% local, monousuario
 */

const DB_NAME = 'AEGIS_Personal_v6';
const DB_VERSION = 1;

// Estructura de estado por defecto
const DEFAULT_STATE = {
  version: '6.0',
  xp: 0,
  level: 1,
  streak: 0,
  combo: 0,
  lastStudyDate: null,
  completedSources: [],
  sourceProgress: {}, // { sourceId: percentage (0-100) }
  achievements: [],
  theme: 'dark',
  // Ritmo circadiano
  energyProfile: {
    morningPerson: true,
    peakHours: [9, 10, 11],
    lowEnergyHours: [22, 23, 0, 1, 2, 3, 4, 5, 6],
    lastReportedEnergy: null,
    lastReportDate: null,
    energyHistory: []
  },
  // Configuración personal
  config: {
    geminiUrl: 'https://gemini.google.com',
    notebooklmUrl: 'https://notebooklm.google.com',
    pomodoroDuration: 25,
    breakDuration: 5,
    autoBackup: true
  }
};

class StateManager {
  constructor() {
    this.db = null;
    this.cache = new Map();
    this.initialized = false;
  }

  /**
   * Inicializa la conexión a IndexedDB
   * Crea stores si no existen
   */
  async init() {
    if (this.initialized) return this;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[StateManager] Error abriendo IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.initialized = true;
        console.log('[StateManager] IndexedDB inicializada correctamente');
        resolve(this);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log('[StateManager] Creando/actualizando stores...');

        // Store principal de estado (key-value)
        if (!db.objectStoreNames.contains('state')) {
          db.createObjectStore('state', { keyPath: 'key' });
        }

        // Store de sesiones de estudio
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', {
            keyPath: 'id',
            autoIncrement: true
          });
          sessionsStore.createIndex('date', 'date', { unique: false });
          sessionsStore.createIndex('sourceId', 'sourceId', { unique: false });
        }

        // Store de proofs of work
        if (!db.objectStoreNames.contains('proofs')) {
          const proofsStore = db.createObjectStore('proofs', { keyPath: 'sourceId' });
          proofsStore.createIndex('date', 'timestamp', { unique: false });
        }

        // Store de backups
        if (!db.objectStoreNames.contains('backups')) {
          db.createObjectStore('backups', { keyPath: 'timestamp' });
        }
      };
    });
  }

  /**
   * Obtiene un valor del estado
   * @param {string} key — Clave a obtener
   * @returns {any} — Valor almacenado o undefined
   */
  async get(key) {
    await this._ensureInit();

    // Cache hit
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['state'], 'readonly');
      const store = tx.objectStore('state');
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result?.value;
        if (result !== undefined) {
          this.cache.set(key, result);
        }
        resolve(result);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Establece un valor en el estado
   * @param {string} key — Clave
   * @param {any} value — Valor a almacenar (debe ser serializable)
   * @returns {boolean} — Éxito
   */
  async set(key, value) {
    await this._ensureInit();

    // Actualizar cache inmediatamente
    this.cache.set(key, value);

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['state'], 'readwrite');
      const store = tx.objectStore('state');
      const request = store.put({
        key,
        value,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        console.error(`[StateManager] Error guardando ${key}:`, request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Elimina una clave del estado
   * @param {string} key — Clave a eliminar
   */
  async delete(key) {
    await this._ensureInit();
    this.cache.delete(key);

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['state'], 'readwrite');
      const store = tx.objectStore('state');
      const request = store.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene el estado completo (merge de DEFAULT_STATE con almacenado)
   * @returns {Object} — Estado completo
   */
  async getFullState() {
    const state = { ...DEFAULT_STATE };
    
    // Obtener todas las keys guardadas
    const keys = ['xp', 'level', 'streak', 'combo', 'lastStudyDate', 
                  'completedSources', 'sourceProgress', 'achievements', 
                  'theme', 'energyProfile', 'config'];
    
    for (const key of keys) {
      const value = await this.get(key);
      if (value !== undefined) {
        state[key] = value;
      }
    }

    return state;
  }

  /**
   * Guarda el estado completo
   * @param {Object} state — Estado a guardar
   */
  async saveFullState(state) {
    const promises = Object.entries(state).map(([key, value]) => {
      if (typeof value !== 'function') {
        return this.set(key, value);
      }
    });
    
    await Promise.all(promises);
  }

  /**
   * Registra una sesión de estudio
   * @param {Object} session — Datos de la sesión
   */
  async logSession(session) {
    await this._ensureInit();

    const sessionData = {
      ...session,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['sessions'], 'readwrite');
      const store = tx.objectStore('sessions');
      const request = store.add(sessionData);

      request.onsuccess = () => {
        console.log('[StateManager] Sesión registrada:', request.result);
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene historial de sesiones
   * @param {number} days — Días hacia atrás
   * @returns {Array} — Sesiones
   */
  async getStudyHistory(days = 30) {
    await this._ensureInit();

    const since = new Date();
    since.setDate(since.getDate() - days);

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['sessions'], 'readonly');
      const store = tx.objectStore('sessions');
      const index = store.index('date');
      const range = IDBKeyRange.lowerBound(since.toISOString());
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Guarda un Proof of Work
   * @param {number} sourceId — ID de la fuente
   * @param {Object} proof — { explanation, pseudocode, connection }
   */
  async saveProof(sourceId, proof) {
    await this._ensureInit();

    const proofData = {
      sourceId,
      ...proof,
      timestamp: Date.now(),
      date: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['proofs'], 'readwrite');
      const store = tx.objectStore('proofs');
      const request = store.put(proofData);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene un Proof of Work
   * @param {number} sourceId — ID de la fuente
   */
  async getProof(sourceId) {
    await this._ensureInit();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['proofs'], 'readonly');
      const store = tx.objectStore('proofs');
      const request = store.get(sourceId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Exporta todo el estado a JSON (para backup manual)
   * @returns {Object} — Datos completos exportables
   */
  async exportToJSON() {
    await this._ensureInit();

    const data = {
      version: '6.0',
      exportedAt: new Date().toISOString(),
      state: await this.getFullState(),
      sessions: await this._getAllFromStore('sessions'),
      proofs: await this._getAllFromStore('proofs')
    };

    // Guardar timestamp del último export
    await this.set('lastExport', Date.now());

    return data;
  }

  /**
   * Importa desde JSON (restaurar backup)
   * @param {Object} data — Datos exportados previamente
   * @param {boolean} merge — Si true, fusiona con datos existentes
   */
  async importFromJSON(data, merge = false) {
    await this._ensureInit();

    // Validación
    if (!data || typeof data !== 'object') {
      throw new Error('Datos inválidos: se esperaba un objeto');
    }

    if (!data.state || !data.version) {
      throw new Error('Formato de backup inválido: falta state o version');
    }

    // Backup de seguridad antes de importar
    if (!merge) {
      const currentBackup = await this.exportToJSON();
      await this._saveEmergencyBackup(currentBackup);
    }

    // Importar estado
    if (data.state) {
      await this.saveFullState(data.state);
    }

    // Importar sesiones (siempre merge para evitar perder historial)
    if (data.sessions && Array.isArray(data.sessions)) {
      for (const session of data.sessions) {
        try {
          await this.logSession(session);
        } catch (e) {
          // Ignorar duplicados
          if (e.name !== 'ConstraintError') throw e;
        }
      }
    }

    // Importar proofs
    if (data.proofs && Array.isArray(data.proofs)) {
      for (const proof of data.proofs) {
        await this.saveProof(proof.sourceId, proof);
      }
    }

    // Limpiar cache
    this.cache.clear();

    return {
      success: true,
      sourcesImported: data.state?.completedSources?.length || 0,
      sessionsImported: data.sessions?.length || 0
    };
  }

  /**
   * Verifica si es momento de recordar backup (cada 7 días)
   */
  async shouldRemindBackup() {
    const lastExport = await this.get('lastExport');
    if (!lastExport) return { shouldRemind: true, daysSince: 999 };

    const daysSince = Math.floor((Date.now() - lastExport) / (1000 * 60 * 60 * 24));
    return {
      shouldRemind: daysSince >= 7,
      daysSince
    };
  }

  /**
   * Estadísticas del estado actual
   */
  async getStats() {
    const state = await this.getFullState();
    const sessions = await this.getStudyHistory(365);
    
    const totalStudyTime = sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
    const uniqueDays = new Set(sessions.map(s => s.date.split('T')[0])).size;

    return {
      totalSources: 178,
      completed: state.completedSources.length,
      inProgress: Object.keys(state.sourceProgress).length,
      xp: state.xp,
      level: state.level,
      streak: state.streak,
      totalSessions: sessions.length,
      totalStudyHours: Math.round(totalStudyTime / 3600000 * 10) / 10,
      uniqueStudyDays: uniqueDays,
      lastBackup: state.lastExport ? new Date(state.lastExport).toLocaleDateString() : 'Nunca'
    };
  }

  // ============ MÉTODOS PRIVADOS ============

  async _ensureInit() {
    if (!this.initialized) {
      await this.init();
    }
  }

  async _getAllFromStore(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async _saveEmergencyBackup(data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['backups'], 'readwrite');
      const store = tx.objectStore('backups');
      const request = store.put({
        timestamp: Date.now(),
        data,
        type: 'emergency_pre_import'
      });

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }
}

// Exportar singleton
const stateManager = new StateManager();
export default stateManager;
export { StateManager, DEFAULT_STATE };
