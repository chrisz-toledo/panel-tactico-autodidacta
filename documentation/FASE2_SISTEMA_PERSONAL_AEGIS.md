# 🎯 FASE 2: DISEÑO DEL SISTEMA PERSONAL DE AUTOAPRENDIZAJE
## AEGIS v6 — Dojo Digital Monousuario (Sin Backend, 100% Local)

**Filosofía:** Sistema íntimo y personal. No escala, no sirve a otros, solo a ti.  
**Stack:** Vanilla JS + IndexedDB + File System Access API (para backups locales)  
**Arquitectura:** Módulos ES6, separación de responsabilidades, mantenible por una persona.

---

## 🏗️ ARQUITECTURA SIMPLIFICADA (Monolito Modular)

```
aegis-v6/
├── index.html              # Shell mínimo (100 líneas)
├── css/
│   ├── design-tokens.css   # Variables CSS
│   ├── components.css      # Componentes UI
│   └── layout.css          # Grid/flex layouts
├── js/
│   ├── main.js             # Entry point
│   ├── modules/
│   │   ├── StateManager.js      # IndexedDB + export/import
│   │   ├── SourceLibrary.js     # Gestión de las 178 fuentes
│   │   ├── PromptEngine.js      # Generador de prompts IA
│   │   ├── SessionTracker.js    # Tracking de sesiones de estudio
│   │   ├── ProofOfWork.js       # Validación de comprensión
│   │   ├── ProgressAnalytics.js # Gráficos de progreso
│   │   └── BackupManager.js     # Export/import JSON
│   ├── data/
│   │   └── biblioteca.json      # Las 178 fuentes (separado del código)
│   └── utils/
│       ├── sanitizers.js        # Anti-XSS
│       ├── validators.js        # Validación de datos
│       └── formatters.js        # Formato de fechas/tiempos
├── tests/                  # Tests básicos (Jest)
│   └── modules.test.js
├── docs/                   # Documentación personal
│   ├── api.md             # "API" interna del sistema
│   └── changelog.md       # Historial de cambios
└── export/                 # Backups automáticos
    └── aegis-backup-2026-05-16.json
```

---

## 📦 MÓDULOS CORE (Implementación Detallada)

### 1. StateManager.js — El Cerebro del Sistema

```javascript
// js/modules/StateManager.js
/**
 * Gestión de estado persistente usando IndexedDB.
 * No backend, no servidor, 100% local.
 * Export/import manual para backups.
 */

const DB_NAME = 'AEGIS_Personal';
const DB_VERSION = 1;

class StateManager {
  constructor() {
    this.db = null;
    this.cache = new Map(); // Cache en memoria para performance
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Store principal de estado
        if (!db.objectStoreNames.contains('state')) {
          db.createObjectStore('state', { keyPath: 'id' });
        }
        
        // Store de sesiones de estudio (histórico)
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          sessionsStore.createIndex('date', 'date', { unique: false });
          sessionsStore.createIndex('sourceId', 'sourceId', { unique: false });
        }
        
        // Store de proof of work
        if (!db.objectStoreNames.contains('proofs')) {
          const proofsStore = db.createObjectStore('proofs', { keyPath: 'sourceId' });
          proofsStore.createIndex('date', 'timestamp', { unique: false });
        }
      };
    });
  }

  // CRUD básico
  async get(key) {
    // Primero cache
    if (this.cache.has(key)) return this.cache.get(key);
    
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['state'], 'readonly');
      const store = tx.objectStore('state');
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result?.value || null;
        this.cache.set(key, result);
        resolve(result);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async set(key, value) {
    this.cache.set(key, value);
    
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['state'], 'readwrite');
      const store = tx.objectStore('state');
      const request = store.put({ id: key, value, timestamp: Date.now() });
      
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  // Gestión de sesiones de estudio
  async logSession(session) {
    const tx = this.db.transaction(['sessions'], 'readwrite');
    const store = tx.objectStore('sessions');
    
    await store.add({
      ...session,
      date: new Date().toISOString(),
      duration: session.duration || 0,
      energyLevel: session.energy || null
    });
    
    // Actualizar racha (streak)
    await this.updateStreak();
  }

  async getStudyHistory(days = 30) {
    const tx = this.db.transaction(['sessions'], 'readonly');
    const store = tx.objectStore('sessions');
    const index = store.index('date');
    
    const since = new Date();
    since.setDate(since.getDate() - days);
    
    const range = IDBKeyRange.lowerBound(since.toISOString());
    const request = index.getAll(range);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Export completo para backup (botón manual)
  async exportToJSON() {
    const data = {
      version: '6.0',
      exportedAt: new Date().toISOString(),
      state: {},
      sessions: await this.getAllSessions(),
      proofs: await this.getAllProofs()
    };
    
    // Exportar todas las keys de estado
    const tx = this.db.transaction(['state'], 'readonly');
    const store = tx.objectStore('state');
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        request.result.forEach(item => {
          data.state[item.id] = item.value;
        });
        resolve(data);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Import desde JSON (restaurar backup)
  async importFromJSON(jsonData) {
    // Validación básica
    if (!jsonData.version || !jsonData.state) {
      throw new Error('Formato de backup inválido');
    }
    
    // Backup actual antes de importar
    const currentBackup = await this.exportToJSON();
    await this.set('_pre_import_backup', currentBackup);
    
    // Importar estado
    for (const [key, value] of Object.entries(jsonData.state)) {
      await this.set(key, value);
    }
    
    // Importar sesiones (merge, no overwrite)
    if (jsonData.sessions) {
      const tx = this.db.transaction(['sessions'], 'readwrite');
      const store = tx.objectStore('sessions');
      
      for (const session of jsonData.sessions) {
        // Evitar duplicados por ID
        try {
          await store.add(session);
        } catch (e) {
          // Ignorar duplicados
        }
      }
    }
    
    return true;
  }

  // Auto-export semanal (recordatorio)
  async shouldExportReminder() {
    const lastExport = await this.get('lastExportReminder');
    if (!lastExport) return true;
    
    const daysSince = (Date.now() - lastExport) / (1000 * 60 * 60 * 24);
    return daysSince >= 7; // Recordar cada 7 días
  }
}

export default StateManager;
```

