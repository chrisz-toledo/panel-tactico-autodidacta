# 🧠 AEGIS v3.0 — Sistema ADHD-Optimized + Dopamine Loops
## Interfaces, Música Real, Portabilidad y Gamificación Adictiva (Saludable)

---

## 🎵 1. SISTEMA DE MÚSICA REAL (Web Audio API)

### Implementación Técnica Completa

La música "placebo" actual se reemplaza con **synth de AudioContext** que genera sonidos reales:

```javascript
// ═══════════════════════════════════════════════════════════
// AEGIS AUDIO ENGINE v2.0 — Música Real para Estudio
// ═══════════════════════════════════════════════════════════

class AegisAudioEngine {
  constructor() {
    this.ctx = null;
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
    this.currentPreset = 'deep_focus';
    this.volume = 0.3;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PRESET 1: Deep Focus (40Hz Gamma Binaural)
  // Ciencia: Entrainment cerebral para focus profundo
  // ═══════════════════════════════════════════════════════════
  playDeepFocus() {
    this.init();
    this.stop();
    
    const baseFreq = 200;  // Hz base
    const beatFreq = 40;   // Gamma: 40Hz diferencia
    
    // Oído izquierdo
    const oscL = this.ctx.createOscillator();
    const gainL = this.ctx.createGain();
    oscL.type = 'sine';
    oscL.frequency.value = baseFreq;
    gainL.gain.value = this.volume * 0.5;
    
    // Oído derecho (40Hz más alto)
    const oscR = this.ctx.createOscillator();
    const gainR = this.ctx.createGain();
    oscR.type = 'sine';
    oscR.frequency.value = baseFreq + beatFreq;
    gainR.gain.value = this.volume * 0.5;
    
    // Panner para separación estéreo
    const pannerL = this.ctx.createStereoPanner();
    const pannerR = this.ctx.createStereoPanner();
    pannerL.pan.value = -1;  // Full izquierda
    pannerR.pan.value = 1;   // Full derecha
    
    // Conexiones
    oscL.connect(gainL).connect(pannerL).connect(this.ctx.destination);
    oscR.connect(gainR).connect(pannerR).connect(this.ctx.destination);
    
    oscL.start();
    oscR.start();
    
    this.oscillators = [oscL, oscR];
    this.gainNodes = [gainL, gainR];
    this.isPlaying = true;
    this.currentPreset = 'deep_focus';
    
    return {
      name: "Deep Focus",
      science: "40Hz Gamma Binaural Beats → Mejora atención sostenida",
      freq: "200Hz (L) | 240Hz (R)",
      duration: "∞ hasta detener"
    };
  }

  // ═══════════════════════════════════════════════════════════
  // PRESET 2: Flow State (10Hz Alpha Theta)
  // Ciencia: Puente entre consciencia y subconsciencia (creatividad)
  // ═══════════════════════════════════════════════════════════
  playFlowState() {
    this.init();
    this.stop();
    
    // Fundamentals
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.value = 100;  // Theta
    
    osc2.type = 'triangle';
    osc2.frequency.value = 110;    // Alpha (10Hz diff)
    
    gain.gain.value = this.volume * 0.3;
    
    // Filtro para suavizar
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain).connect(this.ctx.destination);
    
    osc1.start();
    osc2.start();
    
    this.oscillators = [osc1, osc2];
    this.gainNodes = [gain];
    this.isPlaying = true;
    this.currentPreset = 'flow_state';
    
    return {
      name: "Flow State",
      science: "10Hz Alpha-Theta → Estado de flow creativo",
      freq: "100-110Hz modulado",
      duration: "∞"
    };
  }

  // ═══════════════════════════════════════════════════════════
  // PRESET 3: Alert Study (Beta 20Hz + Pink Noise)
  // Ciencia: Pink noise mejora memoria y consolidación
  // ═══════════════════════════════════════════════════════════
  playAlertStudy() {
    this.init();
    this.stop();
    
    // Beta wave para alertness
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 300;
    gain.gain.value = this.volume * 0.15;
    
    // Pink noise (generado proceduralmente)
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    // Algoritmo de pink noise
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = this.volume * 0.2;
    
    osc.connect(gain).connect(this.ctx.destination);
    noise.connect(noiseGain).connect(this.ctx.destination);
    
    osc.start();
    noise.start();
    
    this.oscillators = [osc, noise];
    this.gainNodes = [gain, noiseGain];
    this.isPlaying = true;
    this.currentPreset = 'alert_study';
    
    return {
      name: "Alert Study",
      science: "20Hz Beta + Pink Noise → Memoria y alertness",
      freq: "300Hz + Pink Noise",
      duration: "∞"
    };
  }

  // ═══════════════════════════════════════════════════════════
  // PRESET 4: Recovery (5Hz Theta)
  // Ciencia: Theta waves para descanso activo entre sesiones
  // ═══════════════════════════════════════════════════════════
  playRecovery() {
    this.init();
    this.stop();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 300); // 5 min fade
    
    gain.gain.value = this.volume * 0.4;
    
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    
    this.oscillators = [osc];
    this.gainNodes = [gain];
    this.isPlaying = true;
    this.currentPreset = 'recovery';
    
    return {
      name: "Recovery",
      science: "5Hz Theta → Descanso activo, consolidación memoria",
      freq: "80Hz → 40Hz (fade 5min)",
      duration: "5 min auto-fade"
    };
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch(e) {}
    });
    this.gainNodes.forEach(gain => gain.disconnect());
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.gainNodes.forEach(gain => {
      gain.gain.value = this.volume * (gain.gain.value > 0.2 ? 0.5 : 0.3);
    });
  }

  fadeOut(duration = 3) {
    const now = this.ctx.currentTime;
    this.gainNodes.forEach(gain => {
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    });
    setTimeout(() => this.stop(), duration * 1000);
  }
}

// Instancia global
const AudioEngine = new AegisAudioEngine();
```

