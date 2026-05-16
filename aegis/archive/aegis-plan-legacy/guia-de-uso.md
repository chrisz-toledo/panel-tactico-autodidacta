# 📖 Guía de Uso — Sistema AEGIS v1.0
*Sistema de Estudio Autodidacta de Élite con IA*

---

## ¿Qué es AEGIS?

AEGIS es un sistema de estudio autodidacta de 10 años que combina:
- **Plan de estudios estructurado** (CS50x → Ciberseguridad → IA)
- **Motor de calibración inteligente** (Bayesian Knowledge Tracing)
- **Gamificación psicológica** (XP, rachas, logros, Consejo de Maestros)
- **Integración con IA** (Gemini, NotebookLM, Ollama local)
- **100% offline** — un solo archivo HTML, sin servidor

---

## Instalación

No requiere instalación. Solo:

```bash
# Opción 1: Abrir directamente
open sistema-estudio-aegis.html   # macOS
xdg-open sistema-estudio-aegis.html  # Linux

# Opción 2: Con servidor local (recomendado para Ollama)
python3 -m http.server 8080
# Luego abrir: http://localhost:8080/sistema-estudio-aegis.html
```

---

## Primeros Pasos (Día 1)

### Paso 1: Configurar tu perfil
1. Abre el sistema en tu navegador
2. El estado se carga automáticamente (vacío en primer uso)
3. Ve a la pestaña **"Hoy"** — tu pantalla principal

### Paso 2: Registrar tu primera sesión
1. En "Hoy", revisa las **Tareas de Hoy** (generadas automáticamente)
2. Estudia el material indicado (CS50x Week 0 en Fase 0)
3. Registra tu sesión:
   - **Puntuación (0-100):** Tu autoevaluación de comprensión
   - **Tiempo estudiado:** Minutos reales
   - **Notas:** Qué aprendiste, qué fue difícil
   - **Estado de ánimo:** Cómo te sentiste
4. Clic en **"Registrar Sesión"**

### Paso 3: Usar el Pomodoro
1. Ve a la pestaña **"⏱️ Pomodoro"**
2. Clic en **"▶ Iniciar"** (25 minutos por defecto)
3. Estudia sin interrupciones hasta que suene
4. Toma descanso de 5 minutos
5. Repite 4 veces → Toma descanso largo de 30 min

---

## Sistema de Progreso

### XP (Puntos de Experiencia)
| Acción | XP |
|--------|----|
| Registrar sesión | score×0.5 + tiempo×0.3 |
| Racha ≥7 días | +50 XP bonus |
| Completar Pomodoro | +25 XP |
| Resolver ejercicio CC | +100 XP |
| Completar Hito Élite | +500 XP |
| Desbloquear Logro | Variable (200-10000 XP) |

### Rachas (Streaks)
- Estudia **todos los días** para mantener tu racha
- La racha se rompe si no estudias un día
- Si vuelves después de romper la racha → logro **"Fénix"** 🔥

### Motor de Calibración (BKT)
El sistema ajusta automáticamente:
- **Duración de sesión:** Sube si vas bien, baja si estás cansado
- **Nivel de dificultad:** Sube al 85% de dominio
- **Recomendación de descanso:** Detecta sobrecarga cognitiva

---

## Las 12 Pestañas

| Pestaña | Uso |
|---------|-----|
| **📅 Hoy** | Tu misión diaria, registro de sesión, feedback |
| **📊 Panel** | Estadísticas globales, historial, logros |
| **🗺️ Plan** | Las 8 fases de 10 años, filtrable por fase |
| **⏱️ Pomodoro** | Timer con sugerencia musical integrada |
| **⚔️ Code Combat** | 10 ejercicios de algoritmos y ciberseguridad |
| **🏆 Élite** | 10 hitos de élite, uno por año |
| **🤖 AI Academy** | 7 niveles de formación en IA |
| **🧙 Consejo** | Los 10 Maestros con su sabiduría |
| **🎵 Audio** | 4 playlists científicas con enlaces |
| **🔄 CC Sync** | Sincronización manual con CodeCombat.com |
| **📚 NotebookLM** | Fuentes y prompt para tu libro de estudio |
| **🎯 Misión** | Generador de misiones + integración Ollama |

---

## Integración con Herramientas Externas

### NotebookLM (Google)
1. Ve a **"📚 NotebookLM"**
2. Clic en **"📋 Copiar Prompt"**
3. Abre [notebooklm.google.com](https://notebooklm.google.com/)
4. Crea un nuevo notebook y agrega las fuentes listadas
5. Usa los prompts sugeridos para generar podcasts y quizzes

### Gemini
1. Ve a **"🎯 Misión"**
2. Clic en **"⚡ Generar Misión Completa"**
3. Copia el prompt de Gemini generado
4. Pégalo en [gemini.google.com](https://gemini.google.com/)

### Ollama (Local — 100% offline)
```bash
# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Descargar modelo
ollama pull llama3.2

# Iniciar servidor
ollama serve
```
Luego en AEGIS, pestaña "🎯 Misión", escribe tu pregunta y el modelo.

### CodeCombat
1. Crea cuenta en [codecombat.com](https://codecombat.com/)
2. Selecciona Python como lenguaje
3. Ve a **"🔄 CC Sync"** en AEGIS
4. Actualiza tu progreso manualmente por mundo

---

## Backup y Sincronización

### Exportar datos
```
Header → 📤 Exportar
```
Descarga un JSON con todo tu progreso.

### Importar datos (entre dispositivos)
1. Abre el HTML en consola del navegador (F12)
2. Ejecuta: `localStorage.setItem('aegis_state', '<JSON_COPIADO>')`
3. Recarga la página

### Multiplataforma
- **Mac:** Abre directamente en Safari/Chrome
- **Arch Linux:** `xdg-open sistema-estudio-aegis.html`
- **Teléfono:** Copia el archivo y ábrelo con el navegador del sistema

---

## Hoja de Ruta de 10 Años

| Año | Fase | Objetivo |
|-----|------|---------|
| 1 | Fase 0-1 | CS50x completo + Python básico |
| 2 | Fase 1-2 | Algoritmos + Sistemas + Nand2Tetris |
| 3 | Fase 3 | Ciberseguridad básica + CTF Bandit |
| 4 | Fase 4 | TryHackMe SOC + Hack The Box |
| 5 | Fase 5 | IA & Machine Learning |
| 6-7 | Fase 5-6 | Deep Learning + Agentes IA |
| 7-8 | Fase 6 | Especialización + Bug Bounty |
| 8-9 | Fase 7 | Research + Open Source |
| 10 | Fase 7 | Maestría + Contribución |

---

## FAQ

**¿Qué pasa si no estudio un día?**
Tu racha se rompe, pero el sistema te da el logro "Fénix" cuando vuelvas. Lo importante es volver.

**¿Cómo sé que el plan de estudios es correcto?**
Está basado en OSSU (Open Source Society University), CS50x, y las recomendaciones de la comunidad /r/learnprogramming.

**¿Puedo modificar el plan?**
Sí. El archivo HTML es editable. Los arrays `PHASES`, `AI_ACADEMY`, `MASTERS` en el `<script>` son la fuente de datos.

**¿El sistema funciona sin internet?**
Sí, excepto: Google Fonts (tipografía degrada elegantemente), links externos de recursos, Ollama (si no está en localhost).

---

*Documentador: Agente 7 | AEGIS v1.0 | 2026-05-14*
