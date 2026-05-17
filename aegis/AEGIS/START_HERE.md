# 🛡️ AEGIS — Sistema de Autoaprendizaje Personal

> **Tu herramienta diaria para dominar programación, ciberseguridad e IA**

---

## 🚀 INICIO RÁPIDO (30 segundos)

```bash
open /Users/christiantoledo/Desarrollo/00-Learning/aegis/AEGIS/index.html
```

**Listo.** Esa es la única herramienta que necesitas. Todo está dentro de ese archivo.

---

## ✅ QUÉ FUNCIONA (Verificado)

### 📚 Biblioteca de 178 Fuentes
- Grid completo con todas las fuentes categorizadas
- Filtros por categoría: CS50, Python, Seguridad, IA, etc.
- Click en cualquier fuente → se selecciona como misión actual

### ⏱️ Micro-Misiones Pomodoro (Modo ADHD)
- **📖 Lectura/Video** — 25 min — +50 XP
- **💻 Práctica/Código** — 30 min — +75 XP
- **🎯 Ejercicios/Quiz** — 20 min — +40 XP
- **☕ Descanso** — 5 min obligatorio

### 🎯 Proof of Work (Anti-Falso-Positivo)
Antes de marcar una fuente como completada, debes:
1. **Explicar el concepto** como a un niño de 12 años (mín. 50 caracteres)
2. **Escribir pseudocódigo** o caso práctico (mín. 30 caracteres)
3. **Conectar con otros temas** que ya conoces

→ Sin esto, NO puedes marcar completada. Garantiza que aprendiste de verdad.

### 🧠 6 Generadores de Prompts para IA
- **📋 Plan Diario** — Plan estructurado para hoy
- **❓ Tutor Socrático** — Preguntas guía profundas
- **📓 NotebookLM** — Para podcast/quiz automático
- **🎧 AudioClase** — Clase de audio con analogías
- **📝 Resumen Ejecutivo** — Puntos clave
- **🎙️ MASTER NotebookLM** — Usando las 178 fuentes como contexto

### 🌅 Ritmo Circadiano Adaptativo
- Reportas tu energía 1-10 cada día
- El sistema sugiere fuentes según tu hora pico
- Match quality: Óptimo / Bueno / Aceptable / Subóptimo
- Detecta cronotipo (matutino/nocturno) con MEQ test

### 🧬 Biohacking Integrado
- **Assessment de cronotipo** (5 preguntas)
- **Log de suplementos** (cafeína, L-teanina, creatina)
- **Timer Ultradiano** (90 min ciclos BRAC de Kleitman)
- **Advertencia de cafeína** post-2pm

### 🎵 Música Protocolar
- 🎯 Deep Focus (40Hz Gamma)
- 🌊 Creative Flow (10Hz Alpha)
- 📚 Learning Mode (SMR)
- ☕ Break & Recharge (Theta)
- 🎬 Epic Coding (Film Scores)
- Auto-sync con ciclos de estudio

### 🎮 Gamificación Real
- XP por minuto de estudio
- Niveles (1000 XP = subir)
- Rachas de días consecutivos
- Sistema SRS de repasos espaciados
- Logros desbloqueables

### 💾 Persistencia Completa
- **localStorage** automático (no se pierde nada)
- **Exportar backup** JSON con un click
- **Importar backup** para sincronizar entre dispositivos
- **Backup de emergencia** automático

---

## 📅 PLAN DE ESTUDIO

El sistema usa el **PLAN MAESTRO de 178 Fuentes / 5-7 años**:

```
AÑO 1: Fundamentos     → Junior Developer       (45 fuentes)
AÑO 2: Web Profesional → Mid Developer          (40 fuentes)
AÑO 3: Ciberseguridad  → Security Analyst       (35 fuentes)
AÑO 4: Arquitectura    → Senior Developer       (25 fuentes)
AÑO 5: IA/ML           → ML Engineer            (20 fuentes)
AÑO 6-7: Especialización → Experto (OSCP/AI/etc) (13 fuentes)
```

📄 **Plan completo:** `../../documentation/PLAN_MAESTRO_178_FUENTES_COMPLETO.md`

---

## 🎯 FLUJO DIARIO (15-20 minutos mínimo)

