# 🗓️ AGENDA DE IMPLEMENTACIÓN — Features Kitbashing Emergentes
## Metodología: Análisis Multidimensional → Implementación Real → Verificación → Documentación

**Fecha de inicio:** Mayo 2026  
**Estado:** Fase 0 (Preparación)  
**Próxima fase:** FASE 1 — Ritmo Circadiano Adaptativo

---

## 📋 REGLAS DE LA AGENDA

1. **NO MOCKS/STUBS**: Cada implementación debe ser funcional 100%
2. **VERIFICACIÓN ANTES DE CONTINUAR**: Cada fase debe pasar pruebas reales antes de pasar a la siguiente
3. **DOCUMENTACIÓN EN TIEMPO REAL**: Documentar uso mientras se implementa, no después
4. **ANÁLISIS MULTIDIMENSIONAL**: Cada feature analizada desde:
   - Perspectiva técnica (código)
   - Perspectiva pedagógica (aprendizaje)
   - Perspectiva UX (usuario)
   - Perspectiva de mantenimiento (futuro)

---

## 🎯 FASE 1: RITMO CIRCADIANO ADAPTATIVO
**Duración estimada:** 3-4 horas  
**Dependencias:** Ninguna (usa estado actual de BIBLIOTECA)  
**Complejidad:** Media

### 1.1 ANÁLISIS MULTIDIMENSIONAL (30 min)

#### Perspectiva Técnica:
- **Input necesario:** Hora actual (`new Date().getHours()`), energía reportada por usuario (1-10), dificultad de fuentes
- **Output esperado:** Fuente óptima sugerida + explicación del porqué
- **Almacenamiento:** Nuevo campo `STATE.energyLog` para tracking de patrones
- **Algoritmo:** Reglas ponderadas, no ML complejo (mantener simplicidad)

#### Perspectiva Pedagógica:
- **Ciencia aplicada:** Cronobiología del aprendizaje (prefrontal cortex más activo 9am-12pm)
- **Objetivo:** Maximizar retención estudiando temas difíciles en momento óptimo
- **Riesgo:** Usuario podría ignorar sugerencias si no hay "gamificación" apropiada

#### Perspectiva UX:
- **Dónde mostrar:** Widget en sidebar "⏰ Sugerencia del momento"
- **Feedback visual:** Color según "match" (verde=óptimo, amarillo=aceptable, rojo=subóptimo)
- **Control usuario:** Permitir "forzar" otra categoría, pero mostrar advertencia suave

#### Perspectiva Mantenimiento:
- **Configurabilidad:** Horarios ajustables (no todos son morning persons)
- **Extensibilidad:** Futuro podría integrar con wearables (Apple Watch, etc.)
- **Fallback:** Si no hay datos de energía, usar hora solamente

### 1.2 DISEÑO DE DATOS (20 min)

```javascript
// Nuevo estado a agregar a DEFAULT_STATE
energyProfile: {
  morningPerson: true,  // configurable por usuario
  peakHours: [9, 10, 11],  // horas de máxima energía cognitiva
  lowEnergyHours: [22, 23, 0, 1],  // horas de baja energía
  lastReportedEnergy: null,  // 1-10, null si no reportado hoy
  energyHistory: []  // array de {date, energy, sourceStudied}
}

// Mapeo de dificultad por categoría (hardcodeado inicialmente)
const CATEGORY_DIFFICULTY = {
  'cs50': 'high',      // Mañana
  'python': 'medium',  // Tarde
  'security': 'high',  // Mañana
  'ai': 'high',        // Mañana
  'architecture': 'medium',  // Tarde
  'systems': 'high',   // Mañana
  'devops': 'low',    // Noche/repaso
  'git': 'low',       // Noche/repaso
  'database': 'medium', // Tarde
  'methodology': 'low' // Noche/repaso
}
```

### 1.3 IMPLEMENTACIÓN REAL (90 min)

#### Paso 1: Agregar estado inicial (15 min)
```javascript
// En DEFAULT_STATE, agregar:
energyProfile: {
  morningPerson: true,
  peakHours: [9, 10, 11],
  lowEnergyHours: [22, 23, 0, 1, 2, 3, 4, 5, 6],
  lastReportedEnergy: null,
  energyHistory: []
}
```

