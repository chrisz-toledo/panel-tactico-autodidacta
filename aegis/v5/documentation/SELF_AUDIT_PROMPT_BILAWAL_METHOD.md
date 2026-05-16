# 🎯 PROMPT MAESTRO DE AUTO-AUDITORÍA — Método Bilawal Sidhu

**Para usar con:** Claude / Gemini / GPT-4 / NotebookLM  
**Objetivo:** Auto-calibración profunda del proyecto AEGIS v5.0 aplicando el modelo mental de Bilawal Sidhu

---

## 📋 CONTEXTO DEL MODELO MENTAL APLICADO

Este prompt aplica los principios de Bilawal Sidhu (creator/PM ex-Google, 1.6M+ subs, TED curator):

- **Kitbashing:** Combinar herramientas para resultados emergentes
- **Greybox → Final:** Prototipo rápido, refinamiento iterativo
- **Deconstrucción:** Desarmar complejo en simple
- **Curación > Creación:** Eliminar lo redundante
- **TL;DR + Deep Dive:** Resumen + profundidad
- **Workflow Transparency:** Mostrar el HOW completo
- **Reality-bending:** Combinaciones inesperadas
- **PM Mindset:** User journeys, problem-solution

---

## 🚀 EL PROMPT (Copiar y Pegar Completo)

```markdown
# AUTO-AUDITORÍA EXHAUSTIVA — PROYECTO AEGIS v5.0

Actúa como un equipo de élite compuesto por:
1. **Bilawal Sidhu** (Ex-Google PM, creator 1.6M+) — Product strategy, UX, kitbashing workflows
2. **Don Norman** (UX legend) — Usabilidad y diseño centrado en humano
3. **Barbara Oakley** (Learning How to Learn) — Pedagogía científica
4. **Kent Beck** (XP, TDD) — Calidad de código, refactoring
5. **Bret Victor** — Interfaces que amplifican el pensamiento

## CONTEXTO DEL PROYECTO

AEGIS v5.0 es un sistema de aprendizaje autónomo single-file HTML para autodidactas. 
Gestiona biblioteca de 69 fuentes (CS50, Python, Seguridad, IA/ML, etc.), 
genera prompts para NotebookLM/Gemini, y gamifica progreso.

**Stack:** HTML + Vanilla JS + LocalStorage  
**Filosofía:** 100% offline, single-file, sin dependencias  
**Usuario objetivo:** Autodidacta con ADHD, 10 años de plan de estudio

## ESTRUCTURA ACTUAL

```
aegis/v5/
├── aegis-v5-BIBLIOTECA.html      # App principal (1225 líneas)
├── documentation/
│   ├── AUDITORIA_TECNICA_PEDAGOGICA_AEGIS_V5.md
│   ├── PROMPT_MAESTRO_AUDIOCLASE_NOTEBOOKLM.md
│   ├── LECTURAS_PRACTICAS_DIARIAS.md
│   ├── RUTA_CERTIFICACIONES.md
│   └── OPTIMIZACION_COGNITIVA_SUPLEMENTOS.md
├── flows/
│   └── FLUJO_DIARIO_AUDIOCLASE_NOTEBOOKLM.md
└── launchers/
    └── 🛡️ AEGIS V5.command
