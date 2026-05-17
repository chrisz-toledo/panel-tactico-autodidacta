/**
 * SourceLibrary.js — Gestión de la Biblioteca de 178 Fuentes
 * AEGIS v6.0
 * 
 * Carga datos desde biblioteca.json, proporciona búsqueda,
 * filtrado, recomendaciones basadas en energía.
 */

class SourceLibrary {
  constructor() {
    this.sources = [];
    this.metadata = {};
    this.loaded = false;
  }

  /**
   * Carga la biblioteca desde JSON (funciona en file:// y http://)
   */
  async load() {
    try {
      // Intentar fetch (funciona en file:// en Chrome, no en Safari)
      const response = await fetch(new URL('../data/biblioteca.json', import.meta.url));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      this.sources = data.sources || [];
      this.metadata = data.metadata || {};
      this.loaded = true;
      
      // Construir índices
      this.indexById = this._buildIdIndex();
      this.indexByCategory = this._buildCategoryIndex();
      this.searchIndex = this._buildSearchIndex();
      
      console.log(`📚 SourceLibrary cargada: ${this.sources.length} fuentes`);
      return true;
    } catch (fetchError) {
      console.warn('⚠️ Fetch failed, trying fallback:', fetchError);
      return this._loadFallback();
    }
  }

  /**
   * Fallback: cargar datos embebidos para modo offline file://
   */
  async _loadFallback() {
    // Datos mínimos para que la app no se rompa
    // En producción real, esto debería ser un bundle con los datos
    this.sources = this._getEmbeddedSources();
    this.metadata = { version: '6.0-fallback', total: this.sources.length };
    this.loaded = true;
    
    this.indexById = this._buildIdIndex();
    this.indexByCategory = this._buildCategoryIndex();
    this.searchIndex = this._buildSearchIndex();
    
    console.log(`📚 SourceLibrary fallback: ${this.sources.length} fuentes básicas`);
    return true;
  }

  /**
   * Fuentes embebidas de respaldo (versión reducida)
   */
  _getEmbeddedSources() {
    return [
      { id: 1, name: "CS50x 2024", category: "cs50", difficulty: "beginner", priority: "critical", estimated_hours: 80, desc: "Fundamentos de CS", tactical: "Base imprescindible" },
      { id: 2, name: "Python para Todos", category: "python", difficulty: "beginner", priority: "critical", estimated_hours: 40, desc: "Python desde cero", tactical: "Backend y scripting" },
      { id: 3, name: "Clean Architecture", category: "architecture", difficulty: "advanced", priority: "critical", estimated_hours: 20, desc: "Arquitectura limpia", tactical: "Diseño escalable" },
      { id: 4, name: "The Pragmatic Programmer", category: "methodology", difficulty: "intermediate", priority: "high", estimated_hours: 15, desc: "Filosofía de desarrollo", tactical: "Mentalidad profesional" },
      { id: 5, name: "HackTheBox Academy", category: "security", difficulty: "intermediate", priority: "critical", estimated_hours: 100, desc: "Ciberseguridad práctica", tactical: "Hacking ético" },
      { id: 6, name: "FastAI Course", category: "ai", difficulty: "intermediate", priority: "high", estimated_hours: 60, desc: "Deep Learning aplicado", tactical: "IA moderna" }
    ];
  }

  // ============ BÚSQUEDA BÁSICA ============

  getById(id) {
    return this.indexById[id] || null;
  }

  getByCategory(category) {
    return this.indexByCategory[category] || [];
  }

  getAll() {
    return this.sources;
  }

  getCategories() {
    return Object.keys(this.indexByCategory).sort();
  }

  // ============ BÚSQUEDA AVANZADA ============

  search(query) {
    if (!query || query.trim().length < 2) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    const results = [];

    for (const source of this.sources) {
      const score = this._calculateSearchScore(source, lowerQuery);
      if (score > 0) {
        results.push({ source, score });
      }
    }

    // Ordenar por relevancia
    return results
      .sort((a, b) => b.score - a.score)
      .map(r => r.source);
  }