#### Paso 2: Función de sugerencia (30 min)
```javascript
function getCircadianSuggestion() {
  const hour = new Date().getHours();
  const energy = STATE.energyProfile.lastReportedEnergy;
  const pending = getPendingSources();
  
  // Lógica de matching
  const isPeakTime = STATE.energyProfile.peakHours.includes(hour);
  const isLowTime = STATE.energyProfile.lowEnergyHours.includes(hour);
  
  let targetDifficulty;
  if (isPeakTime || (energy && energy > 7)) targetDifficulty = 'high';
  else if (isLowTime || (energy && energy < 4)) targetDifficulty = 'low';
  else targetDifficulty = 'medium';
  
  // Encontrar match
  return pending.find(s => 
    CATEGORY_DIFFICULTY[s.category] === targetDifficulty
  ) || pending[0]; // fallback
}
```

#### Paso 3: UI de reporte de energía (30 min)
- Slider 1-10 en sidebar
- Botón "Reportar energía ahora"
- Visualización del último reporte

#### Paso 4: Widget de sugerencia (15 min)
- Card en sidebar mostrando sugerencia actual
- Badge de "óptimo", "aceptable", "subóptimo"
- Botón "Seleccionar esta fuente"

### 1.4 VERIFICACIÓN Y PRUEBAS (40 min)

#### Prueba 1: Funcionalidad básica (15 min)
```
Acción: Abrir AEGIS a las 10:00 AM
Esperado: Sugerir fuente 'high' (CS50, Security, AI)
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 2: Reporte de energía (15 min)
```
Acción: Reportar energía = 3 (baja)
Esperado: Sugerir fuente 'low' o 'medium' (Git, DevOps, Methodology)
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 3: Persistencia (10 min)
```
Acción: Recargar página después de reportar energía
Esperado: Energía reportada se mantiene
Resultado: [ ] PASS / [ ] FAIL
```

### 1.5 DOCUMENTACIÓN DE USO (20 min)

Crear sección en documentación:
```markdown
## Ritmo Circadiano Adaptativo — Guía de Uso

### Para empezar:
1. Abre AEGIS en tu hora habitual de estudio
2. Reporta tu nivel de energía (1-10) en el slider del sidebar
3. Observa la sugerencia de fuente en "⏰ Sugerencia del momento"

### Interpretar sugerencias:
- 🟢 ÓPTIMO: Fuente alineada con tu cronotipo y energía
- 🟡 ACEPTABLE: Fuente estudi-able pero no ideal
- 🔴 SUBÓPTIMO: Considera cambiar hora o tomar descanso

### Configuración avanzada:
- Edita `energyProfile` en localStorage para personalizar horarios
- Si eres "night owl", cambia `morningPerson: false` y ajusta `peakHours`
```

### 1.6 CRITERIO DE PASO A FASE 2

- [ ] Todas las pruebas pasan
- [ ] Documentación completa
- [ ] Usuario (tú) prueba y valida que las sugerencias tienen sentido
- [ ] Código comentado y limpio

---

## 🎯 FASE 2: KITBASHING CHALLENGES
**Duración estimada:** 4-5 horas  
**Dependencias:** FASE 1 completada  
**Complejidad:** Alta (lógica de combinación)

### 2.1 ANÁLISIS MULTIDIMENSIONAL (45 min)

#### Perspectiva Técnica:
- **Problema:** Generar combinaciones significativas (no aleatorias) de 2 fuentes
- **Input:** BIBLIOTECA completa + categorías + completadas
- **Output:** Challenge específico: "Combina [Fuente A] + [Fuente B] en proyecto X"
- **Algoritmo:** Grafo de conexiones + selección ponderada por "interesancia"

#### Perspectiva Pedagógica:
- **Teoría:** Transferencia de aprendizaje (aplicar conocimiento A en contexto B)
- **Objetivo:** Desarrollar creatividad técnica y síntesis conceptual
- **Riesgo:** Challenges demasiado difíciles pueden frustrar; muy fáciles aburren