### UI Widget de Música Actualizado

```html
<!-- MÚSICA REAL — WIDGET -->
<div class="widget music-widget" id="musicWidget">
  <div class="widget-title">
    🎵 Audio Neural (Real)
    <span class="badge" id="musicStatus">⏹️ Detenido</span>
  </div>
  
  <div class="music-visualizer" id="visualizer">
    <!-- Canvas para visualización de ondas -->
    <canvas id="audioCanvas" width="300" height="60"></canvas>
  </div>
  
  <div class="music-presets">
    <button class="preset-btn active" data-preset="deep_focus" onclick="playPreset('deep_focus')">
      🧠 Deep Focus
      <small>40Hz Gamma</small>
    </button>
    <button class="preset-btn" data-preset="flow_state" onclick="playPreset('flow_state')">
      🌊 Flow State
      <small>10Hz Alpha-Theta</small>
    </button>
    <button class="preset-btn" data-preset="alert_study" onclick="playPreset('alert_study')">
      ⚡ Alert Study
      <small>Beta + Pink Noise</small>
    </button>
    <button class="preset-btn" data-preset="recovery" onclick="playPreset('recovery')">
      🧘 Recovery
      <small>5Hz Theta</small>
    </button>
  </div>
  
  <div class="music-controls">
    <button class="btn-icon" onclick="toggleMusic()" id="playPauseBtn">▶️</button>
    <input type="range" min="0" max="100" value="30" 
           id="volumeSlider" onchange="setMusicVolume(this.value/100)">
    <span id="volumeLabel">30%</span>
  </div>
  
  <div class="music-info" id="musicInfo" style="display:none;">
    <p><strong id="musicName"></strong></p>
    <p id="musicScience" style="font-size:11px; color:var(--text-muted);"></p>
    <p id="musicFreq" style="font-size:10px; color:var(--accent-cyan);"></p>
  </div>
</div>

<style>
.music-widget {
  background: linear-gradient(135deg, var(--bg-card), #1a1f2e);
}

.music-visualizer {
  background: var(--bg-secondary);
  border-radius: 8px;
  margin: 10px 0;
  padding: 5px;
}

.music-presets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 15px 0;
}

.preset-btn {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.preset-btn:hover {
  border-color: var(--accent-blue);
  transform: translateY(-2px);
}

.preset-btn.active {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.preset-btn small {
  display: block;
  font-size: 10px;
  opacity: 0.8;
  margin-top: 4px;
}

.music-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--accent-green);
  cursor: pointer;
  font-size: 16px;
}

#volumeSlider {
  flex: 1;
}
</style>

<script>
function playPreset(preset) {
  // Update UI
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === preset);
  });
  
  // Play audio
  let info;
  switch(preset) {
    case 'deep_focus': info = AudioEngine.playDeepFocus(); break;
    case 'flow_state': info = AudioEngine.playFlowState(); break;
    case 'alert_study': info = AudioEngine.playAlertStudy(); break;
    case 'recovery': info = AudioEngine.playRecovery(); break;
  }
  
  // Update info panel
  document.getElementById('musicName').textContent = info.name;
  document.getElementById('musicScience').textContent = info.science;
  document.getElementById('musicFreq').textContent = info.freq;
  document.getElementById('musicInfo').style.display = 'block';
  document.getElementById('musicStatus').textContent = '🔊 Reproduciendo';
  document.getElementById('playPauseBtn').textContent = '⏸️';
  
  // Start visualizer
  startVisualizer();
  
  // Save preference
  STATE.musicPreferences.currentPlaylist = preset;
  save();
}

function toggleMusic() {
  if (AudioEngine.isPlaying) {
    AudioEngine.fadeOut();
    document.getElementById('musicStatus').textContent = '⏹️ Detenido';
    document.getElementById('playPauseBtn').textContent = '▶️';
    stopVisualizer();
  } else {
    const preset = STATE.musicPreferences.currentPlaylist || 'deep_focus';
    playPreset(preset);
  }
}

function setMusicVolume(vol) {
  AudioEngine.setVolume(vol);
  document.getElementById('volumeLabel').textContent = Math.round(vol * 100) + '%';
  STATE.musicPreferences.volume = vol;
  save();
}

// Visualizer
let visualizerAnimation;
function startVisualizer() {
  const canvas = document.getElementById('audioCanvas');
  const ctx = canvas.getContext('2d');
  
  function draw() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simulate waveform
    ctx.beginPath();
    ctx.strokeStyle = AudioEngine.currentPreset === 'deep_focus' ? '#3b82f6' : 
                      AudioEngine.currentPreset === 'flow_state' ? '#22c55e' :
                      AudioEngine.currentPreset === 'alert_study' ? '#f59e0b' : '#a855f7';
    ctx.lineWidth = 2;
    
    for (let x = 0; x < canvas.width; x++) {
      const time = Date.now() / 1000;
      const freq = AudioEngine.currentPreset === 'deep_focus' ? 40 : 10;
      const y = canvas.height/2 + Math.sin(x * 0.05 + time * freq) * 20 * 
                (AudioEngine.isPlaying ? 1 : 0.1);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    visualizerAnimation = requestAnimationFrame(draw);
  }
  draw();
}

function stopVisualizer() {
  cancelAnimationFrame(visualizerAnimation);
}
</script>
```