```

## FEATURES IMPLEMENTADAS

1. **Biblioteca de 69 fuentes** categorizadas
2. **Generador de prompts:** Plan, Socrático, NotebookLM, AudioClase, Master
3. **Sistema SRS** (Spaced Repetition): repasos 1d, 3d, 7d, 14d, 30d
4. **Micro-misiones Pomodoro** con timer persistente
5. **Gamificación:** XP, streaks, combo, achievements
6. **URLs configurables** para NotebookLM/Gemini
7. **Error handling** robusto en LocalStorage
8. **Memory leak protection** en notificaciones

---

## TU MISIÓN: AUDITORÍA EN 8 DIMENSIONES

Para CADA dimensión, debes entregar:
- **TL;DR** (1-2 líneas)
- **Deep Dive** (análisis técnico)
- **Problema raíz** (no síntoma)
- **Solución sostenible** (no parche)
- **Métrica de éxito** (cómo sabremos si funciona)

### DIMENSIÓN 1: ARQUITECTURA & ESCALABILIDAD
- ¿El single-file scaling es sostenible? ¿En qué punto rompe?
- ¿Qué pasaría con 200 fuentes? ¿500?
- ¿Cómo manejaría un futuro multi-usuario?
- ¿LocalStorage es el límite correcto?
- ¿Cómo se compara con IndexedDB para este caso?

### DIMENSIÓN 2: UX/UI — JOURNEY DEL USUARIO
Aplica el método de Bilawal: deconstruye el journey en 5 momentos:
1. **First contact** (primera vez abriendo AEGIS)
2. **Daily ritual** (uso diario después de 1 semana)
3. **Plateau** (mes 2-3, cuando la novedad muere)
4. **Mastery** (mes 6+, dominio del sistema)
5. **Break point** (qué haría abandonar el sistema)

Identifica friction points en cada momento.

### DIMENSIÓN 3: PEDAGOGÍA — EFECTIVIDAD REAL DE APRENDIZAJE
Aplica Barbara Oakley + ciencia cognitiva:
- ¿El SRS está bien calibrado? (compara con Anki, SuperMemo)
- ¿Falta "interleaving" (mezclar temas)?
- ¿Falta "elaborative interrogation" (¿por qué?)?
- ¿Los prompts respetan "desirable difficulty"?
- ¿Hay riesgo de "illusion of competence"?
- ¿Cómo se integra "spaced practice" con "deliberate practice"?

### DIMENSIÓN 4: KITBASHING — COMBINACIONES NO EXPLORADAS
Aplica el método Bilawal de combinaciones emergentes:
- ¿Qué pasa si combinamos prompts? (Ej: Socrático + AudioClase)
- ¿Pueden los prompts auto-mejorarse usando feedback del usuario?
- ¿Podríamos integrar Whisper para grabar reflexiones de voz?
- ¿Y si las analogías se generan desde los hobbies del usuario?
- ¿Combinación con Notion API? ¿Anki? ¿Obsidian?

### DIMENSIÓN 5: WORKFLOW TRANSPARENCY — DOCUMENTACIÓN
- ¿Un dev externo podría entender el código en 30 min?
- ¿Las decisiones arquitectónicas están documentadas?
- ¿Existe un "decision log"?
- ¿Hay tests? ¿Documentación de funciones?
- ¿El README cuenta la historia del proyecto?

### DIMENSIÓN 6: REALITY-BENDING — INNOVACIONES POSIBLES
Piensa como Bilawal: ¿qué combinaciones son obvias pero nadie ha hecho?
- ¿Modo "Bilawal Mode" donde la IA actúa como mentor PM?
- ¿"Reality check" semanal con IA evaluando progreso?
- ¿Sistema de "kitbashing personal" donde el usuario combina fuentes?
- ¿Generación de "highlight reels" educativos semanales?
- ¿Visualización 3D del progreso (estilo grafo de conocimiento)?

### DIMENSIÓN 7: CURACIÓN > CREACIÓN — ¿QUÉ ELIMINAR?
Aplica filosofía de PM: matar features que no aportan
- ¿Qué features están duplicadas?
- ¿Qué documentos son redundantes?
- ¿Qué fuentes de las 69 NO se usarían en el plan real?
- ¿Qué botones nunca se usan?
- ¿Qué complejidad innecesaria existe?

### DIMENSIÓN 8: MÉTRICAS DE ÉXITO — ¿FUNCIONA REALMENTE?
Define KPIs honestos:
- **Adopción:** ¿Cuántos días seguidos se usa?
- **Profundidad:** ¿Cuántas fuentes se completan?
- **Retención:** ¿Los repasos SRS se hacen?
- **Transferencia:** ¿El conocimiento se aplica en código real?
- **Frustración:** ¿En qué punto se abandona?

---

## ENTREGABLES OBLIGATORIOS

Al final de tu auditoría, debes producir:

### A. EXECUTIVE SUMMARY (3 párrafos máximo)
- ¿AEGIS resuelve el problema real?
- ¿Cuál es el #1 riesgo de fracaso?
- ¿Cuál es la #1 oportunidad sin explotar?

### B. TOP 10 ISSUES PRIORIZADOS
Formato:
```
#1 [CRÍTICO/ALTO/MEDIO] — Título del issue
Problema raíz: [descripción]
Impacto: [usuarios/funcionalidad afectada]
Solución sostenible: [no parche]
Métrica: [cómo medir éxito]
Esfuerzo: [horas estimadas]
```

### C. ROADMAP "KITBASHING" — 3 FEATURES EMERGENTES
3 combinaciones inesperadas que multiplicarían el valor:
- Feature 1: [X + Y = ?]
- Feature 2: [A + B + C = ?]
- Feature 3: [Conexión inesperada]

### D. LISTA DE "FEATURES A MATAR"
Aplica filosofía de curación. ¿Qué eliminarías sin remordimiento?

### E. DECISION LOG TEMPLATE
Crea template para documentar futuras decisiones:
- Contexto
- Opciones consideradas
- Decisión
- Trade-offs aceptados
- Fecha de re-evaluación

### F. "BILAWAL MOMENT" — La Idea Reality-Bending
Una idea que NADIE en el espacio educativo está haciendo, 
que podría redefinir cómo funciona AEGIS.

---

## RESTRICCIONES

❌ **NO digas:** "depende", "es subjetivo", "podría ser"  
✅ **SÍ di:** "datos sugieren", "evidencia indica", "métrica X muestra"

❌ **NO propongas:** Frameworks pesados (React, Vue, etc.)  
✅ **SÍ propón:** Vanilla JS, soluciones nativas, simplicidad

❌ **NO recomiendes:** Backend/servidor propio  
✅ **SÍ:** 100% offline, LocalStorage/IndexedDB, sync via tokens

❌ **NO uses:** Jerga sin explicar  
✅ **SÍ:** TL;DR primero, profundidad después

---

## TONO Y ESTILO

- **Directo:** Sin rodeos, datos concretos
- **Honesto:** Si algo no funciona, dilo claramente
- **Constructivo:** Cada crítica con solución
- **Pragmático:** Soluciones de hoy, no utopías
- **Profundo:** Va al "por qué" raíz, no al "qué" superficial

---

## OUTPUT FORMAT

```markdown
# AUDITORÍA AEGIS v5.0 — INFORME EJECUTIVO