### 1. ABRIR (30 seg)
```bash
open /Users/christiantoledo/Desarrollo/00-Learning/aegis/AEGIS/index.html
```

### 2. REPORTAR ENERGÍA (10 seg)
- Mueve el slider 1-10 según cómo te sientes
- El sistema sugiere la mejor fuente para esta hora/energía

### 3. SELECCIONAR FUENTE (10 seg)
- Acepta la sugerencia del sistema, O
- Click en cualquier fuente del grid

### 4. GENERAR PROMPT (30 seg)
- Click **🧠 Tutor Socrático** (o el que prefieras)
- Click **📋 Copiar**
- Pégalo en **NotebookLM** o **Gemini**

### 5. INICIAR MISIÓN (25 min)
- Click **📖 Lectura 25 min**
- Estudia mientras corre el timer
- Cierra distracciones

### 6. PROOF OF WORK (5 min)
Al terminar, antes de marcar completada:
- Explica con tus palabras lo aprendido
- Escribe pseudocódigo o ejemplo
- Conecta con otros temas

### 7. COMPLETAR (10 seg)
- Click **✅ Completar**
- +100 XP, +progreso, +racha
- Repasos automáticamente programados

### 8. EXPORTAR BACKUP (10 seg, una vez por semana)
- Click **📤 Exportar**
- Guarda el JSON en lugar seguro

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### "No veo las 178 fuentes"
- Recarga con `Cmd+R` (Chrome) o `Cmd+Shift+R` (hard reload)
- Verifica que estás en `aegis/AEGIS/index.html` (NO en `aegis/v6/index.html`)

### "Perdí mi progreso"
- El sistema crea backups automáticos en localStorage
- Click **📥 Importar** y selecciona tu último backup JSON

### "Los botones no responden"
- Abre consola (F12) y revisa errores
- Asegúrate de tener JavaScript habilitado
- Prueba en Chrome (más compatible que Safari)

### "Quiero más fuentes"
- Edita el archivo `index.html`
- Busca `const BIBLIOTECA = [`
- Añade más entradas siguiendo el formato

---

## 🔧 CONSOLA AVANZADA (Dev Tools — F12)

```javascript
// Ver estadísticas
AEGIS_V6.getAdvancedStats()

// Recomendaciones inteligentes
AEGIS_V6.getSmartRecommendations()

// Exportar backup con checksum
AEGIS_V6.exportDataV6()

// Acceso directo al estado
AEGIS_V6.STATE              // Tu progreso completo
AEGIS_V6.BIBLIOTECA         // Las 178 fuentes
AEGIS_V6.BIBLIOTECA.filter(s => s.category === 'security')  // Por categoría
```

---

## 📊 ESTRUCTURA DEL REPOSITORIO

```
panel-tactico-autodidacta/
├── aegis/
│   ├── AEGIS/                  ⭐ ESTE ES TU SISTEMA
│   │   ├── index.html          ← Abre este archivo
│   │   └── START_HERE.md       ← Esta guía
│   │
│   ├── v6-BETTER/              (Idéntico a AEGIS/, backup)
│   ├── v6/                     (WIP modular - no usar)
│   ├── v5/                     (Versión anterior)
│   └── archive/                (Históricas)
│
├── documentation/
│   ├── PLAN_MAESTRO_178_FUENTES_COMPLETO.md  ⭐ Tu roadmap
│   ├── RUTA_CERTIFICACIONES.md
│   └── (20+ documentos más)
│
└── README.md
```

---

## ⚡ REGLAS DE ORO

1. **1 hora mínimo diario** — Consistencia > intensidad
2. **Proof of Work obligatorio** — Sin esto no completas fuentes
3. **Semana de receso cada 12 semanas** — Burnout destruye carreras
4. **Backup semanal** — `Exportar` y guarda el JSON
5. **Comunidad/mentor** — 1 hora semanal con alguien real

---

## 🎯 TU PRÓXIMO PASO (AHORA)

```bash
open /Users/christiantoledo/Desarrollo/00-Learning/aegis/AEGIS/index.html
```

1. Reporta tu energía actual
2. Acepta la sugerencia del sistema
3. Click "📖 Lectura 25 min"
4. Estudia

**Eso es todo. La maestría es 1,825 días de esto.**

---

**🛡️ AEGIS — Tu sistema. Tu plan. Tu disciplina.**