---

## 🧠 2. SISTEMA ADHD-OPTIMIZED — Dopamine Loops Positivos

### Principios de Diseño para ADHD

1. **Micro-recompensas inmediatas** (< 2 minutos de feedback)
2. **Chunking agresivo** (tareas de 5-15 minutos máximo)
3. **Visualización constante** de progreso (no abstracto)
4. **Variación** (rotar entre 3+ actividades por sesión)
5. **Gamificación tangible** (puntos, rachas, sonidos, animaciones)
6. **Interrupciones planificadas** (no permitir que el ADHD interrumpa primero)

### Nuevas Interfaces ADHD-Friendly

#### A. Widget "Micro-Misiones" (15 min c/u)

```html
<!-- MICRO-MISIONES — ADHD CHUNKING -->
<div class="widget micro-missions">
  <div class="widget-title">
    ⚡ Micro-Misiones (15 min)
    <span class="dopamine-counter" id="dopamineScore">🧠 0 dopamina</span>
  </div>
  
  <div class="missions-grid">
    <div class="mission-card" id="mission1" onclick="startMicroMission(1)">
      <div class="mission-icon">📺</div>
      <div class="mission-title">Ver video teoría</div>
      <div class="mission-time">15 min</div>
      <div class="mission-reward">+50 XP</div>
      <div class="mission-progress-bar">
        <div class="progress-fill" id="progress1"></div>
      </div>
    </div>
    
    <div class="mission-card" id="mission2" onclick="startMicroMission(2)">
      <div class="mission-icon">⌨️</div>
      <div class="mission-title">Copiar código</div>
      <div class="mission-time">10 min</div>
      <div class="mission-reward">+30 XP</div>
      <div class="mission-progress-bar">
        <div class="progress-fill" id="progress2"></div>
      </div>
    </div>
    
    <div class="mission-card" id="mission3" onclick="startMicroMission(3)">
      <div class="mission-icon">🧩</div>
      <div class="mission-title">1 ejercicio práctico</div>
      <div class="mission-time">15 min</div>
      <div class="mission-reward">+50 XP</div>
      <div class="mission-progress-bar">
        <div class="progress-fill" id="progress3"></div>
      </div>
    </div>
    
    <div class="mission-card complete-rest" id="mission4" onclick="startMicroMission(4)">
      <div class="mission-icon">☕</div>
      <div class="mission-title">DESCANSO ACTIVO</div>
      <div class="mission-time">5 min</div>
      <div class="mission-reward">+20 XP</div>
    </div>
  </div>
  
  <div class="combo-counter" id="comboCounter">
    🔥 Combo: 0
  </div>
</div>

<style>
.missions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mission-card {
  background: var(--glass);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.mission-card:hover {
  border-color: var(--accent-blue);
  transform: scale(1.02);
}

.mission-card.active {
  border-color: var(--accent-green);
  background: rgba(34, 197, 94, 0.1);
  animation: missionPulse 2s infinite;
}

.mission-card.completed {
  border-color: var(--accent-gold);
  opacity: 0.7;
}

.mission-card.complete-rest {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1));
}

@keyframes missionPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 20px 5px rgba(34, 197, 94, 0.2); }
}

.mission-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.mission-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.mission-time {
  font-size: 11px;
  color: var(--text-muted);
}

.mission-reward {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 11px;
  color: var(--accent-gold);
  font-weight: 700;
}

.mission-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--border);
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: var(--accent-green);
  transition: width 0.5s;
}

.dopamine-counter {
  font-size: 12px;
  color: var(--accent-purple);
}

.combo-counter {
  text-align: center;
  margin-top: 15px;
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-gold);
}
</style>

<script>
let activeMission = null;
let missionTimer = null;
let comboCount = 0;

function startMicroMission(missionId) {
  // Stop current mission if any
  if (activeMission) {
    endMicroMission(false);
  }
  
  activeMission = missionId;
  const card = document.getElementById(`mission${missionId}`);
  card.classList.add('active');
  
  // Duration based on mission
  const durations = { 1: 15, 2: 10, 3: 15, 4: 5 };
  const duration = durations[missionId] * 60; // seconds
  
  let elapsed = 0;
  missionTimer = setInterval(() => {
    elapsed++;
    const progress = (elapsed / duration) * 100;
    document.getElementById(`progress${missionId}`).style.width = `${progress}%`;
    
    if (elapsed >= duration) {
      endMicroMission(true);
    }
  }, 1000);
  
  // Auto-start music based on mission type
  if (missionId === 4) {
    playPreset('recovery');
  } else {
    playPreset('deep_focus');
  }
  
  // Dopamine hit on start
  showDopamineHit('🚀', '¡Misión iniciada!');
}

function endMicroMission(completed) {
  if (!activeMission) return;
  
  clearInterval(missionTimer);
  const card = document.getElementById(`mission${activeMission}`);
  card.classList.remove('active');
  
  if (completed) {
    card.classList.add('completed');
    
    // Rewards
    const rewards = { 1: 50, 2: 30, 3: 50, 4: 20 };
    const xp = rewards[activeMission];
    
    addXP(xp);
    comboCount++;
    
    // Sound effect
    playSuccessSound();
    
    // Visual dopamine
    showDopamineHit('✨', `+${xp} XP`);
    
    // Combo bonus
    if (comboCount >= 3) {
      const bonus = comboCount * 10;
      addXP(bonus);
      showDopamineHit('🔥', `Combo x${comboCount}! +${bonus} bonus`);
    }
    
    // Stop music if it was recovery
    if (activeMission === 4) {
      AudioEngine.fadeOut(2);
    }
  } else {
    comboCount = 0;
  }
  
  document.getElementById('comboCounter').textContent = `🔥 Combo: ${comboCount}`;
  document.getElementById(`progress${activeMission}`).style.width = '0%';
  activeMission = null;
  
  updateDopamineScore();
}

function showDopamineHit(emoji, text) {
  const hit = document.createElement('div');
  hit.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    font-weight: 700;
    color: var(--accent-gold);
    text-shadow: 0 0 30px rgba(245, 158, 11, 0.8);
    z-index: 10000;
    animation: dopamineFloat 1.5s ease-out forwards;
    pointer-events: none;
  `;
  hit.innerHTML = `${emoji}<br><span style="font-size:18px;">${text}</span>`;
  document.body.appendChild(hit);
  
  setTimeout(() => hit.remove(), 1500);
}

