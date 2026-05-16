/**
 * SessionTracker.js — Rastreo de Sesiones de Estudio
 * AEGIS v6.0
 * 
 * Pomodoro timer, XP tracking, streak calculation, stop-loss detection
 */

class SessionTracker {
  constructor(stateManager) {
    this.sm = stateManager;
    this.currentSession = null;
    this.timerId = null;
    this.onTickCallback = null;
    this.onCompleteCallback = null;
  }

  /**
   * Inicia una nueva sesión de estudio
   */
  startSession(sourceId, config = {}) {
    if (this.currentSession) {
      throw new Error('Ya hay una sesión activa. Finalízala primero.');
    }

    this.currentSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sourceId,
      startTime: Date.now(),
      pomodoroDuration: (config.pomodoroDuration || 25) * 60 * 1000, // ms
      breakDuration: (config.breakDuration || 5) * 60 * 1000,
      energyAtStart: config.energy || null,
      notes: config.notes || '',
      pomodorosCompleted: 0,
      totalFocusTime: 0,
      totalBreakTime: 0,
      isPaused: false,
      pausedAt: null,
      completed: false
    };

    this._startPomodoro();
    
    console.log('[SessionTracker] Sesión iniciada:', this.currentSession.id);
    return this.currentSession;
  }

  /**
   * Pausa la sesión actual
   */
  pauseSession() {
    if (!this.currentSession || this.currentSession.isPaused) return;

    this.currentSession.isPaused = true;
    this.currentSession.pausedAt = Date.now();
    clearTimeout(this.timerId);

    console.log('[SessionTracker] Sesión pausada');
  }

  /**
   * Reanuda sesión pausada
   */
  resumeSession() {
    if (!this.currentSession || !this.currentSession.isPaused) return;

    const pauseDuration = Date.now() - this.currentSession.pausedAt;
    this.currentSession.totalBreakTime += pauseDuration;
    this.currentSession.isPaused = false;
    this.currentSession.pausedAt = null;

    this._startPomodoro();
    
    console.log('[SessionTracker] Sesión reanudada');
  }

  /**
   * Finaliza la sesión y guarda
   */
  async endSession(notes = '') {
    if (!this.currentSession) return null;

    clearTimeout(this.timerId);

    const now = Date.now();
    const totalDuration = now - this.currentSession.startTime;
    const activeTime = totalDuration - this.currentSession.totalBreakTime;

    this.currentSession.endTime = now;
    this.currentSession.duration = activeTime;
    this.currentSession.notes = notes || this.currentSession.notes;
    this.currentSession.completed = true;

    // Guardar en DB
    await this.sm.logSession(this.currentSession);

    // Calcular y otorgar XP
    const minutes = Math.floor(activeTime / 60000);
    const xpEarned = await this._awardXP(minutes);

    // Actualizar racha
    const streakUpdated = await this._updateStreak();

    // Actualizar progreso de fuente
    await this._updateSourceProgress(this.currentSession.sourceId, minutes);

    const sessionData = { ...this.currentSession };
    this.currentSession = null;

    console.log('[SessionTracker] Sesión finalizada:', {
      duration: minutes,
      xp: xpEarned,
      streakUpdated
    });

    return sessionData;
  }

  /**
   * Cancela sesión sin guardar
   */
  cancelSession() {
    if (!this.currentSession) return;

    clearTimeout(this.timerId);
    this.currentSession = null;

    console.log('[SessionTracker] Sesión cancelada');
  }

  /**
   * Detección de Stop-Loss (burnout prevention)
   */
  shouldStopLoss() {
    if (!this.currentSession) return { shouldStop: false };

    const duration = Date.now() - this.currentSession.startTime;
    const hours = duration / (1000 * 60 * 60);

    // Alerta a 4 horas (recomendación de detener)
    if (hours >= 4) {
      return {
        shouldStop: true,
        reason: 'Llevas 4+ horas seguidas. El rendimiento cognitivo cae drásticamente después de este punto.',
        suggestion: 'Guarda tu progreso, haz ejercicio físico 20 min, vuelve mañana.',
        severity: 'high'
      };
    }

    // Warning a 2 horas
    if (hours >= 2) {
      return {
        shouldStop: false,
        warning: 'Llevas 2 horas. Considera un descanso de 15 minutos pronto.',
        severity: 'low'
      };
    }

    return { shouldStop: false };
  }

  /**
   * Callback para actualizaciones de timer
   */
  onTick(callback) {
    this.onTickCallback = callback;
  }

  onComplete(callback) {
    this.onCompleteCallback = callback;
  }

  /**
   * Estadísticas de la sesión actual
   */
  getCurrentSessionStats() {
    if (!this.currentSession) return null;

    const now = Date.now();
    const elapsed = now - this.currentSession.startTime;
    const activeTime = elapsed - this.currentSession.totalBreakTime;
    const stopLoss = this.shouldStopLoss();

    return {
      elapsed: Math.floor(elapsed / 1000), // segundos
      activeTime: Math.floor(activeTime / 1000),
      pomodorosCompleted: this.currentSession.pomodorosCompleted,
      isPaused: this.currentSession.isPaused,
      stopLoss
    };
  }

  // ============ ESTADÍSTICAS HISTÓRICAS ============

  async getWeeklyStats(weeks = 1) {
    const sessions = await this.sm.getStudyHistory(7 * weeks);
    
    const stats = {
      totalSessions: sessions.length,
      totalMinutes: 0,
      totalXP: 0,
      averageEnergy: 0,
      byDay: {},
      bySource: {},
      streak: await this.calculateStreak()
    };

    let energySum = 0;
    let energyCount = 0;

    for (const session of sessions) {
      const minutes = Math.floor((session.duration || 0) / 60000);
      stats.totalMinutes += minutes;
      stats.totalXP += minutes; // 1 XP = 1 minuto

      // Por día
      const day = new Date(session.date).toLocaleDateString('es-ES', { weekday: 'short' });
      stats.byDay[day] = (stats.byDay[day] || 0) + minutes;

      // Por fuente
      if (session.sourceId) {
        const sourceName = session.sourceName || `Fuente #${session.sourceId}`;
        stats.bySource[sourceName] = (stats.bySource[sourceName] || 0) + minutes;
      }

      // Energía promedio
      if (session.energyAtStart) {
        energySum += session.energyAtStart;
        energyCount++;
      }
    }

    stats.averageEnergy = energyCount > 0 ? (energySum / energyCount).toFixed(1) : 'N/A';

    return stats;
  }

  async calculateStreak() {
    const sessions = await this.sm.getStudyHistory(365);
    if (sessions.length === 0) return 0;

    // Obtener fechas únicas con sesiones
    const studyDates = [...new Set(
      sessions.map(s => s.date.split('T')[0])
    )].sort();

    // Calcular racha actual
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Verificar si hay sesión hoy o ayer
    const lastSession = studyDates[studyDates.length - 1];
    if (lastSession !== today && lastSession !== yesterday) {
      return 0; // Racha rota
    }

    // Contar días consecutivos hacia atrás
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (studyDates.includes(dateStr)) {
        streak++;
      } else if (i > 0) { // Hoy puede no tener sesión aún
        break;
      }
    }

    return streak;
  }

  async getBestStudyHours() {
    const sessions = await this.sm.getStudyHistory(90);
    const hourStats = {};

    for (const session of sessions) {
      const hour = new Date(session.date).getHours();
      if (!hourStats[hour]) {
        hourStats[hour] = { sessions: 0, minutes: 0 };
      }
      hourStats[hour].sessions++;
      hourStats[hour].minutes += Math.floor((session.duration || 0) / 60000);
    }

    // Ordenar por minutos totales
    return Object.entries(hourStats)
      .sort((a, b) => b[1].minutes - a[1].minutes)
      .slice(0, 3)
      .map(([hour, stats]) => ({
        hour: Number(hour),
        formatted: `${hour}:00 - ${hour + 1}:00`,
        ...stats
      }));
  }

  // ============ MÉTODOS PRIVADOS ============

  _startPomodoro() {
    if (!this.currentSession) return;

    const pomodoroMs = this.currentSession.pomodoroDuration;

    this.timerId = setTimeout(() => {
      this._onPomodoroComplete();
    }, pomodoroMs);

    // Notificar progreso cada minuto (opcional)
    if (this.onTickCallback) {
      this._tickInterval = setInterval(() => {
        if (this.currentSession && !this.currentSession.isPaused) {
          const stats = this.getCurrentSessionStats();
          this.onTickCallback(stats);
        }
      }, 60000);
    }
  }

  _onPomodoroComplete() {
    if (!this.currentSession) return;

    this.currentSession.pomodorosCompleted++;
    this.currentSession.totalFocusTime += this.currentSession.pomodoroDuration;

    if (this.onCompleteCallback) {
      this.onCompleteCallback({
        type: 'pomodoro',
        pomodoroNumber: this.currentSession.pomodorosCompleted,
        totalFocusTime: this.currentSession.totalFocusTime
      });
    }

    // Auto-iniciar break (el usuario debe reanudar manualmente después del break)
    console.log('[SessionTracker] Pomodoro completado. Descanso de 5 minutos.');
  }

  async _awardXP(minutes) {
    const currentXP = await this.sm.get('xp') || 0;
    const newXP = currentXP + minutes;
    await this.sm.set('xp', newXP);

    // Calcular nuevo nivel (1 nivel por cada 1000 XP)
    const newLevel = Math.floor(newXP / 1000) + 1;
    const currentLevel = await this.sm.get('level') || 1;

    if (newLevel > currentLevel) {
      await this.sm.set('level', newLevel);
      console.log(`[SessionTracker] ¡Subiste al nivel ${newLevel}!`);
    }

    return minutes; // XP ganado
  }

  async _updateStreak() {
    const streak = await this.calculateStreak();
    await this.sm.set('streak', streak);
    return streak;
  }

  async _updateSourceProgress(sourceId, minutesStudied) {
    const progress = await this.sm.get('sourceProgress') || {};
    
    // Obtener fuente para calcular porcentaje
    // Esto requeriría integración con SourceLibrary
    // Por ahora, acumulamos minutos
    const currentMinutes = progress[sourceId]?.minutes || 0;
    const totalMinutes = currentMinutes + minutesStudied;

    // Asumimos 10 horas = 100% para fuentes típicas
    const estimatedTotalMinutes = 600; // 10 horas
    const percentage = Math.min(100, Math.floor((totalMinutes / estimatedTotalMinutes) * 100));

    progress[sourceId] = {
      minutes: totalMinutes,
      percentage,
      lastStudied: new Date().toISOString()
    };

    await this.sm.set('sourceProgress', progress);
  }
}

export default SessionTracker;
export { SessionTracker };