#### Perspectiva UX:
- **Dónde:** Botón "🧩 Kitbashing Challenge" en sidebar
- **Frecuencia:** Sugerir 1 por semana (no saturar)
- **Recompensa:** XP extra + badge especial + guardar proyecto en portfolio

#### Perspectiva Mantenimiento:
- **Escalabilidad:** Sistema debe permitir agregar nuevas "conexiones" fácilmente
- **Historial:** Guardar challenges completados para evitar repetición
- **Calidad:** Validar que challenges generados son realmente factibles

### 2.2 DISEÑO DE DATOS (30 min)

```javascript
// Grafo de conexiones valiosas (kitbashing válido)
const KITBASHING_GRAPH = {
  'cs50': {
    connectsWith: ['security', 'systems', 'python'],
    projectTemplates: [
      "Implementa {cs50_topic} usando {security_tool}",
      "Visualiza {cs50_algorithm} en {systems_context}"
    ]
  },
  'security': {
    connectsWith: ['python', 'systems', 'architecture'],
    projectTemplates: [
      "Crea herramienta de {security_topic} automatizada con {python_lib}",
      "Audita {architecture_system} buscando {security_vulnerability}"
    ]
  },
  'ai': {
    connectsWith: ['python', 'architecture', 'methodology'],
    projectTemplates: [
      "Construye pipeline de {ai_topic} para {architecture_component}",
      "Aplica {ai_technique} a problema de {methodology_topic}"
    ]
  }
  // ... etc
};

// Estado para tracking
kitbashingState: {
  lastChallengeDate: null,  // ISO date
  completedChallenges: [],  // array de {sourceA, sourceB, project, date}
  currentChallenge: null    // challenge activo o null
}
```

### 2.3 IMPLEMENTACIÓN REAL (2.5 horas)

#### Paso 1: Grafo de conexiones (45 min)
- Definir KITBASHING_GRAPH completo para todas las categorías
- Validar que cada conexión tiene sentido real
- Agregar templates de proyectos por conexión

#### Paso 2: Generador de challenges (45 min)
```javascript
function generateKitbashingChallenge() {
  // Seleccionar fuente A completada
  const completed = STATE.completedSources;
  if (completed.length < 2) return null; // Necesita mínimo 2 fuentes
  
  // Elegir aleatoriamente entre completadas recientes (últimas 5)
  const recentCompleted = completed.slice(-5);
  const sourceAId = recentCompleted[Math.floor(Math.random() * recentCompleted.length)];
  const sourceA = BIBLIOTECA.find(s => s.id === sourceAId);
  
  // Encontrar conexiones válidas
  const connections = KITBASHING_GRAPH[sourceA.category]?.connectsWith || [];
  
  // Elegir categoría B
  const targetCategory = connections[Math.floor(Math.random() * connections.length)];
  
  // Encontrar fuente B en esa categoría (preferiblemente completada)
  const sourceB = BIBLIOTECA.find(s => 
    s.category === targetCategory && 
    s.id !== sourceAId
  );
  
  // Generar proyecto usando template
  const templates = KITBASHING_GRAPH[sourceA.category].projectTemplates;
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    sourceA: sourceA,
    sourceB: sourceB,
    project: template
      .replace('{cs50_topic}', sourceA.name)
      .replace('{security_tool}', sourceB.name)
      // ... más replacements
  };
}
```

#### Paso 3: UI de Challenge (45 min)
- Modal de "Nuevo Kitbashing Challenge"
- Mostrar fuente A + fuente B + proyecto generado
- Botón "Aceptar Challenge" / "Rechazar (generar otro)"
- Input para describir cómo lo resolverías

#### Paso 4: Sistema de completado (15 min)
- Guardar challenge en `completedChallenges`
- Otorgar XP extra (200 XP vs 100 normal)
- Agregar a portfolio visual

### 2.4 VERIFICACIÓN Y PRUEBAS (60 min)

