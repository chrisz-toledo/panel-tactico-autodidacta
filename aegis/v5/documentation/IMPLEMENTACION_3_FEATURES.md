# 🔧 IMPLEMENTACIÓN: CodeCombat + Biohacking + Música

## 📋 Análisis Técnico Pre-Implementación

---

## 1️⃣ CODECOMBAT — Sincronización Real

### Arquitectura Técnica (Sin Mock)

**Problema:** CodeCombat no tiene API pública oficial para perfiles
**Solución real:** Web scraping controlado + localStorage sync manual

### Implementación:

```javascript
// Sistema de sincronización CodeCombat
const CODECOMBAT_CONFIG = {
  profileUrl: 'https://codecombat.com/user/{username}',
  levelsApi: 'https://codecombat.com/db/user/{username}/level-sessions',
  achievementsApi: 'https://codecombat.com/db/user/{username}/achievements'
};

// Estado de sincronización
STATE.codeCombat = {
  username: null,                    // Username de CodeCombat
  lastSync: null,                    // Timestamp última sync
  isSyncing: false,                  // Flag de sincronización activa
  levelProgress: {},                 // {levelId: {completed, stars, code, date}}
  totalLevelsCompleted: 0,
  currentCourse: null,               // 'introduction-to-computer-science' | etc
  xpEarned: 0,                       // XP total en CodeCombat
  timeSpentMinutes: 0,               // Tiempo total jugado
  conceptsLearned: [],               // ['variables', 'loops', 'conditionals', ...]
  skillProgression: {                // Progreso por habilidad
    'python': 0,                     // 0-100%
    'javascript': 0,
    'problem-solving': 0,
    'algorithms': 0
  },
  lastLevelPlayed: null,             // Para continuar donde quedó
  syncHistory: []                    // Log de sincronizaciones
};
```

### Funciones:

```javascript
// 1. Configurar username de CodeCombat
function setCodeCombatUsername(username) {
  STATE.codeCombat.username = username;
  save();
  showDopamineHit('🎮', `Perfil CodeCombat configurado: ${username}`);
}

// 2. Sincronización manual (usuario copia/pega progreso)
function syncCodeCombatProgress(progressData) {
  // progressData viene de export manual de CodeCombat o scraping
  // Validar estructura
  if (!validateCodeCombatData(progressData)) {
    alert('Formato de datos inválido. Usa el export de CodeCombat.');
    return false;
  }
  
  // Actualizar estado
  STATE.codeCombat.levelProgress = progressData.levels;
  STATE.codeCombat.totalLevelsCompleted = progressData.completedCount;
  STATE.codeCombat.xpEarned = progressData.totalXP;
  STATE.codeCombat.timeSpentMinutes = progressData.playTime;
  STATE.codeCombat.conceptsLearned = extractConcepts(progressData.levels);
  STATE.codeCombat.lastSync = new Date().toISOString();
  STATE.codeCombat.syncHistory.push({
    date: new Date().toISOString(),
    levelsBefore: STATE.codeCombat.totalLevelsCompleted,
    levelsAfter: progressData.completedCount,
    xpGained: progressData.totalXP - (STATE.codeCombat.syncHistory.slice(-1)[0]?.xpAfter || 0)
  });
  
  // Sync con AEGIS XP
  const xpToAdd = calculateAEGISXPFromCodeCombat(progressData);
  STATE.xp += xpToAdd;
  
  save();
  updateCodeCombatWidget();
  showDopamineHit('🎮', `Sync completada: +${xpToAdd} XP de CodeCombat`);
  return true;
}

// 3. Extraer conceptos aprendidos de niveles completados
function extractConcepts(levels) {
  const conceptMap = {
    'dungeons-of-kithgard': ['sequences'],
    'gems-in-the-deep': ['movement'],
    'shadow-guard': ['strings'],
    'forgetful-gemsmith': ['variables'],
    'kounter-kithwise': ['loops-basic'],
    'crawlways-of-kithgard': ['loops-while'],
    'illustrious-imanzi': ['functions-basic'],
    'raiders-of-the-long-dark': ['conditionals'],
    'kithgard-librarian': ['comparison-operators'],
    'closing-the-distance': ['arithmetic'],
    'the-final-kithmaze': ['nested-loops'],
    'descending-further': ['break-statements'],
    'kithgard-gates': ['boolean-logic'],
    'cloudrip-mountain': ['arrays-basic'],
    'backwoods-bombardier': ['object-properties'],
    'java-script-and-the-maze': ['javascript-syntax']
  };
  
  const concepts = new Set();
  Object.entries(levels).forEach(([levelId, data]) => {
    if (data.completed && conceptMap[levelId]) {
      conceptMap[levelId].forEach(c => concepts.add(c));
    }
  });
  
  return Array.from(concepts);
}

// 4. Calcular XP de AEGIS basado en progreso CodeCombat
function calculateAEGISXPFromCodeCombat(progressData) {
  const baseXP = progressData.completedCount * 50;  // 50 XP por nivel
  const starsBonus = progressData.totalStars * 10;  // 10 XP por estrella
  const conceptsBonus = extractConcepts(progressData.levels).length * 25; // 25 XP por concepto
  return baseXP + starsBonus + conceptsBonus;
}
```