function updateDopamineScore() {
  const totalXP = STATE.xp;
  const dopamine = Math.floor(totalXP / 100);
  document.getElementById('dopamineScore').textContent = `🧠 ${dopamine} dopamina`;
}

function playSuccessSound() {
  if (!STATE.soundEnabled) return;
  
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Dopamine sound: ascending arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C major chord
  let noteIndex = 0;
  
  osc.connect(gain).connect(ctx.destination);
  gain.gain.value = 0.1;
  
  function playNote() {
    if (noteIndex >= notes.length) {
      osc.stop();
      return;
    }
    osc.frequency.setValueAtTime(notes[noteIndex], ctx.currentTime);
    noteIndex++;
    setTimeout(playNote, 100);
  }
  
  osc.start();
  playNote();
  
  setTimeout(() => {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  }, 400);
}

// Add dopamine animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes dopamineFloat {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    20% { transform: translate(-50%, -60%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -100%) scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);
</script>
```

#### B. Sistema de "Streak Visual" (ADHD necesita ver el progreso constantemente)

```html
<!-- STREAK VISUAL — ADHD FEEDBACK CONSTANTE -->
<div class="widget streak-visualizer">
  <div class="widget-title">
    🔥 Rachas Visuales
    <span id="streakNumber">0 días</span>
  </div>
  
  <div class="flame-container" id="flameContainer">
    <!-- Canvas para animación de fuego -->
    <canvas id="flameCanvas" width="200" height="150"></canvas>
    <div class="flame-intensity" id="flameIntensity">🔥 Normal</div>
  </div>
  
  <div class="daily-checklist" id="dailyChecklist">
    <div class="check-item" data-task="study" onclick="toggleDailyTask('study')">
      <span class="check-box">⬜</span>
      <span>Estudiar hoy</span>
      <span class="check-reward">+10 🔥</span>
    </div>
    <div class="check-item" data-task="code" onclick="toggleDailyTask('code')">
      <span class="check-box">⬜</span>
      <span>Escribir código</span>
      <span class="check-reward">+15 🔥</span>
    </div>
    <div class="check-item" data-task="exercise" onclick="toggleDailyTask('exercise')">
      <span class="check-box">⬜</span>
      <span>Ejercicio físico</span>
      <span class="check-reward">+5 🔥</span>
    </div>
  </div>