#### Prueba 1: Generación válida (20 min)
```
Acción: Completar 2 fuentes de categorías diferentes, luego generar challenge
Esperado: Challenge que conecta ambas categorías de forma lógica
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 2: Anti-repetición (20 min)
```
Acción: Generar challenge, completarlo, generar otro
Esperado: Segundo challenge es diferente al primero
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 3: Guardado en portfolio (20 min)
```
Acción: Completar challenge, revisar STATE.kitbashingState.completedChallenges
Esperado: Challenge guardado con fecha y descripción
Resultado: [ ] PASS / [ ] FAIL
```

### 2.5 DOCUMENTACIÓN DE USO (30 min)

```markdown
## Kitbashing Challenges — Guía de Uso

### Qué es:
Desafíos que te obligan a combinar 2 fuentes aparentemente no relacionadas en un proyecto coherente.

### Cómo funciona:
1. Cada semana se genera un challenge automáticamente (máximo 1 semanal)
2. El sistema elige una fuente que ya completaste + otra de categoría relacionada
3. Genera un proyecto que requiere aplicar ambas

### Ejemplo real:
- Fuente A: "Arrays en C" (CS50)
- Fuente B: "Docker" (DevOps)
- Challenge: "Crea un visualizador de memoria en contenedores que muestre cómo Docker asigna arrays de recursos"

### Recompensas:
- 200 XP (doble de una fuente normal)
- Badge "Kitbasher" especial
- Proyecto guardado en tu portfolio

### Reglas:
- Mínimo 2 fuentes completadas para desbloquear
- Puedes rechazar 1 challenge por semana si no te gusta
- Debes escribir breve descripción de tu solución antes de marcar completado
```

### 2.6 CRITERIO DE PASO A FASE 3

- [ ] Challenges generados son factibles y creativos
- [ ] No se repiten challenges recientes
- [ ] Usuario valida que 3 challenges consecutivos tienen sentido
- [ ] Sistema de portfolio funciona

---

## 🎯 FASE 3: TRILOGÍA NARRATIVA
**Duración estimada:** 5-6 horas  
**Dependencias:** FASE 1 y 2 completadas  
**Complejidad:** Muy alta (integración de múltiples sistemas)

### 3.1 ANÁLISIS MULTIDIMENSIONAL (60 min)

#### Perspectiva Técnica:
- **Concepto:** Conectar AudioClase diaria → Síntesis semanal → Challenge mensual en arco narrativo
- **Input:** Historial de AudioClases generadas, SRS completados, Challenges aceptados
- **Output:** Narrativa coherente que muestra "tu historia de aprendizaje"
- **Complejidad:** Alta, requiere correlacionar datos de múltiples fuentes

#### Perspectiva Pedagógica:
- **Teoría:** Elaboración narrativa (narrative elaboration) para retención de largo plazo
- **Objetivo:** Usuario ve su progreso como "viaje del héroe", no como lista de tareas
- **Riesgo:** Narrativa forzada puede sonar artificial; debe ser auténtica

#### Perspectiva UX:
- **Dónde:** Vista "Mi Historia" separada (nueva pestaña/section)
- **Timeline visual:** Gráfica de progreso con hitos
- **Exportación:** Opción de exportar narrativa como PDF/blog post

#### Perspectiva Mantenimiento:
- **Datos:** Requiere almacenar metadata de AudioClases (actualmente no se guarda)
- **Generación:** Puede usar LLM local (Ollama) para generar texto narrativo
- **Privacidad:** Narrativa es personal, no debe compartirse sin consentimiento

### 3.2 DISEÑO DE DATOS (45 min)

```javascript
// Estructura de Narrativa
narrativeState: {
  weeklySyntheses: [
    {
      weekId: "2026-W20",  // ISO week
      dateRange: "May 11-17",
      sourcesCompleted: [1, 5, 23],  // IDs
      audioclasses: [
        {date: "2026-05-11", topic: "Arrays", insight: "..."},
        {date: "2026-05-13", topic: "Memory", insight: "..."}
      ],
      theme: "Fundamentos de memoria",
      narrative: "Esta semana descubriste cómo...",
      xpGained: 350,
      challengeCompleted: null  // o ID del challenge
    }
  ],
  monthlyArcs: [
    {
      month: "May 2026",
      theme: "De lo básico a lo práctico",
      highlights: [/* refs a weeklySyntheses */],
      narrative: "Mayo marcó tu transición..."
    }
  ]
}

// Agregar a AudioClases generadas:
audioclassHistory: [
  {
    date: "2026-05-16",
    sourceId: 5,
    sourceName: "CS50x Week 2",
    promptUsed: "...",
    userNotes: "..."  // campo opcional para notas del usuario
  }
]
```

