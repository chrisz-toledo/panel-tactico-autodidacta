# PROYECTO AEGIS v2.0 — Task Plan
**Orquestador:** Antigravity (Agente 9)
**Actualizado:** 2026-05-15

## Objetivo
Evolucionar AEGIS v2.0 desde un tutor conversacional base hasta un ecosistema de aprendizaje de élite, absorbiendo las mejores mecánicas del "Panel Táctico Autodidacta v5.0". El sistema debe mantenerse como un archivo HTML único, offline y autocontenido.

## Entregables
- [ ] `aegis-v2-nucleo.html` (Versión Final Definitiva)

## Progreso Histórico
- **Fase 1: Núcleo HTML & Chat** [COMPLETADO]
- **Fase 2: Pomodoro & Motores de Calibración** [COMPLETADO]
- **Fase 3: Personalidad, Memoria y Prompts Offline** [COMPLETADO]

## FASE 4: ABSORCIÓN DEL PANEL TÁCTICO [COMPLETADO]
*Basado en el análisis del repositorio `panel-tactico-autodidacta`.*

### 1. Sistema de Visualización de Progreso a Largo Plazo
- [x] **Ingeniero UI:** Implementar "Week Dots" o cuadrícula de 48/336 puntos (SVG/Canvas) dentro del comando `/progreso`.
- [x] **Psicólogo:** Añadir "Progress Rings" dinámicos para mostrar el porcentaje completado de la Fase/Odisea.

### 2. Expansión Estructural del Roadmap (Smart State)
- [x] **Arquitecto:** Expandir el `getTodayTask()` para integrar una estructura de datos más compleja, mapeando con exactitud semanas y misiones, similar al historial de aprendizaje (Intel Points/IP).
- [x] **Ingeniero:** Lógica de validación de días para otorgar "Trofeos" por semanas completadas al 100%.

### 3. Multi-Role Prompting (Briefing de Misión Avanzado)
- [x] **Notificador:** Expandir el comando `/prompt` (y el de NotebookLM) para incluir generación estructurada según el rol necesario (Auditor de Código, Mentor Maquiavélico, Product Manager).
- [x] **Historiador:** Integrar la exportación del contexto total (historial de chat + métricas) en Markdown para inyectar en Gemini.

### 4. Refinamiento de Métricas de Sesión (Stop-Loss & Calibración)
- [x] **Psicólogo:** Integrar evaluación explícita post-Pomodoro: Energía (1-5) y Enfoque/Calidad (1-10).
- [x] **Ingeniero:** Mejorar el Pomodoro con una mecánica "Stop-Loss" (protección contra la fatiga que fuerza descansos o pausa el estudio si el riesgo de fatiga excede un umbral).

## FASE 5: PULIDO Y ENTREGA FINAL [COMPLETADO]
- [x] **Músico:** Ampliar el catálogo de pistas de audio sintético (Web Audio API).
- [x] **Verificador:** Batería de pruebas exhaustivas del motor de LocalStorage.
- [x] **Documentador:** Compilar el código, minificar y documentar el uso en el README.