---

### 2. SourceLibrary.js — Las 178 Fuentes

```javascript
// js/modules/SourceLibrary.js
/**
 * Gestión de la biblioteca de 178 fuentes.
 * Importa desde JSON, no hardcoded en JS.
 */

import BIBLIOTECA_DATA from '../data/biblioteca.json' assert { type: 'json' };

class SourceLibrary {
  constructor() {
    this.sources = BIBLIOTECA_DATA;
    this.cache = new Map();
    
    // Índices para búsqueda rápida
    this.indexByCategory = this.buildCategoryIndex();
    this.indexById = this.buildIdIndex();
  }

  buildCategoryIndex() {
    const index = {};
    this.sources.forEach(source => {
      if (!index[source.category]) index[source.category] = [];
      index[source.category].push(source);
    });
    return index;
  }

  buildIdIndex() {
    const index = {};
    this.sources.forEach(source => {
      index[source.id] = source;
    });
    return index;
  }

  // CRUD básico
  getById(id) {
    return this.indexById[id] || null;
  }

  getByCategory(category) {
    return this.indexByCategory[category] || [];
  }

  getAll() {
    return this.sources;
  }

  // Búsqueda por texto (nombre o descripción)
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.sources.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.desc.toLowerCase().includes(lowerQuery) ||
      s.tactical.toLowerCase().includes(lowerQuery)
    );
  }

  // Recomendación basada en energía (ritmo circadiano)
  recommendByEnergy(energyLevel, hourOfDay) {
    const pending = this.getPendingSources(); // Asume integración con StateManager
    
    if (pending.length === 0) return null;
    
    // Lógica de dificultad por energía
    const CATEGORY_DIFFICULTY = {
      'cs50': 'high',
      'python': 'medium',
      'security': 'high',
      'ai': 'high',
      'systems': 'high',
      'devops': 'low',
      'git': 'low',
      'methodology': 'low'
    };
    
    let targetDifficulty;
    if (energyLevel >= 7) targetDifficulty = 'high';
    else if (energyLevel <= 4) targetDifficulty = 'low';
    else targetDifficulty = 'medium';
    
    // Encontrar match
    const match = pending.find(s => 
      CATEGORY_DIFFICULTY[s.category] === targetDifficulty
    );
    
    return match || pending[0]; // Fallback al primero pendiente
  }

  // Estadísticas de la biblioteca
  getStats() {
    const stats = {
      total: this.sources.length,
      byCategory: {},
      completed: 0,
      inProgress: 0,
      pending: 0
    };
    
    this.sources.forEach(s => {
      stats.byCategory[s.category] = (stats.byCategory[s.category] || 0) + 1;
    });
    
    return stats;
  }
}

export default SourceLibrary;
```