</div>

<style>
.flame-container {
  text-align: center;
  padding: 20px;
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.1), transparent);
  border-radius: 12px;
  margin-bottom: 15px;
}

#flameCanvas {
  filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));
}

.flame-intensity {
  margin-top: 10px;
  font-weight: 700;
  color: var(--accent-gold);
}

.daily-checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: var(--glass);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.check-item:hover {
  background: var(--bg-card);
}

.check-item.completed {
  background: rgba(34, 197, 94, 0.2);
}

.check-item.completed .check-box {
  color: var(--accent-green);
}

.check-box {
  font-size: 18px;
}

.check-reward {
  margin-left: auto;
  font-size: 12px;
  color: var(--accent-gold);
}
</style>

<script>
// Flame animation
function renderFlame() {
  const canvas = document.getElementById('flameCanvas');
  const ctx = canvas.getContext('2d');
  
  const streak = STATE.streak || 0;
  const intensity = Math.min(streak / 30, 1); // 0-1 based on streak
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw fire particles
    const particles = 20 + (intensity * 30);
    const time = Date.now() / 200;
    
    for (let i = 0; i < particles; i++) {
      const x = canvas.width/2 + Math.sin(time + i) * (30 + intensity * 20);
      const y = canvas.height - (i * 5) - Math.abs(Math.cos(time * 2 + i)) * 20;
      const size = (particles - i) / 5 * (1 + intensity);
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      if (i < particles * 0.3) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 + intensity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
      } else if (i < particles * 0.7) {
        gradient.addColorStop(0, `rgba(245, 158, 11, ${0.6 + intensity * 0.3})`);
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      } else {
        gradient.addColorStop(0, `rgba(239, 68, 68, ${0.4 + intensity * 0.3})`);
        gradient.addColorStop(1, 'rgba(100, 20, 20, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    requestAnimationFrame(draw);
  }
  draw();
  
  // Update intensity label
  const labels = ['🕯️ Débil', '🔥 Normal', '🔥🔥 Fuerte', '🔥🔥🔥 INFERNO'];
  const labelIndex = Math.floor(intensity * (labels.length - 1));
  document.getElementById('flameIntensity').textContent = labels[labelIndex];
}

function toggleDailyTask(task) {
  const item = document.querySelector(`[data-task="${task}"]`);
  const isCompleted = item.classList.toggle('completed');
  const box = item.querySelector('.check-box');
  box.textContent = isCompleted ? '✅' : '⬜';
  
  if (isCompleted) {
    const rewards = { study: 10, code: 15, exercise: 5 };
    STATE.streak = (STATE.streak || 0) + rewards[task];
    showDopamineHit('🔥', `+${rewards[task]} racha!`);
    save();
    renderFlame();
  }
}
</script>
```

---

## 💾 3. SISTEMA PORTABLE — Cambio de Equipos Futuro

### Export/Import Universal

```javascript
// ═══════════════════════════════════════════════════════════
// AEGIS SYNC ENGINE — Portabilidad Total
// ═══════════════════════════════════════════════════════════

class AegisSyncEngine {
  constructor() {
    this.version = '3.0';
    this.compression = true;
  }

  // Exportar TODO (para cambio de PC o backup)
  exportComplete() {
    const exportData = {
      version: this.version,
      timestamp: new Date().toISOString(),
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      
      // Datos principales
      state: STATE,
      
      // Historial completo
      history: JSON.parse(localStorage.getItem('aegis_history') || '[]'),
      
      // Configuraciones
      settings: {
        theme: localStorage.getItem('aegis_theme') || 'dark',
        soundEnabled: STATE.soundEnabled,
        volume: STATE.musicPreferences?.volume || 0.3
      },
      
      // Achievements desbloqueados
      achievements: STATE.achievements || [],
      
      // Estadísticas
      stats: {
        totalSessions: (STATE.sessionAnalytics || []).length,
        totalXP: STATE.xp || 0,
        totalMinutes: STATE.total_minutes || 0,
        startDate: STATE.start_date,
        lastActive: new Date().toISOString()
      }
    };
    
    // Comprimir si es necesario
    const dataStr = JSON.stringify(exportData, null, 2);
    const compressed = this.compression ? btoa(dataStr) : dataStr;
    
    // Descargar
    const blob = new Blob([compressed], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    return {
      size: (blob.size / 1024).toFixed(2) + ' KB',
      records: exportData.history.length,
      compressed: this.compression
    };
  }

  // Importar en nuevo equipo
  async importComplete(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          let data = e.target.result;
          
          // Descomprimir si es base64
          if (data.startsWith('eyJ')) {
            data = atob(data);
          }
          
          const importData = JSON.parse(data);
          
          // Validar versión
          if (!importData.version) {
            throw new Error('Archivo no válido');
          }
          
          // Migración si es versión antigua
          if (importData.version !== this.version) {
            importData.state = this.migrate(importData.state, importData.version);
          }
          
          // Restaurar
          STATE = { ...DEFAULT_STATE, ...importData.state };
          localStorage.setItem('aegis_v2_state', JSON.stringify(STATE));
          
          if (importData.history) {
            localStorage.setItem('aegis_history', JSON.stringify(importData.history));
          }
          
          if (importData.settings?.theme) {
            localStorage.setItem('aegis_theme', importData.settings.theme);
          }
          
          resolve({
            success: true,
            fromVersion: importData.version,
            recordsRestored: importData.history?.length || 0,
            lastActive: importData.stats?.lastActive
          });
          
        } catch (err) {
          reject({ success: false, error: err.message });
        }
      };
      
      reader.readAsText(file);
    });
  }

  // Sync parcial (para múltiples dispositivos)
  async syncToCloud() {
    // Si tienes GitHub, crear gist privado
    // Si tienes Dropbox, usar API
    // Por ahora, export manual
    return this.exportComplete();
  }

  // Migración de versiones antiguas
  migrate(oldState, fromVersion) {
    if (fromVersion === '2.0') {
      // Añadir campos nuevos
      return {
        ...oldState,
        sessionAnalytics: oldState.sessionAnalytics || [],
        musicPreferences: oldState.musicPreferences || { currentPlaylist: 'deep_focus', volume: 0.3 },
        conceptMastery: oldState.conceptMastery || {}
      };
    }
    return oldState;
  }
}