### UI:

```html
<div class="nav-section">
  <div class="nav-title">🎮 CodeCombat Sync</div>
  <div id="codeCombatWidget" style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;">
    <input type="text" id="ccUsername" placeholder="Tu username de CodeCombat" style="width:100%;margin-bottom:8px;padding:6px;background:var(--bg-primary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);">
    <button onclick="setCodeCombatUsername(document.getElementById('ccUsername').value)" style="width:100%;margin-bottom:8px;padding:6px;font-size:11px;background:var(--accent-blue);border:none;border-radius:6px;color:white;cursor:pointer;">Configurar Username</button>
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">
      1. Exporta tu progreso de CodeCombat<br>
      2. Pega los datos aquí:<br>
      <textarea id="ccProgressData" placeholder="Pega JSON de progreso aquí..." style="width:100%;height:60px;margin-top:4px;background:var(--bg-primary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);font-family:var(--font-mono);font-size:10px;"></textarea>
    </div>
    <button onclick="syncCodeCombatManual()" style="width:100%;padding:6px;font-size:11px;background:var(--accent-green);border:none;border-radius:6px;color:#000;cursor:pointer;font-weight:600;">🔄 Sincronizar Progreso</button>
    <div id="ccStats" style="margin-top:8px;font-size:11px;color:var(--text-secondary);">
      <!-- Stats aparecen aquí después de sync -->
    </div>
  </div>
</div>
```

---

## 2️⃣ BIOHACKING — Respaldo Científico

### Fundamentos Científicos:

1. **Cronotipos** (Morningness-Eveningness Questionnaire - MEQ)
   - Horne & Östberg, 1976
   - 19% population son evening types, 25% morning types

2. **Ciclos Ultradianos** (90-120 min)
   - Nathaniel Kleitman, 1950s
   - Basic Rest-Activity Cycle (BRAC)
   - Aplicación: Pomodoro 25/5 no es óptimo para todos

3. **Luz y Melatonina**
   - Lux recomendado: >1000 lux por la mañana suprime melatonina
   - Temperature de color: 6500K (azul) por la mañana, 2700K (cálida) por la noche

4. **Suplementos Evidence-Based**
   - Cafeína: 100-200mg, peak 30-60min, half-life 5-6 horas
   - L-teanina: 200mg, sinérgica con cafeína
   - Creatina: 5g diario, mejora cognición (McMorris et al., 2007)
   - Magnesio L-treonato: mejora plasticidad sináptica (Slutsky et al., 2010)

### Implementación:

```javascript
// Sistema de Biohacking con respaldo científico
const BIOHACKING_PROTOCOLS = {
  // Protocolo 1: Cronotipo Assessment
  chronotypeAssessment: {
    questions: [
      {id: 1, text: "¿A qué hora te despiertas sin alarma los fines de semana?", 
       options: [{val: 1, text: "5-6am"}, {val: 2, text: "6-7am"}, {val: 3, text: "7-8am"}, {val: 4, text: "8-9am"}, {val: 5, text: "9am+"}]},
      {id: 2, text: "¿Cuánto tiempo después de despertarte te sientes 100% funcional?",
       options: [{val: 5, text: "0-10 min"}, {val: 4, text: "10-30 min"}, {val: 3, text: "30-60 min"}, {val: 2, text: "1-2 horas"}, {val: 1, text: "2+ horas"}]},
      {id: 3, text: "¿A qué hora prefieres hacer ejercicio intenso?",
       options: [{val: 5, text: "5-6am"}, {val: 4, text: "6-8am"}, {val: 3, text: "8-10am"}, {val: 2, text: "Tarde"}, {val: 1, text: "Noche"}]}
    ],
    calculateChronotype: (answers) => {
      const score = answers.reduce((a, b) => a + b, 0);
      if (score >= 12) return {type: 'definitely-evening', label: '🌙 Definitivamente Nocturno', peakHours: [20,21,22,23]};
      if (score >= 9) return {type: 'moderately-evening', label: '🌆 Moderadamente Nocturno', peakHours: [18,19,20,21]};
      if (score >= 6) return {type: 'intermediate', label: '⚖️ Intermedio', peakHours: [10,11,14,15]};
      if (score >= 3) return {type: 'moderately-morning', label: '🌅 Moderadamente Matutino', peakHours: [8,9,10,11]};
      return {type: 'definitely-morning', label: '☀️ Definitivamente Matutino', peakHours: [6,7,8,9]};
    }
  },
  
  // Protocolo 2: Ciclos Ultradianos (BRAC)
  ultradianCycles: {
    defaultCycle: 90,  // minutos
    calculateOptimalBreaks: (studyDuration) => {
      // Nathaniel Kleitman's BRAC: 90-120 min cycles
      // Para estudio intenso: trabajar 90, descansar 20 (no pomodoro 25/5)
      const cycles = Math.floor(studyDuration / 90);
      const breaks = [];
      for (let i = 1; i <= cycles; i++) {
        breaks.push(i * 90);  // minutos
      }
      return breaks;
    },
    getRecommendedSessionLength: (chronotype, currentHour) => {
      const isPeak = chronotype.peakHours.includes(currentHour);
      return isPeak ? 90 : 45;  // 90 min en peak, 45 en off-peak
    }
  },
  
  // Protocolo 3: Suplementación Timing
  supplementation: {
    caffeine: {
      optimalDose: 100,  // mg
      maxDaily: 400,
      peakEffect: 45,  // minutos
      halfLife: 330,   // minutos (5.5 horas)
      cutoffTime: 14,  // hora del día (2pm) para no afectar sueño
      warning: "☕ Última dosis recomendada: 2:00 PM (evita insomnio)"
    },
    lTheanine: {
      optimalDose: 200,  // mg
      synergisticWith: 'caffeine',
      ratio: '1:1',  // 100mg cafeína : 100mg L-teanina ( optimal)
    },
    creatine: {
      optimalDose: 5000,  // mg (5g)
      timing: 'anytime',  // no dependiente de hora
      loadingPhase: false,  // 5g diario es suficiente, no necesita loading
      cognitiveBenefits: ['working-memory', 'processing-speed', 'mental-fatigue-reduction']
    },
    magnesium: {
      form: 'L-threonate',  // única forma que cruza barrera hematoencefálica eficientemente
      optimalDose: 2000,    // mg (2g)
      timing: 'evening',   // antes de dormir, mejora calidad del sueño
      mechanism: 'NMDA-receptor-modulation'
    }
  },
  
  // Protocolo 4: Light Exposure (Lux)
  lightExposure: {
    morning: {
      targetLux: 1000,      // lux
      duration: 30,       // minutos
      colorTemp: 6500,    // K (fría/azul)
      effect: 'melatonin-suppression-cortisol-activation'
    },
    evening: {
      targetLux: 50,      // lux (baja)
      colorTemp: 2700,    // K (cálida/ámbar)
      cutoffTime: 21,     // 9pm
      effect: 'melatonin-production-preparation'
    }
  }
};

// Estado de Biohacking en STATE
STATE.biohacking = {
  chronotype: null,              // Resultado del assessment
  assessmentDate: null,          // Cuándo se hizo
  supplementationLog: [],        // [{date, supplement, dose, time, notes}]
  studySessions: [],             // [{date, startTime, duration, breaksTaken, productivitySelfRated}]
  lightExposureLog: [],          // [{date, morningLux, eveningLux}]
  protocolsActive: {             // Qué protocolos tiene activados
    chronotype: false,
    ultradian: true,
    supplementation: false,
    light: false
  }
};
```

### UI de Biohacking:

```html
<div class="nav-section">
  <div class="nav-title">🧬 Biohacking Lab</div>
  
  <!-- Assessment de Cronotipo -->
  <div id="biohackingChronotype" style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:12px;">
    <div style="font-size:12px;font-weight:600;color:var(--accent-cyan);margin-bottom:8px;">🧭 Tu Cronotipo</div>
    <div id="chronotypeResult" style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">
      No determinado. Haz el assessment para optimizar tu ritmo.
    </div>
    <button onclick="showChronotypeAssessment()" style="width:100%;padding:6px;font-size:11px;background:var(--accent-blue);border:none;border-radius:6px;color:white;cursor:pointer;">📝 Assessment (3 min)</button>
  </div>
  
  <!-- Timer Ultradiano -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:12px;">
    <div style="font-size:12px;font-weight:600;color:var(--accent-cyan);margin-bottom:8px;">⏱️ Ciclo Ultradiano</div>
    <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;">
      Basado en BRAC de Kleitman (90-min cycles)
    </div>
    <div id="ultradianTimer" style="font-size:24px;font-weight:700;color:var(--accent-gold);text-align:center;font-family:var(--font-mono);">
      90:00
    </div>
    <div style="display:flex;gap:6px;margin-top:8px;">
      <button onclick="startUltradianCycle()" style="flex:1;padding:6px;font-size:11px;background:var(--accent-green);border:none;border-radius:6px;color:#000;cursor:pointer;font-weight:600;">▶️ Iniciar</button>
      <button onclick="pauseUltradianCycle()" style="flex:1;padding:6px;font-size:11px;background:var(--accent-gold);border:none;border-radius:6px;color:#000;cursor:pointer;">⏸️ Pausa</button>
    </div>
    <div id="ultradianStatus" style="font-size:10px;color:var(--text-muted);margin-top:6px;text-align:center;">
      Listo para sesión de 90 minutos
    </div>
  </div>
  
  <!-- Tracker de Suplementos -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;">
    <div style="font-size:12px;font-weight:600;color:var(--accent-cyan);margin-bottom:8px;">💊 Stack de Hoy</div>
    <div id="supplementTracker" style="font-size:11px;color:var(--text-secondary);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <input type="checkbox" id="supp-caffeine" onchange="logSupplement('caffeine', this.checked)">
        <label for="supp-caffeine">☕ Cafeína 100mg</label>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <input type="checkbox" id="supp-ltheanine" onchange="logSupplement('lTheanine', this.checked)">
        <label for="supp-ltheanine">🍵 L-Teanina 200mg</label>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <input type="checkbox" id="supp-creatine" onchange="logSupplement('creatine', this.checked)">
        <label for="supp-creatine">⚡ Creatina 5g</label>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="supp-magnesium" onchange="logSupplement('magnesium', this.checked)">
        <label for="supp-magnesium">🧪 Magnesio L-Treonato 2g</label>
      </div>
    </div>
    <div id="caffeineWarning" style="display:none;font-size:10px;color:var(--accent-red);margin-top:8px;background:rgba(239,68,68,0.1);padding:6px;border-radius:6px;">
      ⚠️ Pasadas las 2:00 PM. Cafeína afectará sueño.
    </div>
  </div>
</div>
```

---

## 3️⃣ MÚSICA — Estados de Flujo

### Fundamentos Científicos:

1. **40 Hz Binaural Beats** (Gamma)
   - Mejora memoria de trabajo, atención, procesamiento
   - Beauchene et al., 2016

2. **Isochronic Tones** (no requieren auriculares)
   - Más potente que binaural para entrenamiento cerebral
   
3. **Música sin letras para concentración profunda**
   - Daft Punk - Tron Legacy (film score)
   - Ludovico Einaudi - Divenire
   - Max Richter - Sleep (8 horas)

4. **Solfeggio Frequencies**
   - 528 Hz: Transformación y milagros
   - 432 Hz: Naturaleza, universo

### Implementación:

```javascript
// Sistema de Música para Estados de Flujo
const MUSIC_PROTOCOLS = {
  deepFocus: {
    name: '🎯 Deep Focus (Gamma 40Hz)',
    description: '40Hz binaural beats para memoria de trabajo y concentración',
    frequency: 40,  // Hz
    type: 'binaural',
    requiresHeadphones: true,
    duration: 90,  // minutos (match con ultradiano)
    playlist: [
      {name: '40Hz Gamma Binaural', url: 'https://example.com/gamma-40hz.mp3'},
      {name: 'Study Alpha Waves', url: 'https://example.com/alpha-study.mp3'}
    ],
    scientificRef: 'Beauchene et al., 2016 - Frontiers in Human Neuroscience'
  },
  
  creativeFlow: {
    name: '🌊 Creative Flow (Alpha 10Hz)',
    description: 'Alpha waves para creatividad y relajación alerta',
    frequency: 10,  // Hz
    type: 'isochronic',
    requiresHeadphones: false,
    duration: 60,
    playlist: [
      {name: 'Alpha Waves Creativity', url: 'https://example.com/alpha-creative.mp3'},
      {name: 'Ambient Coding', url: 'https://example.com/ambient-code.mp3'}
    ],
    scientificRef: 'Alpha synchronization enhances creative thinking'
  },
  
  learningMode: {
    name: '📚 Learning Mode (SMR 12-15Hz)',
    description: 'Sensorimotor Rhythm para aprendizaje y retención',
    frequency: 13,  // Hz (promedio 12-15)
    type: 'binaural',
    requiresHeadphones: true,
    duration: 45,
    playlist: [
      {name: 'SMR Study Aid', url: 'https://example.com/smr-learning.mp3'}
    ],
    scientificRef: 'SMR neurofeedback enhances learning retention'
  },
  
  relaxationBreak: {
    name: '☕ Break & Recharge (Theta 6Hz)',
    description: 'Theta waves para recuperación entre ciclos',
    frequency: 6,  // Hz
    type: 'isochronic',
    requiresHeadphones: false,
    duration: 20,  // minutos (break entre ciclos ultradianos)
    playlist: [
      {name: 'Theta Meditation', url: 'https://example.com/theta-relax.mp3'}
    ],
    scientificRef: 'Theta waves associated with REM sleep, memory consolidation'
  },
  
  filmScores: {
    name: '🎬 Epic Coding (Film Scores)',
    description: 'Música sin letras, orquestal, para sesiones largas',
    type: 'playlist',
    requiresHeadphones: false,
    duration: 120,
    playlist: [
      {name: 'Tron Legacy - Daft Punk', url: 'https://open.spotify.com/album/...'},
      {name: 'Interstellar - Hans Zimmer', url: 'https://open.spotify.com/album/...'},
      {name: 'The Social Network - Trent Reznor', url: 'https://open.spotify.com/album/...'},
      {name: 'Divenire - Ludovico Einaudi', url: 'https://open.spotify.com/album/...'}
    ],
    scientificRef: 'Music without lyrics reduces cognitive interference'
  }
};

// Estado de música
STATE.music = {
  currentProtocol: null,
  isPlaying: false,
  volume: 0.5,
  sessionStartTime: null,
  sessionHistory: [],
  preferredProtocol: 'deepFocus',  // default
  externalPlayer: null  // 'spotify' | 'youtube' | 'apple-music'
};
```

### Funciones:

```javascript
// 1. Iniciar protocolo de música
function startMusicProtocol(protocolKey) {
  const protocol = MUSIC_PROTOCOLS[protocolKey];
  if (!protocol) return;
  
  STATE.music.currentProtocol = protocolKey;
  STATE.music.isPlaying = true;
  STATE.music.sessionStartTime = new Date().toISOString();
  
  // Abrir en reproductor externo
  if (protocol.playlist.length > 0) {
    window.open(protocol.playlist[0].url, '_blank');
  }
  
  updateMusicWidget();
  showDopamineHit('🎵', `Iniciado: ${protocol.name}`);
}

// 2. Sincronizar con ciclo ultradiano
function syncMusicWithUltradian(cycleStatus) {
  if (!STATE.music.autoSync) return;
  
  if (cycleStatus === 'focus') {
    startMusicProtocol('deepFocus');
  } else if (cycleStatus === 'break') {
    startMusicProtocol('relaxationBreak');
  }
}

// 3. Registrar sesión de música completada
function logMusicSession() {
  if (!STATE.music.sessionStartTime) return;
  
  const duration = (new Date() - new Date(STATE.music.sessionStartTime)) / 1000 / 60;  // minutos
  STATE.music.sessionHistory.push({
    date: new Date().toISOString(),
    protocol: STATE.music.currentProtocol,
    duration: duration,
    productivityRating: null  // usuario ratea después
  });
  
  save();
}
```

### UI de Música:

```html
<div class="nav-section">
  <div class="nav-title">🎵 Música para Flujo</div>
  
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;">
    <div style="font-size:12px;font-weight:600;color:var(--accent-cyan);margin-bottom:8px;">🎧 Protocolos Científicos</div>
    
    <button onclick="startMusicProtocol('deepFocus')" style="width:100%;margin-bottom:6px;padding:8px;font-size:11px;background:linear-gradient(135deg,var(--accent-blue),var(--accent-purple));border:none;border-radius:6px;color:white;cursor:pointer;text-align:left;display:flex;align-items:center;gap:6px;">
      <span>🎯</span>
      <div style="flex:1;">
        <div style="font-weight:600;">Deep Focus</div>
        <div style="font-size:9px;opacity:0.8;">40Hz Gamma - Memoria de trabajo</div>
      </div>
    </button>
    
    <button onclick="startMusicProtocol('creativeFlow')" style="width:100%;margin-bottom:6px;padding:8px;font-size:11px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);cursor:pointer;text-align:left;display:flex;align-items:center;gap:6px;">
      <span>🌊</span>
      <div style="flex:1;">
        <div style="font-weight:600;">Creative Flow</div>
        <div style="font-size:9px;color:var(--text-muted);">10Hz Alpha - Creatividad</div>
      </div>
    </button>
    
    <button onclick="startMusicProtocol('learningMode')" style="width:100%;margin-bottom:6px;padding:8px;font-size:11px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);cursor:pointer;text-align:left;display:flex;align-items:center;gap:6px;">
      <span>📚</span>
      <div style="flex:1;">
        <div style="font-weight:600;">Learning Mode</div>
        <div style="font-size:9px;color:var(--text-muted);">12-15Hz SMR - Retención</div>
      </div>
    </button>
    
    <button onclick="startMusicProtocol('filmScores')" style="width:100%;padding:8px;font-size:11px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);cursor:pointer;text-align:left;display:flex;align-items:center;gap:6px;">
      <span>🎬</span>
      <div style="flex:1;">
        <div style="font-weight:600;">Epic Coding</div>
        <div style="font-size:9px;color:var(--text-muted);">Film Scores - Sin letras</div>
      </div>
    </button>
    
    <div style="margin-top:10px;padding:8px;background:rgba(59,130,246,0.1);border-radius:6px;">
      <div style="font-size:10px;color:var(--accent-cyan);margin-bottom:4px;">🧠 Auto-sync con Ritmo Circadiano</div>
      <label style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-secondary);">
        <input type="checkbox" id="musicAutosync" onchange="toggleMusicAutosync(this.checked)" checked>
        Sincronizar música con ciclos de estudio
      </label>
    </div>
  </div>
</div>
```

---

## 🔄 INTEGRACIÓN ENTRE SISTEMAS

### Flujo Integrado:

```
1. Usuario inicia sesión de estudio
   ↓
2. Ritmo Circadiano sugiere fuente óptima
   ↓
3. Biohacking Timer inicia ciclo ultradiano (90 min)
   ↓
4. Música inicia automáticamente (protocolo según dificultad de fuente)
   ↓
   - Fuente 'high' → Deep Focus (40Hz)
   - Fuente 'medium' → Learning Mode (SMR)
   - Break → Relaxation (Theta)
   ↓
5. CodeCombat sync añade XP si completó niveles
   ↓
6. Al final de 90 min: break obligatorio + cambio de música
```

### Diagrama de Estado:

```javascript
// Sistema integrado
STATE.integratedSession = {
  active: false,
  startTime: null,
  plannedDuration: 90,  // minutos
  
  // Sub-sistemas activos
  circadian: {
    suggestedSource: null,
    energyAtStart: null
  },
  biohacking: {
    cycleType: 'focus',  // 'focus' | 'break'
    timerEnd: null
  },
  music: {
    protocol: null,
    autoChanged: false  // true si cambió automáticamente por ciclo
  },
  codeCombat: {
    levelsBefore: 0,
    xpBefore: 0
  }
};
```

---

## 📊 RESUMEN DE IMPLEMENTACIÓN

| Feature | Complejidad | Líneas Est. | Integraciones |
|---------|-------------|-------------|---------------|
| CodeCombat | Media | ~250 | XP sync, concept mapping |
| Biohacking | Alta | ~400 | Ultradiano, suplementos, luz |
| Música | Media | ~200 | Auto-sync con ciclos |
| **TOTAL** | **Alta** | **~850** | **3 sistemas integrados** |

---

*Próximo paso: Implementar CodeCombat (Feature #2)*