### 3.3 IMPLEMENTACIÓN REAL (3.5 horas)

#### Paso 1: Guardar AudioClases (30 min)
- Modificar `generatePrompt('audioclase')` para guardar en `audioclassHistory`
- Agregar campo opcional "Notas" después de generar AudioClase

#### Paso 2: Generador de Síntesis Semanal (60 min)
```javascript
function generateWeeklySynthesis() {
  const weekId = getCurrentWeekId();
  const sourcesThisWeek = getSourcesCompletedThisWeek();
  const audioclassesThisWeek = STATE.audioclassHistory.filter(a => isThisWeek(a.date));
  
  // Detectar tema común
  const categories = sourcesThisWeek.map(s => s.category);
  const dominantCategory = getMostFrequent(categories);
  
  // Generar tema automático
  const themes = {
    'cs50': 'Fundamentos sólidos de CS',
    'security': 'Primeros pasos en ciberseguridad',
    'ai': 'Exploración de IA',
    'mixed': 'Visión interdisciplinaria'
  };
  
  const synthesis = {
    weekId: weekId,
    theme: themes[dominantCategory] || themes['mixed'],
    sourcesCompleted: sourcesThisWeek.map(s => s.id),
    audioclasses: audioclassesThisWeek,
    xpGained: sourcesThisWeek.length * 100,
    generated: new Date().toISOString()
  };
  
  // Guardar
  STATE.narrativeState.weeklySyntheses.push(synthesis);
  return synthesis;
}
```

#### Paso 3: UI de Síntesis (45 min)
- Botón "Generar Síntesis Semanal" (aparece domingos o manual)
- Modal mostrando resumen de la semana
- Vista previa de "narrativa" generada automáticamente
- Opción de editar narrativa manualmente

#### Paso 4: Generador de Arco Mensual (45 min)
- Tomar 4 síntesis semanales
- Detectar progresión (ej: CS50 → Python → Security)
- Generar texto narrativo que conecte las semanas
- Guardar en `monthlyArcs`

#### Paso 5: Vista "Mi Historia" (30 min)
- Nueva sección en UI (tab "📖 Historia")
- Timeline visual con semanas y meses
- Cards expandibles con síntesis detallada
- Exportar a Markdown/PDF

### 3.4 VERIFICACIÓN Y PRUEBAS (60 min)

#### Prueba 1: Generación semanal (20 min)
```
Acción: Completar 2 fuentes esta semana, generar síntesis
Esperado: Síntesis que menciona ambas fuentes y detecta tema común
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 2: Arco mensual (20 min)
```
Acción: Completar síntesis de 4 semanas simuladas, generar arco mensual
Esperado: Narrativa que conecta las 4 semanas en historia coherente
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 3: Persistencia (20 min)
```
Acción: Recargar página, revisar "Mi Historia"
Esperado: Síntesis y arcos se mantienen
Resultado: [ ] PASS / [ ] FAIL
```

### 3.5 DOCUMENTACIÓN DE USO (30 min)

```markdown
## Trilogía Narrativa — Guía de Uso

### Componentes:
1. **AudioClase diaria**: Grabas/memorizas lo estudiado HOY
2. **Síntesis semanal**: Cada domingo (o manual) conectas las AudioClases de la semana
3. **Arco mensual**: Cada mes, las síntesis forman un "capítulo" de tu historia

### Tu Historia:
- Ve a tab "📖 Historia" para ver tu timeline completo
- Exporta tu narrativa como blog post o portafolio
- Cada semana/mes añade una "página" a tu libro de aprendizaje

### Para qué sirve:
- Retención de largo plazo (elaboración narrativa)
- Portfolio verificable de tu progreso
- Motivación: ves tu "viaje del héroe", no solo checkboxes

### Ejemplo de narrativa generada:
"Semana del 11-17 de Mayo: Esta semana descubriste cómo los arrays en C 
son la base de toda estructura de datos. Tu AudioClase del miércoles sobre 
memoria te preparó para entender por qué los buffer overflows son tan 
peligrosos. Conectaste CS50 Week 2 con tu primer vistazo a OWASP Top 10, 
sembrando las semillas de tu futura especialización en seguridad."
```