---

### 3. PromptEngine.js — Generador Inteligente

```javascript
// js/modules/PromptEngine.js
/**
 * Motor de generación de prompts para IA.
 * Extensible: registra generadores nuevos sin modificar código existente.
 */

class PromptEngine {
  constructor() {
    this.generators = new Map();
    this.registerDefaults();
  }

  registerDefaults() {
    this.register('socratic', new SocraticGenerator());
    this.register('notebooklm', new NotebookLMGenerator());
    this.register('plan', new StudyPlanGenerator());
    this.register('audioclase', new AudioClassGenerator());
    this.register('code_review', new CodeReviewGenerator());
  }

  register(type, generator) {
    if (!generator.generate || typeof generator.generate !== 'function') {
      throw new Error(`Generator ${type} debe tener método generate()`);
    }
    this.generators.set(type, generator);
  }

  generate(type, context) {
    const generator = this.generators.get(type);
    if (!generator) {
      throw new Error(`Tipo de prompt desconocido: ${type}`);
    }
    
    // Sanitizar contexto antes de generar
    const safeContext = this.sanitizeContext(context);
    return generator.generate(safeContext);
  }

  sanitizeContext(context) {
    // Prevenir XSS: escapar HTML en textos de usuario
    const escapeHtml = (text) => {
      if (typeof text !== 'string') return text;
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    return {
      ...context,
      userInput: context.userInput ? escapeHtml(context.userInput) : null,
      explanation: context.explanation ? escapeHtml(context.explanation) : null
    };
  }

  listGenerators() {
    return Array.from(this.generators.keys());
  }
}

// Generadores específicos
class SocraticGenerator {
  generate({ source, explanation }) {
    return {
      system: `Actúa como TUTOR SOCRÁTICO ESTRUCTO. No des respuestas directas. 
Guía mediante preguntas progresivas para que el estudiante descubra por sí mismo.

Protocolo:
1. Detecta el error o vacío conceptual en la explicación del estudiante
2. Formula 3 preguntas guía:
   - P1 (Detectar): "¿Por qué crees que...?"
   - P2 (Cuestionar): "¿Qué pasaría si...?"
   - P3 (Reconstruir): "¿Cómo conectas X con Y?"
3. Propón un mini-problema de 3-5 líneas

RESTRICCIÓN: Si la respuesta es incorrecta, NO la corrijas. Haz otra pregunta.`,
      
      user: `Fuente de estudio: ${source.name}
Descripción: ${source.desc}

Mi intento de explicar este concepto:
${explanation || '[El estudiante no ha proporcionado explicación]'}

Actúa como Sócrates. No me des la respuesta correcta.`,
      
      metadata: {
        expectedOutput: '3 preguntas + mini-problema',
        tone: 'pedagógico, paciente, incisivo',
        length: '150-300 palabras'
      }
    };
  }
}

class NotebookLMGenerator {
  generate({ source }) {
    return {
      system: `Crea un podcast educativo de 10 minutos para Notebook LM.
Tono: mentor experimentado explicando caminando. Profesional pero conversacional.
Usa "tú" y analogías cotidianas (cocina, autos, gym, música).`,
      
      user: `CREA UN PODCAST EDUCATIVO sobre: ${source.name}

CONTEXTO DE LA FUENTE:
${source.desc}

ESTRUCTURA (10 minutos):
1. Hook inicial (1 min): Conecta con situación cotidiana sorprendente
2. Concepto principal (4 min): Explicación profunda con analogías
3. Ejemplo práctico (3 min): Caso real de aplicación tech
4. Errores comunes (1 min): Qué NO hacer (trampa de juniors)
5. Bridge al siguiente tema (1 min): Cómo conecta con próximos estudios