  filter(filters = {}) {
    return this.sources.filter(source => {
      if (filters.category && source.category !== filters.category) return false;
      if (filters.difficulty && source.difficulty !== filters.difficulty) return false;
      if (filters.priority && source.priority !== filters.priority) return false;
      if (filters.minHours && source.estimated_hours < filters.minHours) return false;
      if (filters.maxHours && source.estimated_hours > filters.maxHours) return false;
      return true;
    });
  }

  // ============ RECOMENDACIONES INTELIGENTES ============

  /**
   * Recomienda fuentes basado en nivel de energía y hora del día
   * @param {number} energyLevel — 1-10
   * @param {number} hour — Hora del día (0-23)
   * @param {Array} completed — IDs de fuentes completadas
   * @returns {Array} — Fuentes recomendadas ordenadas
   */
  recommendByEnergy(energyLevel, hour, completed = []) {
    const completedSet = new Set(completed);
    
    // Mapeo de dificultad por categoría
    const categoryDifficulty = {
      'cs50': 'high',
      'python': 'medium',
      'security': 'high',
      'ai': 'high',
      'systems': 'high',
      'architecture': 'medium',
      'devops': 'low',
      'git': 'low',
      'database': 'medium',
      'methodology': 'low',
      'web': 'medium',
      'cloud': 'high',
      'math': 'medium'
    };

    // Determinar dificultad objetivo
    let targetDifficulty;
    if (energyLevel >= 7) targetDifficulty = 'high';
    else if (energyLevel <= 4) targetDifficulty = 'low';
    else targetDifficulty = 'medium';

    // Puntuar fuentes pendientes
    const scored = this.sources
      .filter(s => !completedSet.has(s.id))
      .map(source => {
        const difficulty = categoryDifficulty[source.category] || 'medium';
        let score = 0;

        // Match de dificultad (más importante)
        if (difficulty === targetDifficulty) score += 10;
        else if (Math.abs(['low', 'medium', 'high'].indexOf(difficulty) - 
                          ['low', 'medium', 'high'].indexOf(targetDifficulty)) === 1) {
          score += 5; // Dificultad adyacente
        }

        // Prioridad crítica
        if (source.priority === 'critical') score += 8;

        // Menor tiempo = más accesible (bonus leve)
        if (source.estimated_hours && source.estimated_hours <= 10) score += 2;

        // Variedad: penalizar si ya hay muchas de la misma categoría en progreso
        // (esto se calcularía con el progreso real)

        return { source, score };
      });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Top 5
      .map(r => r.source);
  }

  /**
   * Sugiere siguiente fuente para continuar racha
   */
  suggestNextSource(completed = [], inProgress = {}) {
    const completedSet = new Set(completed);
    const inProgressIds = Object.keys(inProgress).map(Number);

    // Prioridad 1: Continuar fuente en progreso
    if (inProgressIds.length > 0) {
      const continueSource = this.getById(inProgressIds[0]);
      if (continueSource && !completedSet.has(continueSource.id)) {
        return { type: 'continue', source: continueSource, reason: 'En progreso' };
      }
    }

    // Prioridad 2: Fundamentos básicos si hay pocos completados
    if (completed.length < 5) {
      const fundamentals = this.sources.filter(s => 
        !completedSet.has(s.id) && 
        ['cs50', 'methodology', 'python'].includes(s.category) &&
        s.difficulty === 'beginner'
      );
      if (fundamentals.length > 0) {
        return { type: 'new', source: fundamentals[0], reason: 'Fundamentos básicos' };
      }
    }

    // Prioridad 3: Fuentes críticas de seguridad (año 5-6)
    const critical = this.sources.filter(s => 
      !completedSet.has(s.id) && s.priority === 'critical'
    );
    if (critical.length > 0) {
      return { type: 'new', source: critical[0], reason: 'Prioridad crítica' };
    }

    // Prioridad 4: Cualquier fuente pendiente
    const pending = this.sources.filter(s => !completedSet.has(s.id));
    if (pending.length > 0) {
      return { type: 'new', source: pending[0], reason: 'Siguiente en biblioteca' };
    }

    return null; // Todas completadas
  }

