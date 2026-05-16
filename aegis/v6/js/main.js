/**
 * main.js — Entry Point de AEGIS v6.0
 * 
 * Inicializa todos los módulos y configura la aplicación.
 */

import stateManager from './modules/StateManager.js';
import sourceLibrary from './modules/SourceLibrary.js';
import promptEngine from './modules/PromptEngine.js';
import SessionTracker from './modules/SessionTracker.js';
import ProofOfWork from './modules/ProofOfWork.js';
import BackupManager from './modules/BackupManager.js';
import { escapeHtml } from './utils/sanitizers.js';

// Inicializar módulos
const sessionTracker = new SessionTracker(stateManager);
const proofOfWork = new ProofOfWork(stateManager);
const backupManager = new BackupManager(stateManager);

// Exponer para debugging (solo en desarrollo)
if (location.hostname === 'localhost' || location.protocol === 'file:') {
  window.AEGIS = {
    stateManager,
    sourceLibrary,
    promptEngine,
    sessionTracker,
    proofOfWork,
    backupManager
  };
}

// Estado global de la UI
let currentState = {};
let currentSession = null;

/**
 * Inicialización de la aplicación
 */
async function initApp() {
  console.log('🛡️ AEGIS v6.0 — Inicializando...');

  try {
    // Inicializar StateManager (IndexedDB)
    await stateManager.init();
    console.log('✅ StateManager inicializado');

    // Cargar estado completo
    currentState = await stateManager.getFullState();
    console.log('✅ Estado cargado:', currentState);

    // Renderizar UI inicial
    renderDashboard();
    renderSourceGrid();
    renderStats();

    // Verificar backup
    const backupReminder = await backupManager.shouldRemindBackup();
    if (backupReminder.shouldRemind) {
      showBackupReminder(backupReminder.daysSince);
    }

    console.log('🚀 AEGIS v6.0 listo');

  } catch (error) {
    console.error('❌ Error inicializando AEGIS:', error);
    showError('Error al inicializar: ' + error.message);
  }
}

/**
 * Renderiza el dashboard principal
 */
function renderDashboard() {
  const xp = currentState.xp || 0;
  const level = currentState.level || 1;
  const streak = currentState.streak || 0;
  const completed = (currentState.completedSources || []).length;

  // Actualizar elementos del DOM
  updateElement('xp-display', `${xp} XP`);
  updateElement('level-display', `Nivel ${level}`);
  updateElement('streak-display', `🔥 ${streak} días`);
  updateElement('completed-display', `${completed}/178`);

  // Sugerir próxima fuente
  const suggestion = sourceLibrary.suggestNextSource(
    currentState.completedSources || [],
    currentState.sourceProgress || {}
  );

  if (suggestion) {
    const suggestionEl = document.getElementById('next-source-suggestion');
    if (suggestionEl) {
      suggestionEl.innerHTML = `
        <div class="suggestion-card">
          <small>${suggestion.reason}</small>
          <h4>${escapeHtml(suggestion.source.name)}</h4>
          <button onclick="startStudySession(${suggestion.source.id})">
            Comenzar Estudio
          </button>
        </div>
      `;
    }
  }
}

/**
 * Renderiza el grid de fuentes
 */