### 3.6 CRITERIO DE PASO A FASE 4

- [ ] Síntesis semanales generan narrativas coherentes
- [ ] Arcos mensuales conectan semanas lógicamente
- [ ] Vista "Mi Historia" es visualmente atractiva
- [ ] Exportación funciona
- [ ] Usuario reporta valor motivacional real

---

## 🎯 FASE 4: TUTOR BILAWAL (System Prompt Maestro)
**Duración estimada:** 2-3 horas  
**Dependencias:** FASE 3 completada (necesita datos de narrativeState)  
**Complejidad:** Media (integración con prompts existentes)

### 4.1 ANÁLISIS MULTIDIMENSIONAL (30 min)

#### Perspectiva Técnica:
- **Input:** Todo el STATE (progreso, dificultades, ritmo, narrativa)
- **Output:** System Prompt dinámico que NotebookLM/Gemini usa para personalizar respuestas
- **Complejidad:** Media (concatenar strings), pero requiere diseño cuidadoso del prompt

#### Perspectiva Pedagógica:
- **Objetivo:** Respuestas de IA que "conocen" tu situación específica
- **Teoría:** Tutoría adaptativa (adaptive tutoring)
- **Riesgo:** Prompt muy largo puede exceder límites de tokens o confundir al LLM

#### Perspectiva UX:
- **Dónde:** Botón "🎭 Tutor Bilawal" que copia system prompt personalizado
- **Uso:** Pegar como primer mensaje en NotebookLM/Gemini
- **Frecuencia:** Actualizar cada semana o cuando cambia progreso significativamente

#### Perspectiva Mantenimiento:
- **Automatización:** Idealmente se actualiza solo, pero por ahora manual
- **Versión:** Guardar versiones del prompt para tracking

### 4.2 DISEÑO DEL SYSTEM PROMPT (30 min)

```javascript
function generateTutorBilawalPrompt() {
  const completed = STATE.completedSources.length;
  const total = BIBLIOTECA.length;
  const progress = Math.round((completed / total) * 100);
  
  const recentSources = STATE.completedSources
    .slice(-3)
    .map(id => BIBLIOTECA.find(s => s.id === id)?.name)
    .join(', ');
  
  const weakestCategory = detectWeakestCategory();  // categoría con menos completadas
  const weeklyRate = calculateWeeklyRate();  // fuentes por semana
  
  return `Eres el Tutor Bilawal de este estudiante. Contexto completo:

🎯 PERFIL DEL ESTUDIANTE:
- Progreso: ${completed}/${total} fuentes (${progress}%)
- Fuentes recientes completadas: ${recentSources}
- Área más débil: ${weakestCategory}
- Ritmo actual: ${weeklyRate} fuentes/semana
- Objetivo final: Trabajar en Wiz o startup similar (año 10)

📊 CONTEXTO DE APRENDIZAJE:
- Equipos: Mac M4 (teoría) + HP Arch Linux (práctica/"Trinchera")
- Tiempo diario: 1.5-2 horas
- Estilo: Autodidacta, necesita analogías cotidianas
- Sistema: AEGIS v5.0 con SRS, Proof of Work, Interleaving

🎭 TU ROL:
- Mentor experimentado, no profesor académico
- Tono: directo, honesto, sin azúcar
- Usa analogías de cocina, autos, gym, música
- Identifica el "por qué" detrás de cada pregunta
- Conecta cada respuesta con el objetivo final (Wiz)

⚠️ RESTRICCIONES:
- NO des respuestas directas sin explicar el razonamiento
- SI detectas gap conceptual, señálalo explícitamente
- Conecta siempre con fuentes previas del estudiante
- Sugiere próximos pasos específicos del plan de 10 años

Adapta todas tus respuestas considerando este contexto.`;
}
```