  // ============ ESTADÍSTICAS ============

  getStats() {
    const stats = {
      total: this.sources.length,
      byCategory: {},
      byDifficulty: {},
      byPriority: {},
      totalHours: 0,
      criticalCount: 0
    };

    for (const source of this.sources) {
      // Por categoría
      stats.byCategory[source.category] = (stats.byCategory[source.category] || 0) + 1;
      
      // Por dificultad
      if (source.difficulty) {
        stats.byDifficulty[source.difficulty] = (stats.byDifficulty[source.difficulty] || 0) + 1;
      }
      
      // Por prioridad
      if (source.priority) {
        stats.byPriority[source.priority] = (stats.byPriority[source.priority] || 0) + 1;
        if (source.priority === 'critical') stats.criticalCount++;
      }
      
      // Horas totales
      if (source.estimated_hours) {
        stats.totalHours += source.estimated_hours;
      }
    }

    return stats;
  }

  /**
   * Progreso actual del usuario
   */
  getUserProgress(completed = [], inProgress = {}) {
    const completedSet = new Set(completed);
    const total = this.sources.length;
    const completedCount = completed.length;
    const inProgressCount = Object.keys(inProgress).length;
    
    // Calcular horas
    let completedHours = 0;
    let inProgressHours = 0;
    
    for (const id of completed) {
      const source = this.getById(id);
      if (source?.estimated_hours) completedHours += source.estimated_hours;
    }
    
    for (const [id, progress] of Object.entries(inProgress)) {
      const source = this.getById(Number(id));
      if (source?.estimated_hours) {
        inProgressHours += (source.estimated_hours * (progress / 100));
      }
    }

    return {
      total,
      completed: completedCount,
      inProgress: inProgressCount,
      pending: total - completedCount - inProgressCount,
      percentComplete: Math.round((completedCount / total) * 100),
      completedHours: Math.round(completedHours),
      inProgressHours: Math.round(inProgressHours),
      estimatedTotalHours: this.getStats().totalHours
    };
  }

  // ============ MÉTODOS PRIVADOS ============

  _buildIdIndex() {
    const index = {};
    for (const source of this.sources) {
      index[source.id] = source;
    }
    return index;
  }

  _buildCategoryIndex() {
    const index = {};
    for (const source of this.sources) {
      if (!index[source.category]) index[source.category] = [];
      index[source.category].push(source);
    }
    return index;
  }

  _buildSearchIndex() {
    // Para búsqueda full-text futura (simplificado por ahora)
    return this.sources.map(s => ({
      id: s.id,
      text: `${s.name} ${s.desc} ${s.tactical}`.toLowerCase()
    }));
  }

  _calculateSearchScore(source, query) {
    let score = 0;
    
    const nameLower = source.name.toLowerCase();
    const descLower = (source.desc || '').toLowerCase();
    const tacticalLower = (source.tactical || '').toLowerCase();
    const categoryLower = (source.category || '').toLowerCase();

    // Match exacto en nombre (máxima prioridad)
    if (nameLower === query) score += 100;
    else if (nameLower.includes(query)) score += 50;

    // Match en descripción
    if (descLower.includes(query)) score += 20;

    // Match en tactical
    if (tacticalLower.includes(query)) score += 15;

    // Match en categoría
    if (categoryLower === query) score += 10;

    // Bonus por prioridad crítica
    if (source.priority === 'critical' && score > 0) score += 5;

    return score;
  }
}

const sourceLibrary = new SourceLibrary();
export default sourceLibrary;
export { SourceLibrary };