AL FINAL: 3 preguntas de auto-evaluación que debería hacerme el oyente.`,
      
      metadata: {
        format: 'podcast script',
        duration: '10 minutos',
        analogies: ['cocina', 'autos', 'gym', 'música']
      }
    };
  }
}

class StudyPlanGenerator {
  generate({ sources, timeAvailable, energyLevel }) {
    const difficultyMap = {
      high: ['cs50', 'security', 'ai', 'systems'],
      medium: ['python', 'architecture', 'database'],
      low: ['devops', 'git', 'methodology']
    };
    
    // Seleccionar fuentes según energía y tiempo
    const targetCategories = energyLevel >= 7 
      ? difficultyMap.high 
      : energyLevel <= 4 
        ? difficultyMap.low 
        : difficultyMap.medium;
    
    const selected = sources
      .filter(s => targetCategories.includes(s.category))
      .slice(0, Math.ceil(timeAvailable / 60)); // 1 fuente por hora aprox
    
    return {
      system: `Genera un plan de estudio diario realista y ejecutable.
Considera la energía del estudiante y el tiempo disponible.
Sé específico: qué leer, qué código escribir, qué output producir.`,
      
      user: `PLAN DE ESTUDIO PARA HOY

CONTEXTO:
- Tiempo disponible: ${timeAvailable} minutos
- Nivel de energía: ${energyLevel}/10
- Fuentes prioritarias: ${selected.map(s => s.name).join(', ')}

GENERA:
1. Objetivo claro de la sesión (1 oración)
2. Desglose por bloques de tiempo (25 min foco / 5 min descanso)
3. Output tangible esperado (qué código/archivo debo producir)
4. Criterio de éxito (cómo sé que completé la sesión)
5. Checkpoint de autoverificación (3 preguntas rápidas)`,
      
      metadata: {
        format: 'plan estructurado',
        pomodoro: '25/5'
      }
    };
  }
}

class AudioClassGenerator {
  generate({ source, energyLevel }) {
    return {
      system: `Crea un guion COMPLETO para una AudioClase de 8-12 minutos.
Estructura para voice memo. Usa analogías cotidianas.
Incluye marcas de tiempo y tono.`,
      
      user: `AUDIOCLASE PARA HOY — Tema: ${source.name}

CONTEXTO:
- Lo que voy a estudiar: ${source.desc}
- Mi nivel: Principiante-Intermedio
- Tiempo de audio: 8-12 minutos
- Energía actual: ${energyLevel}/10

ESTRUCTURA DEL GUION:
1. Gancho del día (30 seg): "Hoy vamos a entender [concepto] usando algo que haces todos los días..."
2. Analogía viviente (4 min): Explicación completa SIN jerga técnica primero
3. Mapeo técnico: "En código, eso equivale a..."
4. Ejemplo práctico (3 min): Caso concreto que haré hoy
5. Señales de alerta (1 min): Errores que cometen quienes empiezan
6. Checkpoint (30 seg): 2 preguntas de autoverificación

MARCAS DE TONO:
[NORMAL] = explicación regular
[ÉNFASIS] = momento clave
[PAUSA 3 SEG] = para pensar
[DICE EN VOZ ALTA] = repite conmigo`,
      
      metadata: {
        format: 'voice memo script',
        analogies: ['cocina', 'autos', 'gym', 'música', 'supermercado']
      }
    };
  }
}

class CodeReviewGenerator {
  generate({ code, language, context }) {
    return {
      system: `Actúa como SENIOR ENGINEER en code review.
Sé estricto pero constructivo. Identifica bugs, vulnerabilidades, violaciones SOLID.
Sugiere mejoras específicas con ejemplos de código.`,
      
      user: `CODE REVIEW REQUEST

LENGUAJE: ${language}
CONTEXTO: ${context}

CÓDIGO A REVISAR:
\`\`\`${language}
${code}
\`\`\`

REALIZA:
1. Análisis de seguridad (XSS, injection, etc.)
2. Análisis de calidad (naming, DRY, complejidad)
3. Bugs potenciales
4. Mejoras de performance
5. Sugerencias de testing

FORMATO SALIDA:
- [CRÍTICO]: Issues que deben arreglarse antes de merge
- [ALTO]: Mejoras importantes
- [MEDIO]: Sugerencias de estilo
- [BUENO]: Lo que está bien hecho (reconocer)`
    };
  }
}

export { PromptEngine, SocraticGenerator, NotebookLMGenerator };
export default PromptEngine;
```

---

### 4. SessionTracker.js — Rastreo de Estudio

```javascript
// js/modules/SessionTracker.js
/**
 * Tracking de sesiones de estudio con el método "Stop-Loss".
 * Previene burnout y mantiene racha (streak) realista.
 */