function renderSourceGrid(filter = 'all') {
  const grid = document.getElementById('source-grid');
  if (!grid) return;

  let sources = sourceLibrary.getAll();

  // Aplicar filtro
  if (filter !== 'all') {
    sources = sources.filter(s => s.category === filter);
  }

  // Ordenar: prioridad crítica primero, luego no completadas
  const completedSet = new Set(currentState.completedSources || []);
  sources.sort((a, b) => {
    const aCompleted = completedSet.has(a.id);
    const bCompleted = completedSet.has(b.id);
    
    if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
    
    if (a.priority === 'critical' && b.priority !== 'critical') return -1;
    if (b.priority === 'critical' && a.priority !== 'critical') return 1;
    
    return 0;
  });

  // Renderizar
  grid.innerHTML = sources.map(source => {
    const isCompleted = completedSet.has(source.id);
    const progress = currentState.sourceProgress?.[source.id]?.percentage || 0;
    
    return `
      <div class="source-card ${isCompleted ? 'completed' : ''} ${source.priority === 'critical' ? 'critical' : ''}"
           onclick="selectSource(${source.id})">
        <div class="source-icon">${source.icon}</div>
        <div class="source-name">${escapeHtml(source.name)}</div>
        <div class="source-category">${source.category}</div>
        ${progress > 0 && !isCompleted ? `
          <div class="source-progress-bar">
            <div class="source-progress-fill" style="width: ${progress}%"></div>
          </div>
        ` : ''}
        ${isCompleted ? '<div class="source-badge">✓</div>' : ''}
        ${source.priority === 'critical' && !isCompleted ? '<div class="source-badge critical">!</div>' : ''}
      </div>
    `;
  }).join('');
}

/**
 * Renderiza estadísticas
 */
