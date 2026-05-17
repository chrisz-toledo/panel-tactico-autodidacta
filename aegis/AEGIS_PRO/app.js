/**
 * AEGIS PRO — Aplicación Principal
 * 
 * Lógica de la aplicación: state management, UI rendering, timer, persistence.
 * Todo en localStorage. Sin dependencias externas. Sin features rotas.
 */

// ============================================================
// STATE MANAGEMENT
// ============================================================

const STATE_DEFAULT = {
  version: "pro-1.0",
  xp: 0,
  racha: 0,
  ultimoDia: null,
  completadas: [],
  fechaInicio: new Date().toISOString(),
  notas: {} // { fuenteId: "nota personal" }
};

let STATE = cargarEstado();

function cargarEstado() {
  try {
    const saved = localStorage.getItem('aegis_pro_state');
    if (!saved) return { ...STATE_DEFAULT };
    const parsed = JSON.parse(saved);
    return { ...STATE_DEFAULT, ...parsed };
  } catch (e) {
    console.error('Error cargando estado:', e);
    return { ...STATE_DEFAULT };
  }
}

function guardarEstado() {
  try {
    localStorage.setItem('aegis_pro_state', JSON.stringify(STATE));
  } catch (e) {
    console.error('Error guardando estado:', e);
    toast('⚠️ Error guardando progreso', 'error');
  }
}

// ============================================================
// UTILIDADES
// ============================================================