class SessionTracker {
  constructor(stateManager) {
    this.sm = stateManager;
    this.currentSession = null;
    this.timer = null;
  }

  startSession(sourceId, config = {}) {
    const session = {
      id: `session_${Date.now()}`,
      sourceId,
      startTime: Date.now(),
      pomodoroDuration: config.pomodoroDuration || 25, // minutos
      breakDuration: config.breakDuration || 5,
      energyAtStart: config.energy || null,
      notes: '',
      completed: false
    };
    
    this.currentSession = session;
    this.startPomodoroTimer();
    
    return session;
  }

  startPomodoroTimer() {
    const duration = this.currentSession.pomodoroDuration * 60 * 1000;
    
    this.timer = setTimeout(() => {
      this.onPomodoroComplete();
    }, duration);
  }

  onPomodoroComplete() {
    // Notificar al usuario
    this.showNotification('⏰ Pomodoro completado. Toma un descanso de 5 min.');
    
    // Auto-pausa si no hay actividad
    this.pauseSession();
  }

  pauseSession() {
    if (this.currentSession) {
      this.currentSession.pausedAt = Date.now();
      clearTimeout(this.timer);
    }
  }

  resumeSession() {
    if (this.currentSession && this.currentSession.pausedAt) {
      const pauseDuration = Date.now() - this.currentSession.pausedAt;
      this.currentSession.totalPauseTime = (this.currentSession.totalPauseTime || 0) + pauseDuration;
      this.currentSession.pausedAt = null;
      
      this.startPomodoroTimer();
    }
  }

  async endSession(notes = '') {
    if (!this.currentSession) return;
    
    const duration = Date.now() - this.currentSession.startTime;
    const activeTime = duration - (this.currentSession.totalPauseTime || 0);
    
    this.currentSession.endTime = Date.now();
    this.currentSession.duration = activeTime;
    this.currentSession.notes = notes;
    this.currentSession.completed = true;
    
    // Guardar en base de datos
    await this.sm.logSession(this.currentSession);
    
    // Actualizar XP y racha
    await this.awardXP(Math.floor(activeTime / 60000)); // 1 XP por minuto
    
    this.currentSession = null;
    clearTimeout(this.timer);
  }

  async awardXP(minutes) {
    const currentXP = await this.sm.get('xp') || 0;
    const newXP = currentXP + minutes;
    await this.sm.set('xp', newXP);
    
    // Calcular nivel (cada 1000 XP = nivel)
    const newLevel = Math.floor(newXP / 1000) + 1;
    const currentLevel = await this.sm.get('level') || 1;
    
    if (newLevel > currentLevel) {
      await this.sm.set('level', newLevel);
      this.showNotification(`🎉 ¡Subiste al nivel ${newLevel}!`);
    }
  }

  // Método Stop-Loss: detectar sesiones improductivas
  shouldStopLoss() {
    if (!this.currentSession) return false;
    
    const duration = Date.now() - this.currentSession.startTime;
    const hours = duration / (1000 * 60 * 60);
    
    // Si llevas más de 4 horas seguidas, forzar descanso
    if (hours >= 4) {
      return {
        shouldStop: true,
        reason: 'Llevas 4+ horas. El rendimiento cognitivo cae drásticamente después de este punto.',
        suggestion: 'Guarda tu progreso, haz ejercicio físico 20 min, vuelve mañana.'
      };
    }
    
    return { shouldStop: false };
  }

  showNotification(message) {
    // Usar Notification API del navegador
    if (Notification.permission === 'granted') {
      new Notification('AEGIS', { body: message });
    } else {
      // Fallback: mostrar en UI
      console.log('[AEGIS Notification]', message);
    }
  }

  // Analytics personales
  async getWeeklyStats() {
    const sessions = await this.sm.getStudyHistory(7);
    
    return {
      totalSessions: sessions.length,
      totalMinutes: sessions.reduce((acc, s) => acc + (s.duration || 0), 0) / 60000,
      averageEnergy: sessions.reduce((acc, s) => acc + (s.energyLevel || 5), 0) / sessions.length,
      mostStudiedSource: this.getMostFrequent(sessions.map(s => s.sourceId)),
      streak: await this.calculateStreak()
    };
  }