async function renderStats() {
  const stats = await stateManager.getStats();
  
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-item">
        <span class="stat-value">${stats.totalStudyHours}h</span>
        <span class="stat-label">Estudiadas</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.totalSessions}</span>
        <span class="stat-label">Sesiones</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.completed}/${stats.totalSources}</span>
        <span class="stat-label">Completadas</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.lastBackup}</span>
        <span class="stat-label">Último Backup</span>
      </div>
    `;
  }
}

/**
 * Selecciona una fuente para estudiar
 */
async function selectSource(sourceId) {
  const source = sourceLibrary.getById(sourceId);
  if (!source) return;

  currentState.currentSourceId = sourceId;
  await stateManager.set('currentSourceId', sourceId);

  // Renderizar vista de estudio
  const studyView = document.getElementById('study-view');
  if (studyView) {
    studyView.innerHTML = `
      <div class="study-header">
        <h2>${source.icon} ${escapeHtml(source.name)}</h2>
        <span class="category-badge">${source.category}</span>
        ${source.priority === 'critical' ? '<span class="critical-badge">CRÍTICO</span>' : ''}
      </div>
      
      <div class="study-description">
        <p>${escapeHtml(source.desc)}</p>
      </div>
      
      <div class="study-tactical">
        <strong>Tactical:</strong> ${escapeHtml(source.tactical)}
      </div>
      
      <div class="study-actions">
        <button onclick="startStudySession(${sourceId})" class="btn-primary">
          ▶ Iniciar Sesión (25 min)
        </button>
        <button onclick="generatePrompt('socratic', ${sourceId})" class="btn-secondary">
          ❓ Prompt Socrático
        </button>
        <button onclick="generatePrompt('plan', ${sourceId})" class="btn-secondary">
          📋 Plan de Estudio
        </button>
        <button onclick="generatePrompt('notebooklm', ${sourceId})" class="btn-secondary">
          📓 NotebookLM
        </button>
      </div>
      
      <div id="prompt-output" class="prompt-output"></div>
    `;
    
    studyView.classList.remove('hidden');
  }
}

/**
 * Inicia una sesión de estudio
 */
async function startStudySession(sourceId) {
  const source = sourceLibrary.getById(sourceId);
  if (!source) return;

  // Pedir nivel de energía
  const energy = prompt('Nivel de energía (1-10):', '5');
  const energyNum = parseInt(energy) || 5;

  // Iniciar sesión
  currentSession = sessionTracker.startSession(sourceId, {
    energy: energyNum,
    pomodoroDuration: 25,
    notes: `Estudiando: ${source.name}`
  });

  // Configurar callbacks
  sessionTracker.onTick((stats) => {
    updateTimerDisplay(stats);
  });

  sessionTracker.onComplete((data) => {
    if (data.type === 'pomodoro') {
      showNotification('⏰ Pomodoro completado. Descanso de 5 min.');
    }
  });

  // Mostrar timer
  showTimerUI();

  // Verificar stop-loss periódicamente
  const stopLossInterval = setInterval(() => {
    const check = sessionTracker.shouldStopLoss();
    if (check.shouldStop) {
      clearInterval(stopLossInterval);
      showStopLossWarning(check);
    }
  }, 60000); // Verificar cada minuto
}

/**
 * Finaliza la sesión actual
 */
async function endCurrentSession() {
  if (!currentSession) return;

  const notes = prompt('Notas de la sesión (opcional):', '');
  const session = await sessionTracker.endSession(notes);

  hideTimerUI();
  
  // Mostrar resumen
  const minutes = Math.floor(session.duration / 60000);
  showNotification(`✅ Sesión completada: ${minutes} minutos, ${minutes} XP ganado`);

  // Pedir Proof of Work
  if (minutes >= 10) {
    const shouldSubmitProof = confirm('¿Quieres completar el Proof of Work para esta fuente?');
    if (shouldSubmitProof) {
      showProofOfWorkForm(session.sourceId);
    }
  }

  // Recargar dashboard
  await renderDashboard();
  await renderStats();
}

/**
 * Genera un prompt del tipo especificado
 */
function generatePrompt(type, sourceId) {
  const source = sourceLibrary.getById(sourceId);
  if (!source) return;

  const prompt = promptEngine.generate(type, { source });
  
  const output = document.getElementById('prompt-output');
  if (output) {
    output.innerHTML = `
      <div class="prompt-container">
        <div class="prompt-header">
          <h4>${type.toUpperCase()} Prompt</h4>
          <button onclick="copyPrompt()" class="btn-small">📋 Copiar</button>
        </div>
        <pre class="prompt-content" id="prompt-text">${escapeHtml(prompt.system)}\n\n---USER---\n${escapeHtml(prompt.user)}</pre>
      </div>
    `;
  }
}

/**
 * Muestra formulario de Proof of Work
 */
function showProofOfWorkForm(sourceId) {
  const source = sourceLibrary.getById(sourceId);
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Proof of Work: ${escapeHtml(source.name)}</h3>
      <p>Demuestra que realmente entendiste la fuente:</p>
      
      <label>Explicación (mín. 150 caracteres):</label>
      <textarea id="proof-explanation" rows="4" placeholder="Explica con tus propias palabras qué aprendiste..."></textarea>
      
      <label>Pseudocódigo (mín. 5 líneas):</label>
      <textarea id="proof-pseudocode" rows="6" placeholder="Escribe pseudocódigo o pasos del algoritmo..."></textarea>
      
      <label>Conexión con otras áreas (mín. 50 caracteres):</label>
      <textarea id="proof-connection" rows="2" placeholder="¿Cómo se relaciona con lo que ya sabes?"></textarea>
      
      <div class="modal-actions">
        <button onclick="submitProof(${sourceId})" class="btn-primary">Enviar Proof</button>
        <button onclick="closeModal()" class="btn-secondary">Cancelar</button>
      </div>
      
      <div id="proof-feedback"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

/**
 * Envía un Proof of Work
 */
async function submitProof(sourceId) {
  const explanation = document.getElementById('proof-explanation').value;
  const pseudocode = document.getElementById('proof-pseudocode').value;
  const connection = document.getElementById('proof-connection').value;

  const result = await proofOfWork.submit(sourceId, {
    explanation,
    pseudocode,
    connection
  });

  const feedback = document.getElementById('proof-feedback');
  
  if (result.success) {
    feedback.innerHTML = `
      <div class="success">
        ✅ Proof enviado correctamente. 
        <button onclick="copyReviewPrompt()">Copiar prompt para revisión IA</button>
      </div>
    `;
    
    // Guardar el review prompt para copiar después
    window.currentReviewPrompt = result.reviewPrompt;
    
    setTimeout(() => {
      closeModal();
      renderDashboard();
    }, 2000);
  } else {
    feedback.innerHTML = `
      <div class="error">
        ❌ Errores encontrados:
        <ul>${result.errors.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>
        ${result.warnings.length ? `
          <p>Advertencias:</p>
          <ul>${result.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}</ul>
        ` : ''}
      </div>
    `;
  }
}

/**
 * Exporta backup
 */
async function exportBackup() {
  try {
    const result = await backupManager.exportToFile();
    showNotification(`✅ Backup exportado: ${result.filename} (${Math.round(result.size / 1024)} KB)`);
  } catch (error) {
    showError('Error exportando: ' + error.message);
  }
}

/**
 * Importa backup
 */
async function importBackup(file) {
  try {
    const data = await backupManager.readImportFile(file);
    const confirmImport = confirm(
      `¿Importar backup del ${new Date(data.exportedAt).toLocaleString()}?\n` +
      `Fuentes completadas: ${data.state?.completedSources?.length || 0}\n` +
      `Sesiones: ${data.sessions?.length || 0}`
    );
    
    if (confirmImport) {
      const result = await backupManager.importFromJSON(data, { merge: true });
      showNotification(`✅ Importado: ${result.sessionsAdded} sesiones agregadas`);
      
      // Recargar estado
      currentState = await stateManager.getFullState();
      renderDashboard();
      renderStats();
    }
  } catch (error) {
    showError('Error importando: ' + error.message);
  }
}

// ============ UI HELPERS ============

function updateElement(id, content) {
  const el = document.getElementById(id);
  if (el) el.textContent = content;
}

function showNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

function showError(message) {
  console.error(message);
  showNotification('❌ ' + message);
}

function showBackupReminder(daysSince) {
  const urgency = daysSince > 30 ? '⚠️ URGENTE' : 'ℹ️ Recordatorio';
  showNotification(`${urgency}: No has exportado backup en ${daysSince} días. Usa el botón Exportar.`);
}

function showTimerUI() {
  // Implementar UI de timer
  console.log('Timer iniciado');
}

function hideTimerUI() {
  console.log('Timer oculto');
}

function updateTimerDisplay(stats) {
  const timerEl = document.getElementById('timer-display');
  if (timerEl) {
    const minutes = Math.floor(stats.activeTime / 60);
    const seconds = stats.activeTime % 60;
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

function showStopLossWarning(check) {
  alert(`⏹️ STOP-LOSS: ${check.reason}\n\n${check.suggestion}`);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) modal.remove();
}

function copyPrompt() {
  const text = document.getElementById('prompt-text')?.textContent;
  if (text) {
    navigator.clipboard.writeText(text);
    showNotification('📋 Prompt copiado');
  }
}

function copyReviewPrompt() {
  if (window.currentReviewPrompt) {
    const text = window.currentReviewPrompt.system + '\n\n' + window.currentReviewPrompt.user;
    navigator.clipboard.writeText(text);
    showNotification('📋 Prompt de revisión copiado');
  }
}

// ============ EVENT LISTENERS ============

document.addEventListener('DOMContentLoaded', initApp);

// Exponer funciones globales para onclick handlers
window.selectSource = selectSource;
window.startStudySession = startStudySession;
window.endCurrentSession = endCurrentSession;
window.generatePrompt = generatePrompt;
window.submitProof = submitProof;
window.showProofOfWorkForm = showProofOfWorkForm;
window.exportBackup = exportBackup;
window.importBackup = importBackup;
window.closeModal = closeModal;
window.copyPrompt = copyPrompt;
window.copyReviewPrompt = copyReviewPrompt;

// Manejar import de archivo
document.addEventListener('change', (e) => {
  if (e.target.id === 'import-file' && e.target.files.length > 0) {
    importBackup(e.target.files[0]);
  }
});