function toast(mensaje, tipo = 'success') {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  if (tipo === 'error') t.style.borderColor = 'var(--accent-red)';
  if (tipo === 'info') t.style.borderColor = 'var(--accent-blue)';
  t.textContent = mensaje;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function actualizarRacha() {
  const hoy = new Date().toDateString();
  if (STATE.ultimoDia === hoy) return; // Ya activado hoy
  
  if (STATE.ultimoDia) {
    const ayer = new Date(Date.now() - 86400000).toDateString();
    if (STATE.ultimoDia === ayer) {
      STATE.racha++;
    } else {
      // Racha rota
      STATE.racha = 1;
    }
  } else {
    STATE.racha = 1;
  }
  STATE.ultimoDia = hoy;
  guardarEstado();
}

function getFaseActual() {
  // Determinar fase actual basada en completadas
  const completadas = STATE.completadas.length;
  if (completadas < 10) return 1;
  if (completadas < 22) return 2;
  if (completadas < 28) return 3;
  if (completadas < 37) return 4;
  return 5;
}

function getProgresoFase(numFase) {
  const fuentesFase = CURRICULO.filter(f => f.fase === numFase);
  const completadasFase = fuentesFase.filter(f => STATE.completadas.includes(f.id));
  return {
    total: fuentesFase.length,
    completadas: completadasFase.length,
    porcentaje: fuentesFase.length > 0 
      ? Math.round((completadasFase.length / fuentesFase.length) * 100)
      : 0
  };
}

function getProximaMision() {
  // Encuentra la próxima fuente no completada del orden
  return CURRICULO
    .filter(f => !STATE.completadas.includes(f.id))
    .sort((a, b) => a.fase - b.fase || a.orden - b.orden)[0];
}

// ============================================================
// UI: STATS
// ============================================================

function actualizarStatsHeader() {
  document.getElementById('stat-xp').textContent = STATE.xp;
  document.getElementById('stat-racha').textContent = STATE.racha;
  document.getElementById('stat-completadas').textContent = STATE.completadas.length;
  document.getElementById('stat-fase').textContent = getFaseActual();
}

// ============================================================
// UI: MISIÓN DE HOY
// ============================================================

function renderMisionActual() {
  const container = document.getElementById('mision-actual');
  const mision = getProximaMision();
  
  if (!mision) {
    container.innerHTML = `
      <div class="mision-card" style="text-align:center;">
        <h2>🎉 ¡Felicidades!</h2>
        <p style="color:var(--text-secondary);font-size:16px;margin-top:12px;">
          Has completado las 40 fuentes del programa.<br>
          Si seguiste el plan, ahora deberías estar ganando $10,000+ USD/mes.<br>
          <strong>Sigue construyendo. La maestría es infinita.</strong>
        </p>
      </div>
    `;
    return;
  }
  
  const fase = FASES.find(f => f.numero === mision.fase);
  const capstoneClass = mision.capstone ? 'capstone' : '';
  const capstoneTag = mision.capstone ? '<span class="tag capstone">🏆 CAPSTONE</span>' : '';
  
  container.innerHTML = `
    <div class="mision-card">
      <div class="mision-header">
        <div>
          <div class="mision-titulo">${escapeHtml(mision.nombre)}</div>
          <div style="color:var(--text-muted);font-size:13px;margin-top:4px;">
            ${escapeHtml(mision.institucion)}
          </div>
          <div class="mision-meta">
            <span class="tag fase">${fase.icono} Fase ${mision.fase}: ${fase.nombre}</span>
            <span class="tag dificultad">📊 ${mision.dificultad}</span>
            <span class="tag horas">⏱️ ${mision.horas} horas</span>
            ${capstoneTag}
          </div>
        </div>
      </div>
      
      <p class="mision-desc">${escapeHtml(mision.descripcion)}</p>
      
      <div class="mision-info-grid">
        <div class="info-item">
          <div class="label">🎯 Skill a desarrollar</div>
          <div class="value">${escapeHtml(mision.skill)}</div>
        </div>
        <div class="info-item">
          <div class="label">📝 Para tu CV</div>
          <div class="value">${escapeHtml(mision.cv)}</div>
        </div>
        <div class="info-item">
          <div class="label">🛠️ Proyecto práctico</div>
          <div class="value">${escapeHtml(mision.proyecto)}</div>
        </div>
        ${mision.metaIngreso ? `
        <div class="info-item" style="border-left-color: var(--accent-green);">
          <div class="label">💰 Meta de ingresos</div>
          <div class="value" style="color: var(--accent-green);">${escapeHtml(mision.metaIngreso)}</div>
        </div>
        ` : ''}
      </div>
      
      <div class="mision-actions">
        ${mision.url ? `
          <a href="${mision.url}" target="_blank" rel="noopener" class="btn btn-primary">
            🌐 Abrir Recurso
          </a>
        ` : ''}
        <button class="btn" onclick="copiarPrompt(${mision.id})">
          🧠 Generar Prompt IA
        </button>
        <button class="btn btn-success" onclick="completarFuente(${mision.id})">
          ✅ Marcar Completada
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// UI: FASES
// ============================================================

function renderFases() {
  const container = document.getElementById('fases-container');
  const faseActual = getFaseActual();
  
  container.innerHTML = FASES.map(fase => {
    const progreso = getProgresoFase(fase.numero);
    const esActiva = fase.numero === faseActual;
    
    return `
      <div class="fase-card ${esActiva ? 'activa' : ''}" style="border-top: 4px solid ${fase.color};">
        <div class="fase-numero">FASE ${fase.numero}</div>
        <div class="fase-icono">${fase.icono}</div>
        <div class="fase-titulo">${fase.nombre}</div>
        <div class="fase-duracion">${fase.duracion}</div>
        <div class="fase-objetivo">${fase.objetivo}</div>
        <div style="font-size:12px;color:var(--text-muted);margin:8px 0;">
          <strong>📦 Proyecto:</strong> ${fase.proyectoFinal}
        </div>
        <div class="fase-progreso">
          <div class="progreso-bar">
            <div class="progreso-fill" style="width: ${progreso.porcentaje}%;"></div>
          </div>
          <div class="progreso-text">${progreso.completadas}/${progreso.total} fuentes (${progreso.porcentaje}%)</div>
        </div>
        <div class="fase-meta-ingresos">
          💰 ${fase.salarioObjetivo}
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// UI: CURRÍCULO COMPLETO
// ============================================================

let filtroActualFase = 'todas';

function renderFiltros() {
  const container = document.getElementById('filtros-fase');
  const filtros = [
    { id: 'todas', label: '📚 Todas' },
    ...FASES.map(f => ({ id: f.numero, label: `${f.icono} Fase ${f.numero}` }))
  ];
  
  container.innerHTML = filtros.map(f => `
    <button class="filter-btn ${filtroActualFase == f.id ? 'active' : ''}" 
            onclick="setFiltro('${f.id}')">${f.label}</button>
  `).join('');
}

function setFiltro(fase) {
  filtroActualFase = fase;
  renderFiltros();
  renderCurriculo();
}

function renderCurriculo() {
  const container = document.getElementById('curriculo-lista');
  
  let fuentes = CURRICULO;
  if (filtroActualFase !== 'todas') {
    fuentes = fuentes.filter(f => f.fase == filtroActualFase);
  }
  
  container.innerHTML = fuentes.map(fuente => {
    const completada = STATE.completadas.includes(fuente.id);
    const capstone = fuente.capstone ? 'capstone' : '';
    const fase = FASES.find(f => f.numero === fuente.fase);
    
    return `
      <div class="fuente-item ${completada ? 'completada' : ''} ${capstone}">
        <div class="fuente-checkbox" onclick="toggleCompletada(${fuente.id})">
          ${completada ? '✓' : ''}
        </div>
        <div class="fuente-content">
          <div class="fuente-title">
            ${fuente.capstone ? '🏆 ' : ''}${escapeHtml(fuente.nombre)}
          </div>
          <div class="fuente-institution">${escapeHtml(fuente.institucion)}</div>
          <div class="fuente-desc">${escapeHtml(fuente.descripcion)}</div>
          <div class="fuente-meta">
            <span class="tag" style="background:${fase.color}20;color:${fase.color};border-color:${fase.color};">
              ${fase.icono} Fase ${fuente.fase}
            </span>
            <span class="tag">⏱️ ${fuente.horas}h</span>
            <span class="tag">📊 ${fuente.dificultad}</span>
            ${fuente.metaIngreso ? `<span class="tag" style="background:var(--gradient-money);color:white;border:none;">💰 ${escapeHtml(fuente.metaIngreso)}</span>` : ''}
          </div>
          <div class="fuente-actions">
            ${fuente.url ? `
              <a href="${fuente.url}" target="_blank" rel="noopener" class="btn">
                🌐 Abrir Recurso
              </a>
            ` : '<span class="tag">📦 Proyecto propio (sin URL)</span>'}
            <button class="btn" onclick="copiarPrompt(${fuente.id})">🧠 Prompt IA</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// UI: INGRESOS TIMELINE
// ============================================================

function renderIngresos() {
  const container = document.getElementById('timeline-ingresos');
  
  container.innerHTML = MILESTONES_INGRESOS.map(m => `
    <div class="milestone">
      <div class="milestone-card">
        <div class="milestone-mes">📅 MES ${m.mes}</div>
        <div class="milestone-monto">$${m.monto.toLocaleString()} USD/mes</div>
        <div class="milestone-desc">${escapeHtml(m.descripcion)}</div>
        <div class="milestone-prob">📊 Probabilidad: ${escapeHtml(m.probabilidad)}</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// UI: RECURSOS EXTRA
// ============================================================

function renderRecursos() {
  const container = document.getElementById('recursos-container');
  
  container.innerHTML = RECURSOS_EXTRA.map(cat => `
    <div class="recurso-categoria">
      <h3>${escapeHtml(cat.categoria)}</h3>
      <div class="recurso-items">
        ${cat.items.map(item => `
          <a href="${item.url}" target="_blank" rel="noopener" class="recurso-item">
            <div class="recurso-item-nombre">🔗 ${escapeHtml(item.nombre)}</div>
            <div class="recurso-item-desc">${escapeHtml(item.descripcion)}</div>
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================================
// ACCIONES
// ============================================================

function completarFuente(id) {
  const fuente = CURRICULO.find(f => f.id === id);
  if (!fuente) return;
  
  if (STATE.completadas.includes(id)) {
    toast('Ya completaste esta fuente', 'info');
    return;
  }
  
  // Confirmación con Proof of Work simple
  const confirmacion = confirm(
    `🎯 PROOF OF WORK\n\n` +
    `Antes de marcar como completada, confirma que:\n\n` +
    `✅ Estudiaste todo el contenido (no solo vistazo)\n` +
    `✅ Implementaste el proyecto: ${fuente.proyecto}\n` +
    `✅ Subiste el código a GitHub con README\n` +
    `✅ Puedes explicar el concepto con tus palabras\n\n` +
    `¿Cumpliste TODOS los puntos?`
  );
  
  if (!confirmacion) {
    toast('OK, completa el proyecto primero', 'info');
    return;
  }
  
  // Marcar completada
  STATE.completadas.push(id);
  
  // XP basado en horas y dificultad
  const xpBase = fuente.horas * 10;
  const multiplicador = fuente.dificultad === 'advanced' ? 1.5 : fuente.dificultad === 'intermediate' ? 1.2 : 1;
  const xpGanado = Math.round(xpBase * multiplicador);
  STATE.xp += xpGanado;
  
  // Capstone bonus
  if (fuente.capstone) {
    STATE.xp += 1000;
    toast(`🏆 CAPSTONE COMPLETADO! +${xpGanado + 1000} XP`, 'success');
  } else {
    toast(`✅ +${xpGanado} XP — ${fuente.nombre}`, 'success');
  }
  
  actualizarRacha();
  guardarEstado();
  renderTodo();
}

function toggleCompletada(id) {
  const fuente = CURRICULO.find(f => f.id === id);
  if (!fuente) return;
  
  if (STATE.completadas.includes(id)) {
    // Descompletar
    if (confirm(`¿Marcar "${fuente.nombre}" como NO completada?`)) {
      STATE.completadas = STATE.completadas.filter(c => c !== id);
      guardarEstado();
      renderTodo();
      toast('Marcada como no completada', 'info');
    }
  } else {
    completarFuente(id);
  }
}

function copiarPrompt(id) {
  const fuente = CURRICULO.find(f => f.id === id);
  if (!fuente) return;
  
  const prompt = `🛡️ AEGIS PRO — Sesión de Estudio

CONTEXTO:
Estoy estudiando: ${fuente.nombre}
Fuente: ${fuente.institucion}
Categoría: ${fuente.categoria}
Dificultad: ${fuente.dificultad}
Skill objetivo: ${fuente.skill}
Proyecto a entregar: ${fuente.proyecto}

ROL:
Actúa como mi tutor socrático experto en ${fuente.categoria}.
NO me des respuestas directas. Hazme preguntas que me hagan PENSAR.
Si no sé algo, dame pistas, no la solución.

OBJETIVO DE HOY:
1. Comprender los 3 conceptos clave más importantes de este tema
2. Saber cómo aplicarlo en un proyecto real
3. Detectar mis lagunas mentales

INSTRUCCIONES:
1. Pregúntame primero: "¿Qué sabes ya sobre este tema?"
2. Basándote en mi respuesta, hazme preguntas progresivas
3. Cuando me equivoque, NO me corrijas directamente. Pregúntame "¿qué pasaría si...?"
4. Al final de la sesión, dame 3 tareas concretas para implementar HOY

FORMATO:
- Respuestas cortas y directas
- Preguntas, no monólogos
- Ejemplos del mundo real (no abstractos)
- Conexiones con proyectos del portfolio

EMPEZAMOS:
¿Listo? Pregúntame qué sé del tema y comencemos.`;
  
  // Copiar al portapapeles
  navigator.clipboard.writeText(prompt).then(() => {
    toast('🧠 Prompt copiado! Pégalo en ChatGPT/Claude/Gemini', 'success');
  }).catch(() => {
    // Fallback: mostrar en alert
    prompt_window = window.prompt('Copia este prompt:', prompt);
  });
}

// ============================================================
// POMODORO TIMER
// ============================================================

let timerInterval = null;
let timerSegundos = 25 * 60;
let timerTotal = 25 * 60;
let timerActivo = false;

function actualizarTimerUI() {
  const min = Math.floor(timerSegundos / 60);
  const sec = timerSegundos % 60;
  document.getElementById('timer-display').textContent = 
    `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  
  const pct = ((timerTotal - timerSegundos) / timerTotal) * 100;
  document.getElementById('timer-bar').style.width = `${pct}%`;
}

function iniciarTimer() {
  if (timerActivo) {
    toast('Timer ya está activo', 'info');
    return;
  }
  
  timerActivo = true;
  document.getElementById('timer-status').textContent = '🔥 Sesión activa — Concéntrate.';
  
  timerInterval = setInterval(() => {
    if (timerSegundos <= 0) {
      clearInterval(timerInterval);
      timerActivo = false;
      timerSegundos = 25 * 60;
      actualizarTimerUI();
      document.getElementById('timer-status').textContent = '✅ ¡Sesión completada! +25 XP';
      STATE.xp += 25;
      guardarEstado();
      actualizarStatsHeader();
      
      // Notificación sonora si es posible
      try {
        new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=').play();
      } catch(e) {}
      
      alert('🎉 ¡25 minutos completados!\n\n+25 XP\n\nToma 5 min de break. Bebe agua. Camina.');
      return;
    }
    timerSegundos--;
    actualizarTimerUI();
  }, 1000);
}

function pausarTimer() {
  if (!timerActivo) return;
  clearInterval(timerInterval);
  timerActivo = false;
  document.getElementById('timer-status').textContent = '⏸️ Pausado';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerActivo = false;
  timerSegundos = 25 * 60;
  timerTotal = 25 * 60;
  actualizarTimerUI();
  document.getElementById('timer-status').textContent = 'Listo para empezar (25 min focus + 5 min break)';
}

// ============================================================
// TABS
// ============================================================

function cambiarTab(tab) {
  // Tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  
  // Sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${tab}`).classList.add('active');
  
  // Re-render según tab
  if (tab === 'curriculo') renderCurriculo();
  if (tab === 'fases') renderFases();
}

// ============================================================
// INIT
// ============================================================

function renderTodo() {
  actualizarStatsHeader();
  renderMisionActual();
  renderFases();
  renderFiltros();
  renderCurriculo();
  renderIngresos();
  renderRecursos();
}

// Exponer en global para debugging
window.AEGIS = {
  STATE,
  CURRICULO,
  FASES,
  guardarEstado,
  cargarEstado,
  resetState: () => {
    if (confirm('⚠️ ¿RESETEAR TODO TU PROGRESO?\n\nEsto borrará XP, racha y completadas. NO se puede deshacer.')) {
      localStorage.removeItem('aegis_pro_state');
      STATE = { ...STATE_DEFAULT };
      renderTodo();
      toast('Estado reseteado', 'info');
    }
  },
  exportData: () => {
    const dataStr = JSON.stringify({ STATE, fecha: new Date().toISOString() }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis-pro-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast('💾 Backup descargado', 'success');
  }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  renderTodo();
  console.log('🛡️ AEGIS PRO cargado. Usa AEGIS.* en consola para comandos avanzados.');
  console.log('Comandos: AEGIS.exportData() | AEGIS.resetState() | AEGIS.STATE | AEGIS.CURRICULO');
});