  async calculateStreak() {
    const sessions = await this.sm.getStudyHistory(365);
    const studyDates = [...new Set(sessions.map(s => s.date.split('T')[0]))];
    
    // Calcular racha actual
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (studyDates.includes(dateStr)) {
        streak++;
      } else if (i > 0) { // Hoy no cuenta si no estudiaste aún
        break;
      }
    }
    
    return streak;
  }

  getMostFrequent(arr) {
    return arr.sort((a,b) =>
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
  }
}

export default SessionTracker;
```

---

### 5. ProofOfWork.js — Validación de Comprensión

```javascript
// js/modules/ProofOfWork.js
/**
 * Sistema de "Proof of Work" para evitar el Falso Positivo de Competencia.
 * Antes de marcar una fuente como "completada", exige:
 * 1. Explicación en tus propias palabras
 * 2. Pseudocódigo del concepto clave
 * 3. Conexión con otra área de conocimiento
 */

class ProofOfWork {
  constructor(stateManager) {
    this.sm = stateManager;
    this.minExplanationLength = 150; // caracteres
    this.minPseudocodeLines = 5;
  }

  async submit(sourceId, proof) {
    // Validar que no sea vacío o genérico
    const validation = this.validate(proof);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }
    
    // Guardar proof
    await this.sm.set(`proof_${sourceId}`, {
      ...proof,
      timestamp: Date.now(),
      verified: false // El usuario debe verificar manualmente con IA o mentor
    });
    
    // Marcar fuente como "completada con proof"
    const completed = await this.sm.get('completedSources') || [];
    if (!completed.includes(sourceId)) {
      completed.push(sourceId);
      await this.sm.set('completedSources', completed);
    }
    
    return { success: true };
  }

  validate(proof) {
    const errors = [];
    
    if (!proof.explanation || proof.explanation.length < this.minExplanationLength) {
      errors.push(`Explicación muy corta. Mínimo ${this.minExplanationLength} caracteres.`);
    }
    
    if (this.isGenericExplanation(proof.explanation)) {
      errors.push('Explicación demasiado genérica. Usa tus propias palabras, no copies del libro.');
    }
    
    if (!proof.pseudocode || proof.pseudocode.split('\n').length < this.minPseudocodeLines) {
      errors.push(`Pseudocódigo muy corto. Mínimo ${this.minPseudocodeLines} líneas.`);
    }
    
    if (!proof.connection || proof.connection.length < 50) {
      errors.push('Conexión con otra área muy corta. ¿Cómo se relaciona con lo que ya sabes?');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  isGenericExplanation(text) {
    const genericPatterns = [
      /este libro trata sobre/i,
      /en este capítulo se explica/i,
      /la autora dice que/i,
      /básicamente es/i,
      /es importante porque/i
    ];
    
    return genericPatterns.some(pattern => pattern.test(text));
  }

  async getProof(sourceId) {
    return await this.sm.get(`proof_${sourceId}`);
  }

  // Generar prompt para IA que revise el proof
  generateReviewPrompt(source, proof) {
    return {
      system: `Eres un AUDITOR PEDAGÓGICO estricto. Evalúa si el estudiante REALMENTE entendió la fuente.

Criterios de evaluación:
1. La explicación demuestra comprensión profunda o es superficial?
2. El pseudocódigo refleja entendimiento del algoritmo/patrón?
3. La conexión con otra área es válida o forzada?

Se brutalmente honesto. Si el estudiante no entendió, dilo claramente.`,
      
      user: `FUENTE: ${source.name}
DESCRIPCIÓN: ${source.desc}

EXPLICACIÓN DEL ESTUDIANTE:
${proof.explanation}

PSEUDOCÓDIGO:
${proof.pseudocode}

CONEXIÓN CON OTRAS ÁREAS:
${proof.connection}

EVALÚA (1-10 cada criterio):
1. Profundidad de comprensión: __/10
2. Claridad de explicación: __/10
3. Calidad del pseudocódigo: __/10
4. Validez de la conexión: __/10

VEREDICTO FINAL: ¿El estudiante ha demostrado comprensión real? [SÍ/NO]

Si NO, indica específicamente qué conceptos debe revisar.`
    };
  }
}

export default ProofOfWork;
```

---

### 6. BackupManager.js — Export/Import Manual

```javascript
// js/modules/BackupManager.js
/**
 * Gestión de backups manuales (export/import JSON).
 * Sin cloud, 100% local. El usuario controla sus datos.
 */

class BackupManager {
  constructor(stateManager) {
    this.sm = stateManager;
  }

  async exportToFile() {
    const data = await this.sm.exportToJSON();
    const json = JSON.stringify(data, null, 2);
    
    // Crear blob y descargar
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Guardar timestamp del último export
    await this.sm.set('lastExport', Date.now());
    
    return { success: true, filename: a.download };
  }

  async importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          await this.sm.importFromJSON(data);
          resolve({ success: true, sourcesImported: data.sessions?.length || 0 });
        } catch (err) {
          reject(new Error('Archivo inválido o corrupto: ' + err.message));
        }
      };
      
      reader.onerror = () => reject(new Error('Error leyendo archivo'));
      reader.readAsText(file);
    });
  }

  // Recordatorio semanal de backup
  async shouldRemindBackup() {
    const lastExport = await this.sm.get('lastExport');
    if (!lastExport) return { shouldRemind: true, daysSince: 999 };
    
    const daysSince = Math.floor((Date.now() - lastExport) / (1000 * 60 * 60 * 24));
    return {
      shouldRemind: daysSince >= 7,
      daysSince
    };
  }

  // Estadísticas del backup
  async getBackupStats() {
    const data = await this.sm.exportToJSON();
    
    return {
      totalSizeKB: Math.round(JSON.stringify(data).length / 1024),
      sourcesCompleted: data.state?.completedSources?.length || 0,
      totalSessions: data.sessions?.length || 0,
      firstSession: data.sessions?.[0]?.date,
      lastSession: data.sessions?.[data.sessions.length - 1]?.date
    };
  }
}