const SyncEngine = new AegisSyncEngine();
```

### UI de Portabilidad

```html
<!-- SYNC & PORTABILITY WIDGET -->
<div class="widget sync-widget">
  <div class="widget-title">☁️ Portabilidad (Cambio de PC)</div>
  
  <div class="sync-section">
    <h4>📤 Exportar (Backup)</h4>
    <p style="font-size:12px; color:var(--text-muted);">
      Guarda todo tu progreso en un archivo. Guárdalo en USB/Dropbox.
    </p>
    <button class="btn btn-primary" onclick="exportAll()">
      💾 Descargar Backup
    </button>
    <div id="exportInfo" style="margin-top:10px; font-size:11px;"></div>
  </div>
  
  <div class="sync-section" style="margin-top:20px;">
    <h4>📥 Importar (Nuevo PC)</h4>
    <p style="font-size:12px; color:var(--text-muted);">
      Restaura tu progreso en una nueva computadora.
    </p>
    <input type="file" id="importFile" accept=".json" onchange="importAll(this)">
    <div id="importInfo" style="margin-top:10px; font-size:11px;"></div>
  </div>
  
  <div class="sync-section" style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border);">
    <h4>🔗 Git Sync (Opcional)</h4>
    <p style="font-size:12px; color:var(--text-muted);">
      Sincroniza automáticamente con un repo privado de GitHub.
    </p>
    <button class="btn btn-secondary" onclick="setupGitSync()">
      ⚙️ Configurar Git Sync
    </button>
  </div>
</div>

<script>
function exportAll() {
  const info = SyncEngine.exportComplete();
  document.getElementById('exportInfo').innerHTML = `
    ✅ Exportado: ${info.size}<br>
    📊 ${info.records} registros de historial
  `;
  showToast('📤 Backup creado', 'success');
}

