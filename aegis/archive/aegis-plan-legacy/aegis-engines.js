// ============================================================
// PROYECTO AEGIS — AGENTE 3: PSICÓLOGO — MOTORES DE CALIBRACIÓN
// ============================================================

const CalibrationEngine = {
  // Bayesian Knowledge Tracing simplified
  skills: {},

  initSkill(skillId) {
    if (!this.skills[skillId]) {
      this.skills[skillId] = { p_known: 0.1, p_learn: 0.4, p_forget: 0.05, p_guess: 0.2, p_slip: 0.1 };
    }
  },

  update(skillId, correct) {
    this.initSkill(skillId);
    const s = this.skills[skillId];
    const p_correct = s.p_known * (1 - s.p_slip) + (1 - s.p_known) * s.p_guess;
    const p_wrong   = s.p_known * s.p_slip        + (1 - s.p_known) * (1 - s.p_guess);
    const posterior = correct
      ? (s.p_known * (1 - s.p_slip)) / p_correct
      : (s.p_known * s.p_slip)       / p_wrong;
    s.p_known = posterior + (1 - posterior) * s.p_learn;
    s.p_known = Math.min(0.99, Math.max(0.01, s.p_known));
    return s.p_known;
  },

  getMastery(skillId) {
    this.initSkill(skillId);
    return Math.round(this.skills[skillId].p_known * 100);
  },

  shouldAdvance(skillId) {
    return this.getMastery(skillId) >= 85;
  },

  getFatigueAdjustment(sessions_today, avg_score) {
    if (sessions_today >= 4 || avg_score < 50) return { action: "REST", extra_break: 20, reduce_difficulty: true };
    if (sessions_today >= 3 || avg_score < 65) return { action: "LIGHTER", extra_break: 10, reduce_difficulty: false };
    if (avg_score >= 85) return { action: "CHALLENGE", extra_break: 0, increase_difficulty: true };
    return { action: "NORMAL", extra_break: 0 };
  },

  getAdaptiveDuration(base_minutes, score, streak) {
    let duration = base_minutes;
    if (score >= 90) duration = Math.min(base_minutes + 10, 50);
    if (score < 60) duration = Math.max(base_minutes - 10, 20);
    if (streak >= 7) duration = Math.min(duration + 5, 50);
    return duration;
  }
};

const PsychologyEngine = {
  ACHIEVEMENTS: [
    { id: "phoenix",      title: "Fénix",          desc: "Estudia después de fallar 3 días seguidos",   icon: "🔥", xp: 500,  condition: (s) => s.comeback_streak >= 3 },
    { id: "steel_mind",   title: "Mente de Acero",  desc: "25 días de racha sin fallar",                 icon: "🧠", xp: 1000, condition: (s) => s.streak >= 25 },
    { id: "night_owl",    title: "Búho Nocturno",   desc: "Estudia después de las 11pm cinco veces",     icon: "🦉", xp: 200,  condition: (s) => s.late_night_count >= 5 },
    { id: "marathon",     title: "Maratonista",     desc: "4 sesiones Pomodoro en un día",               icon: "🏃", xp: 300,  condition: (s) => s.daily_pomodoros >= 4 },
    { id: "centurion",    title: "Centurión",        desc: "100 días totales de estudio",                 icon: "⚔️", xp: 2000, condition: (s) => s.total_days >= 100 },
    { id: "algorithm",   title: "Algorithm God",   desc: "Completa todos los ejercicios Code Combat",   icon: "💻", xp: 1500, condition: (s) => s.cc_complete >= 10 },
    { id: "hacker",      title: "Iniciado Hacker",  desc: "Completa OverTheWire Bandit nivel 10",        icon: "🕵️", xp: 800,  condition: (s) => s.otw_level >= 10 },
    { id: "consistent",  title: "Consistencia",     desc: "7 semanas seguidas con al menos 5 días",      icon: "📅", xp: 600,  condition: (s) => s.consistent_weeks >= 7 },
    { id: "speedrun",    title: "Speedrunner",      desc: "Puntaje perfecto en 3 sesiones seguidas",     icon: "⚡", xp: 400,  condition: (s) => s.perfect_streak >= 3 },
    { id: "aegis_master",title: "Maestro AEGIS",    desc: "Completa el plan de 10 años",                 icon: "👑", xp: 10000,condition: (s) => s.phase >= 7 && s.week >= 256 }
  ],

  EMOTIONAL_FEEDBACK: {
    elite:    { msg: "¡MODO ÉLITE ACTIVADO! Rendimiento excepcional. El 1% superior.",  color: "#ffd700", animation: "pulse-gold" },
    great:    { msg: "¡Excelente trabajo! La consistencia te llevará lejos.",            color: "#00ff88", animation: "glow-green" },
    good:     { msg: "Buen progreso. Cada sesión cuenta. Sigue adelante.",              color: "#00b4d8", animation: "fade-blue" },
    okay:     { msg: "Sesión completada. La perseverancia es la clave del éxito.",      color: "#f4a261", animation: "soft-orange" },
    struggle: { msg: "Los mejores programadores también tienen días difíciles. Mañana es nuevo.", color: "#e63946", animation: "breathe-red" },
    comeback: { msg: "¡FÉNIX! Volviste después de caer. Eso te hace extraordinario.",  color: "#ff6b6b", animation: "pulse-red" }
  },

  getEmotionalFeedback(score, streak, was_absent) {
    if (was_absent && streak > 0) return this.EMOTIONAL_FEEDBACK.comeback;
    if (score >= 90 && streak >= 7) return this.EMOTIONAL_FEEDBACK.elite;
    if (score >= 80) return this.EMOTIONAL_FEEDBACK.great;
    if (score >= 65) return this.EMOTIONAL_FEEDBACK.good;
    if (score >= 50) return this.EMOTIONAL_FEEDBACK.okay;
    return this.EMOTIONAL_FEEDBACK.struggle;
  },

  checkAchievements(stats, unlocked) {
    const newUnlocked = [];
    for (const ach of this.ACHIEVEMENTS) {
      if (!unlocked.includes(ach.id) && ach.condition(stats)) {
        newUnlocked.push(ach);
      }
    }
    return newUnlocked;
  },

  getCognitiveLoad(sessions_today, avg_score, hour) {
    let load = 0;
    load += sessions_today * 15;
    load += (100 - avg_score) * 0.3;
    if (hour >= 22 || hour < 7) load += 20;
    const state = load < 30 ? "optimal" : load < 55 ? "moderate" : load < 75 ? "high" : "overload";
    return { score: Math.round(load), state, recommendation: this.getLoadRecommendation(state) };
  },

  getLoadRecommendation(state) {
    const recs = {
      optimal: "Condición ideal para aprender contenido nuevo y difícil.",
      moderate: "Buen momento para práctica y consolidación.",
      high: "Considera tomar un descanso activo de 10 min antes de continuar.",
      overload: "STOP. Descansa 30 min. Hidratate. Tu cerebro necesita consolidar."
    };
    return recs[state];
  }
};

const MusicEngine = {
  suggestPlaylist(mode, score, hour) {
    if (mode === "sprint" || score >= 85) return "high_energy";
    if (mode === "rest" || score < 50 || (hour >= 21)) return "recovery";
    if (mode === "creative") return "creative_mode";
    return "deep_focus";
  },

  getPlaylistInfo(key, playlists) {
    return playlists[key] || playlists.deep_focus;
  }
};