export default BackupManager;
```

---

## 🛡️ SANITIZERS — Seguridad Básica (Anti-XSS)

```javascript
// js/utils/sanitizers.js

/**
 * Sanitización de inputs para prevenir XSS.
 * CRÍTICO aunque sea sistema personal (protege de contenido externo).
 */

export function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return text.replace(/[&<>"'/]/g, char => htmlEscapes[char]);
}

export function sanitizeObject(obj) {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  
  return obj;
}

// Validar que un string no contiene scripts
export function containsScript(text) {
  const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const eventHandlerPattern = /on\w+\s*=/i;
  
  return scriptPattern.test(text) || eventHandlerPattern.test(text);
}
```

---

## 📋 PLAN DE IMPLEMENTACIÓN (Sprints)

### Sprint 1 (Semana 1): Fundamentos Refactorizados
- [ ] Crear estructura de carpetas nueva
- [ ] Separar CSS en `design-tokens.css` + `components.css`
- [ ] Mover BIBLIOTECA a `biblioteca.json`
- [ ] Crear `StateManager.js` con IndexedDB
- [ ] Tests básicos para StateManager

### Sprint 2 (Semana 2): Módulos Core
- [ ] Implementar `SourceLibrary.js`
- [ ] Implementar `PromptEngine.js` (con todos los generadores)
- [ ] Implementar `sanitizers.js`
- [ ] Refactorizar `index.html` (reducir a 100 líneas)

### Sprint 3 (Semana 3): Tracking y Proofs
- [ ] Implementar `SessionTracker.js`
- [ ] Implementar `ProofOfWork.js`
- [ ] Sistema de XP/Streak mejorado
- [ ] Integrar con UI

### Sprint 4 (Semana 4): Backup y Polish
- [ ] Implementar `BackupManager.js`
- [ ] UI para export/import manual
- [ ] Notificaciones y recordatorios
- [ ] Testing end-to-end

---

## 🎯 VENTAJAS DE ESTA ARQUITECTURA

1. **Mantenible por una persona:** Cada módulo tiene una responsabilidad clara
2. **Sin backend:** No hay costos, no hay infraestructura, 100% privado
3. **Extensible:** Puedes agregar nuevos generadores de prompts sin tocar código existente
4. **Seguro:** Sanitización de inputs, anti-XSS básico
5. **Resiliente:** Backups manuales, IndexedDB (50MB vs 5MB de localStorage)
6. **Testeable:** Cada módulo puede testearse aislado

---

**¿Aprobas esta arquitectura simplificada? Si sí, procedo con la FASE 3 (implementación del core).**