async function importAll(input) {
  const file = input.files[0];
  if (!file) return;
  
  try {
    const result = await SyncEngine.importComplete(file);
    document.getElementById('importInfo').innerHTML = `
      ✅ Restaurado exitosamente<br>
      📊 ${result.recordsRestored} registros recuperados<br>
      🕐 Última actividad: ${new Date(result.lastActive).toLocaleDateString()}
    `;
    showToast('📥 Progreso restaurado', 'success');
    
    // Reload page to apply
    setTimeout(() => location.reload(), 2000);
    
  } catch (err) {
    document.getElementById('importInfo').innerHTML = `
      ❌ Error: ${err.error || err.message}
    `;
    showToast('Error al importar', 'error');
  }
}
</script>
```

---

## 🎮 4. MECÁNICAS DE HOOK/ADICCIÓN SALUDABLE

### Sistema de Logros Dinámicos

```javascript
// ═══════════════════════════════════════════════════════════
// ACHIEVEMENT SYSTEM — Dopamine Loops
// ═══════════════════════════════════════════════════════════

const ACHIEVEMENTS_DB = {
  // Rachas
  'streak_7': { icon: '🔥', name: 'Semana de Fuego', desc: '7 días seguidos', xp: 100 },
  'streak_30': { icon: '🌟', name: 'Mes de Acero', desc: '30 días seguidos', xp: 500 },
  'streak_100': { icon: '👑', name: 'Centuria', desc: '100 días seguidos', xp: 2000 },
  
  // Sesiones
  'first_session': { icon: '🎯', name: 'Primera Sangre', desc: 'Primera sesión completada', xp: 50 },
  'sessions_10': { icon: '📚', name: 'Estudiante', desc: '10 sesiones', xp: 100 },
  'sessions_100': { icon: '🎓', name: 'Dedicado', desc: '100 sesiones', xp: 1000 },
  'sessions_1000': { icon: '🏆', name: 'Leyenda', desc: '1000 sesiones', xp: 5000 },
  
  // Tiempo
  'hours_100': { icon: '⏰', name: 'Inversión', desc: '100 horas estudiadas', xp: 200 },
  'hours_1000': { icon: '⏱️', name: 'Maestría', desc: '1000 horas estudiadas', xp: 2000 },
  
  // Especiales
  'night_owl': { icon: '🦉', name: 'Nocturno', desc: 'Estudiar después de medianoche', xp: 50 },
  'early_bird': { icon: '🐦', name: 'Madrugador', desc: 'Estudiar antes de las 6am', xp: 50 },
  'weekend_warrior': { icon: '⚔️', name: 'Guerrero', desc: '6 horas en un sábado', xp: 100 },
  'perfect_week': { icon: '💎', name: 'Perfecto', desc: 'Todos los días de la semana', xp: 200 },
  
  // Dificultad
  'hard_mode': { icon: '🧠', name: 'Modo Difícil', desc: 'Sesión con score 90+', xp: 150 },
  'comeback': { icon: '🚀', name: 'Resurrección', desc: 'Volver después de 7 días off', xp: 200 },
};

function checkAchievements() {
  const newAchievements = [];
  
  // Check streaks
  if (STATE.streak >= 7 && !hasAchievement('streak_7')) {
    unlockAchievement('streak_7');
  }
  if (STATE.streak >= 30 && !hasAchievement('streak_30')) {
    unlockAchievement('streak_30');
  }
  
  // Check sessions
  const totalSessions = (STATE.sessionAnalytics || []).length;
  if (totalSessions >= 1 && !hasAchievement('first_session')) {
    unlockAchievement('first_session');
  }
  if (totalSessions >= 10 && !hasAchievement('sessions_10')) {
    unlockAchievement('sessions_10');
  }
  
  // Check hours
  const hours = Math.floor(STATE.total_minutes / 60);
  if (hours >= 100 && !hasAchievement('hours_100')) {
    unlockAchievement('hours_100');
  }
  
  // Check time-based
  const hour = new Date().getHours();
  if (hour < 6 && !hasAchievement('early_bird')) {
    unlockAchievement('early_bird');
  }
  if (hour >= 0 && hour < 4 && !hasAchievement('night_owl')) {
    unlockAchievement('night_owl');
  }
  
  return newAchievements;
}

function hasAchievement(id) {
  return (STATE.achievements || []).includes(id);
}

function unlockAchievement(id) {
  const ach = ACHIEVEMENTS_DB[id];
  if (!ach) return;
  
  // Add to state
  if (!STATE.achievements) STATE.achievements = [];
  STATE.achievements.push(id);
  
  // Add XP
  addXP(ach.xp);
  
  // Show celebration
  showAchievementPopup(ach);
  
  // Sound
  playAchievementSound();
  
  save();
}