### 4.3 IMPLEMENTACIÓN REAL (90 min)

#### Paso 1: Funciones helper (30 min)
- `detectWeakestCategory()`: Analizar STATE.completedSources por categoría
- `calculateWeeklyRate()`: Calcular fuentes/semana basado en fechas de completado

#### Paso 2: Generador de prompt (30 min)
- Implementar `generateTutorBilawalPrompt()` completo
- Agregar a UI botón "🎭 Generar Tutor Bilawal"
- Mostrar prompt generado en modal

#### Paso 3: Instrucciones de uso (15 min)
- Documentar cómo usar el prompt en NotebookLM/Gemini
- Explicar que debe pegarse como primer mensaje
- Sugerir regenerar cada semana

#### Paso 4: Historial de prompts (15 min)
- Guardar en `STATE.tutorBilawalHistory` los prompts generados con fecha
- Permitir ver evolución del tutor a lo largo del tiempo

### 4.4 VERIFICACIÓN Y PRUEBAS (30 min)

#### Prueba 1: Generación correcta (15 min)
```
Acción: Completar 3 fuentes, generar Tutor Bilawal
Esperado: Prompt que menciona exactamente esas 3 fuentes y detecta categoría débil
Resultado: [ ] PASS / [ ] FAIL
```

#### Prueba 2: Uso en NotebookLM (15 min)
```
Acción: Copiar prompt, pegar en NotebookLM, hacer pregunta técnica
Esperado: Respuesta que demuestra conocimiento del contexto del usuario
Resultado: [ ] PASS / [ ] FAIL
```

### 4.5 DOCUMENTACIÓN DE USO (15 min)

```markdown
## Tutor Bilawal — Guía de Uso

### Qué es:
Un System Prompt personalizado que le da a NotebookLM/Gemini TODO el contexto de tu progreso, para que sus respuestas sean hiper-relevantes a TU situación específica.

### Cómo usar:
1. Click en "🎭 Generar Tutor Bilawal" en AEGIS
2. Copia el prompt generado
3. Abre NotebookLM o Gemini
4. Pega como PRIMER mensaje (antes de cualquier pregunta)
5. Ahora tus preguntas tendrán contexto personalizado

### Cuándo regenerar:
- Cada semana (o cuando completes 2+ fuentes nuevas)
- Cuando cambies de "fase" del plan (Año 1→2, 2→3, etc.)
- Si sientes que las respuestas de la IA perdieron "personalidad"

### Qué cambia:
- La IA sabrá qué fuentes ya completaste
- Sugerirá conexiones con tu conocimiento previo
- Adaptará dificultad a tu ritmo actual
- Mantendrá el objetivo final (Wiz) presente
```

### 4.6 CRITERIO DE COMPLETACIÓN TOTAL

- [ ] Prompt genera contexto preciso
- [ ] NotebookLM responde con conocimiento del perfil
- [ ] Historial de prompts se guarda correctamente
- [ ] Documentación clara para usuario

---

## 📊 RESUMEN DE LA AGENDA

| Fase | Duración | Complejidad | Output |
|------|----------|---------------|--------|
| 1. Ritmo Circadiano | 3-4 hrs | Media | Sugerencias de fuentes según hora/energía |
| 2. Kitbashing | 4-5 hrs | Alta | Challenges semanales de combinación |
| 3. Trilogía Narrativa | 5-6 hrs | Muy Alta | Sistema de historial y narrativa |
| 4. Tutor Bilawal | 2-3 hrs | Media | Prompt personalizado contextual |
| **TOTAL** | **14-18 hrs** | | **4 features kitbashing emergentes** |

---

## 🚀 INSTRUCCIONES DE INICIO

1. **Ahora:** Marcar FASE 1 como "in_progress" en TODO list
2. **Iniciar FASE 1** siguiendo pasos 1.1-1.6 exactamente
3. **NO saltar a FASE 2** hasta que FASE 1 pase todas las pruebas
4. **Documentar en tiempo real:** Mientras implementas, actualizar esta agenda con ajustes

**¿Iniciamos FASE 1: Ritmo Circadiano Adaptativo?**