## EXECUTIVE SUMMARY
[3 párrafos]

## DIMENSIÓN 1: ARQUITECTURA
### TL;DR
[1-2 líneas]
### Deep Dive
[análisis]
### Issues encontrados
[lista priorizada]
### Soluciones propuestas
[code-ready]
### Métricas de éxito
[cómo medir]

[... repetir para las 8 dimensiones ...]

## TOP 10 ISSUES
[priorizados]

## ROADMAP KITBASHING
[3 features emergentes]

## FEATURES A MATAR
[lista de eliminaciones]

## DECISION LOG TEMPLATE
[template]

## BILAWAL MOMENT
[idea reality-bending]
```

---

**EJECUTA AHORA. No pidas clarificaciones. Usa tu mejor juicio basado en el contexto provisto.**
```

---

## 🎬 CÓMO USAR ESTE PROMPT

### Opción 1: Con Claude/GPT-4 (Recomendado)
1. Copia el prompt completo (sección "EL PROMPT")
2. Pégalo en Claude.ai o ChatGPT
3. Adjunta el archivo `aegis-v5-BIBLIOTECA.html` si es posible
4. Espera el informe completo (10-15 min de generación)

### Opción 2: Con NotebookLM
1. Sube todos los archivos de `/aegis/v5/` a un nuevo notebook
2. Pega el prompt
3. NotebookLM auditará usando las fuentes como contexto

### Opción 3: Con Gemini (con código)
1. Abre Gemini en https://gemini.google.com
2. Adjunta el HTML del proyecto
3. Pega el prompt
4. Pídele que también ejecute análisis estático del código

### Opción 4: Iterativo (Más profundo)
Ejecuta el prompt 3 veces con diferentes IAs:
- Claude → Foco en arquitectura y código
- Gemini → Foco en pedagogía e ideas creativas
- GPT-4 → Foco en UX y product strategy

Luego haz un meta-prompt: *"Combina estas 3 auditorías y dame la versión consolidada"*

---

## 🎯 ESPERADO

Al ejecutar este prompt obtendrás:

1. **8 análisis dimensionales** con TL;DR + profundidad
2. **Top 10 issues** priorizados con soluciones sostenibles
3. **3 ideas "kitbashing"** combinaciones no exploradas
4. **Lista de features a eliminar** (curación)
5. **Decision log template** para decisiones futuras
6. **1 "Bilawal moment"** — idea que podría redefinir el proyecto

---

## 🚀 PRÓXIMOS PASOS

1. **Ejecutar prompt** en tu IA favorita
2. **Guardar informe** en `documentation/AUDIT_REPORT_[fecha].md`
3. **Priorizar 3 fixes** del Top 10
4. **Crear nuevo prompt** basado en hallazgos para iteración
5. **Documentar decisiones** en decision log

---

## 📊 MÉTRICAS DE CALIDAD DEL INFORME

Verifica que el informe generado cumpla:

- [ ] ¿Cada dimensión tiene TL;DR + Deep Dive?
- [ ] ¿Las soluciones son sostenibles, no parches?
- [ ] ¿Hay 3 ideas "kitbashing" reales?
- [ ] ¿La idea "Bilawal moment" es ambiciosa pero ejecutable?
- [ ] ¿El tono es directo y honesto?
- [ ] ¿Las métricas son medibles?
- [ ] ¿Identifica problemas raíz, no síntomas?

---

## 🧠 META: AUTO-MEJORA CONTINUA

Cada 30 días, re-ejecuta este prompt con las nuevas implementaciones.
Compara informes. El delta te dice si vas en la dirección correcta.

```
Informe Día 0  → Estado inicial
Informe Día 30 → Primera iteración
Informe Día 60 → Tendencias
Informe Día 90 → Madurez del sistema
```

---

*Prompt diseñado siguiendo el modelo mental de Bilawal Sidhu (@bilawalsidhu)*  
*Adaptado para auto-auditoría de proyectos de aprendizaje autodidacta*  
*Versión 1.0 — Mayo 2026*