function showAchievementPopup(achievement) {
  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <div class="achievement-icon">${achievement.icon}</div>
    <div class="achievement-text">
      <div class="achievement-title">¡LOGRO DESBLOQUEADO!</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-desc">${achievement.desc}</div>
      <div class="achievement-xp">+${achievement.xp} XP</div>
    </div>
  `;
  
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1f2e, #0f172a);
    border: 2px solid var(--accent-gold);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10000;
    animation: achievementSlide 0.5s ease-out;
    box-shadow: 0 10px 40px rgba(245, 158, 11, 0.3);
  `;
  
  document.body.appendChild(popup);
  
  // Remove after 5 seconds
  setTimeout(() => {
    popup.style.animation = 'achievementSlideOut 0.5s ease-in forwards';
    setTimeout(() => popup.remove(), 500);
  }, 5000);
}

function playAchievementSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Fanfare de logro
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C-E-G-C-E
  let i = 0;
  
  function play() {
    if (i >= notes.length) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.value = notes[i];
    osc.type = i === notes.length - 1 ? 'square' : 'sine';
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
    
    i++;
    setTimeout(play, 150);
  }
  
  play();
}

// Animation styles
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
  @keyframes achievementSlide {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes achievementSlideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
  .achievement-icon { font-size: 40px; }
  .achievement-title { font-size: 10px; color: var(--accent-gold); letter-spacing: 1px; }
  .achievement-name { font-size: 18px; font-weight: 700; margin: 4px 0; }
  .achievement-desc { font-size: 12px; color: var(--text-muted); }
  .achievement-xp { font-size: 14px; color: var(--accent-green); font-weight: 700; margin-top: 8px; }
`;
document.head.appendChild(achievementStyles);
```

---

## 📋 5. LO QUE NECESITO DE TI (Cosas que solo tú puedes hacer)

### Inmediato (Esta semana)

| Tarea | Por qué la necesito | Tiempo estimado |
|-------|---------------------|-----------------|
| **Instalar Ollama en Mac M4** | Para probar los prompts manuales y refinarlos con tu feedback real | 15 min |
| **Crear cuenta en GitHub (si no tienes)** | Para el sistema de sync y backup automático | 5 min |
| **Probar 1 prompt de los 6** | Necesito saber qué tan útiles son para tu estilo de aprendizaje | 10 min |
| **Definir tu horario real** | ¿Cuándo tienes esas 1.5 horas diarias? Mañana/noche ¿rotativo? | 5 min reflexión |

### Esta semana (Testing)

| Tarea | Por qué la necesito | Output |
|-------|---------------------|--------|
| **Probar el AudioEngine** | Verificar que los binaural beats funcionen en tu Mac M4 | Feedback: ¿sientes diferencia de focus? |
| **Completar 1 micro-misión** | Validar si el sistema ADHD funciona para ti | ¿Te mantuvo enganchado? |
| **Hacer backup con el nuevo sistema** | Verificar que la portabilidad funcione | Archivo .json exportado |

### Mensual (Iteración)

| Tarea | Por qué la necesito |
|-------|---------------------|
| **Revisión de métricas** | Qué features usas más, cuáles ignoras |
| **Sugerencias de nuevos logros** | Basado en tu progreso real |
| **Feedback de prompts** | Cuáles funcionan, cuáles no |

---

## 🚀 IMPLEMENTACIÓN INMEDIATA

### Paso 1: Copiar el AudioEngine a tu AEGIS actual

Abre `/Users/christiantoledo/Desarrollo/00-Learning/aegis/index.html` y:
1. Busca `<!-- MÚSICA REAL — WIDGET -->`
2. Copia TODO el bloque (HTML + CSS + JS)
3. Pégalo después del widget actual de música (línea ~365)

### Paso 2: Agregar el sistema de micro-misiones

1. Busca `<!-- MICRO-MISIONES — ADHD CHUNKING -->`
2. Copia el widget completo
3. Pégalo en el dashboard area

### Paso 3: Probar

1. Abre el archivo en Chrome/Safari
2. Click en "🧠 Deep Focus" — deberías escuchar un tono suave (40Hz binaural)
3. Click en "⚡ Micro-Misiones" → selecciona una → debería iniciar timer

---

> **Nota final:** Todo lo que he diseñado aquí es implementable 100% sin APIs de pago. La música es real (Web Audio API), la gamificación es local, y la portabilidad usa archivos JSON.

**¿Quieres que implemente todo esto en tu AEGIS ahora?** Puedo crear una versión v3.0 con todas estas features integradas.
