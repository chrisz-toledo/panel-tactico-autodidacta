# 🎧 PROMPT MAESTRO — AudioClase Integral de las 69 Fuentes

**Para usar en:** NotebookLM (https://notebooklm.google.com/notebook/0de9d4ed-aebc-4359-89f1-c0d8227718a2)

---

## 📋 INSTRUCCIONES DE USO

1. Copia el prompt de la siguiente sección
2. Pégalo en el chat de NotebookLM
3. Especifica qué "sesión" o tema quieres (ej: "Sesión 1: Fundamentos de CS50")
4. NotebookLM generará el guion completo
5. Usa el botón "Generate Audio" para crear el podcast

---

## 🎯 PROMPT MAESTRO (Copiar y Pegar)

```markdown
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🎧 AUDIOCLASE MAESTRA — BIBLIOTECA V6.0                    ║
║                        Generador de Podcast Educativo                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

CONTEXTO DEL ESTUDIANTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nivel: Principiante-Intermedio en Ciencias de la Computación
• Background: Autodidacta, estudiando de forma independiente
• Equipos: Mac M4 (teoría) + HP Arch Linux (práctica/"Trinchera")
• Tiempo disponible: 1.5-2 horas diarias de estudio
• Objetivo: Dominar programación, ciberseguridad e IA en 10 años
• Estilo de aprendizaje: Necesita analogías cotidianas, conexiones conceptuales
• Fuentes activas: 69 documentos en esta biblioteca

MISIÓN PARA NOTEBOOKLM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Genera un guion COMPLETO para una "AUDIOCLASE" de 15-20 minutos que integre 
conocimientos de las 69 fuentes documentales disponibles en esta biblioteca.

ESTRUCTURA OBLIGATORIA DEL PODCAST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 [00:00-01:00] APERTURA — EL GANCHO
───────────────────────────────────────────────────────────────────────────────
• Frase de apertura impactante relacionada con algo cotidiano
• Conectar el tema técnico con experiencia diaria del oyente
• Establecer por qué ESTE concepto importa hoy
• Ejemplos de ganchos efectivos:
  - "¿Alguna vez te has preguntado qué pasa cuando presionas el botón de encendido de tu computadora?"
  - "Hoy vamos a entender por qué Netflix nunca se 'cae' como otros servicios"
  - "Vamos a descubrir por qué tu banco confía más en Linux que en Windows"

📚 [01:00-08:00] NÚCLEO CONCEPTUAL — LA CLASE
───────────────────────────────────────────────────────────────────────────────

Diseñar como narrativa progresiva con 3 ACTOS:

ACTO I — EL PROBLEMA (01:00-03:30)
• Presentar el problema real que resuelve el concepto
• Usar analogía de la vida cotidiana (obligatorio)
• Ejemplos de analogías permitidas:
  - 🍳 Cocina/Recetas = Algoritmos y procesos
  - 🚗 Autos/Tráfico = Redes y protocolos
  - 🏋️ Gym/Deporte = Optimización y rendimiento
  - 🎵 Música/Playlists = Estructuras de datos
  - 🏠 Arquitectura/Casas = Diseño de sistemas
  - 📦 Organización/Almacén = Memoria y storage
  - 🎮 Videojuegos = Lógica y estados
  - 🧩 Puzzles/Rompecabezas = Debugging

ACTO II — LA SOLUCIÓN TÉCNICA (03:30-06:30)
• Explicar el concepto técnico CONCRETO
• Conectar analogía → técnica → aplicación real
• Incluir:
  - Definición precisa pero accesible
  - Cómo funciona paso a paso
  - Por qué se hace de esta manera
  - Qué habría antes de esto (problema histórico)

ACTO III — APLICACIÓN PRÁCTICA (06:30-08:00)
• Caso de uso REAL en industria tech
• Ejemplo específico que el estudiante puede practicar hoy
• Conectar con fuentes prácticas (CS50, OverTheWire, PortSwigger)

🔍 [08:00-11:00] CONEXIONES MAESTRAS
───────────────────────────────────────────────────────────────────────────────

Sección CRÍTICA: Conectar el tema actual con OTROS conceptos de las 69 fuentes.

Ejemplos de conexiones a incluir:
• "Esto que acabamos de ver sobre [X] es la base de lo que verás en [Y] de CS50"
• "La misma lógica aplica cuando hagas [Z] en HackTheBox"
• "Este principio aparece también en [Libro de Arquitectura] cuando hablan de..."
• "Es el fundamento de por qué [Tecnología moderna] funciona así"

Categorías de fuentes a conectar:
┌────────────────────────────────────────────────────────────────┐
│ 🎓 CS50x 2025 (Semanas 0-6, Python, Algoritmos)              │
│ 🐍 Python (Oficial, Crash Course, Black Hat, Mouredev)       │
│ 🛡️ Seguridad (OWASP, PortSwigger, HTB, Bandit, Hacking Art)│
│ 🤖 IA/ML (DeepSeek, Prompt Engineering, HuggingFace, Claude) │
│ 🏗️ Arquitectura (Clean Code, System Design, Pragmatic)     │
│ ⚙️ Sistemas (ArchWiki, Linux CLI, C Programming)           │
│ 🐳 DevOps (Docker, Kubernetes)                               │
│ 🗄️ Bases de Datos (PostgreSQL, SQL Antipatterns)            │
│ 🌲 Git y Control de Versiones                                │
│ 📖 Metodología (Thinking in Systems, Code Petzold)         │
└────────────────────────────────────────────────────────────────┘

⚠️ [11:00-13:00] TRAMPAS Y ERRORES COMUNES
───────────────────────────────────────────────────────────────────────────────

• "Cuando veas esto, significa que..."
• 3 errores específicos que cometen principiantes
• Por qué ocurren (explicación técnica breve)
• Cómo evitarlos/detectarlos
• Conectar con debugging (CS50 Bugs & Debugging)
• Conectar con SQL Antipatterns (si aplica bases de datos)

🎯 [13:00-14:30] CHECKPOINT Y AUTOVERIFICACIÓN
───────────────────────────────────────────────────────────────────────────────

• Resumen ejecutivo de 3 puntos CLAVE
• 3 preguntas de autoverificación:
  1. Conceptual: "¿Puedes explicarle esto a alguien que no sabe programar?"
  2. Técnica: "¿Puedes escribir el pseudocódigo de esto?"
  3. Aplicación: "¿Dónde lo usarías en un proyecto real?"

🔮 [14:30-15:30] PRÓXIMOS PASOS — PUENTE
───────────────────────────────────────────────────────────────────────────────

• "Lo que estudiaremos mañana/semana que viene se basa en esto cuando..."
• Preparar mentalmente para el siguiente concepto
• Conectar con roadmap de 10 años (fases 1-8)
• Tarea sugerida para practicar hoy (15-30 min)

═══════════════════════════════════════════════════════════════════════════════
ESTILO Y TONO OBLIGATORIO:
═══════════════════════════════════════════════════════════════════════════════

• [VOCALIZAR INDICACIONES DE TONO]:
  - [NORMAL] → Explicación regular, ritmo conversacional
  - [ÉNFASIS] → Momentos críticos, aumentar volumen/intensidad
  - [PAUSA 3 SEG] → Después de conceptos importantes, para asimilación
  - [DICE EN VOZ ALTA] → Instrucciones para que el estudiante repita
  - [SUSURRO] → Anécdotas, curiosidades, momentos de "insider info"

• Tono general: 
  - Mentor experimentado explicando caminando con el estudiante
  - Profesional pero completamente accesible
  - Usar "tú" y "nosotros" (inclusivo)
  - NUNCA condescendiente, SIEMPRE empático con la dificultad del tema

• Lenguaje:
  - Primero analogía COMPLETA, luego mapeo técnico
  - Definir TODO término técnico nuevo en máximo 10 palabras
  - Usar metáforas sensoriales: "imagina que...", "sientes como..."

═══════════════════════════════════════════════════════════════════════════════
INTEGRACIÓN DE FUENTES ESPECÍFICAS:
═══════════════════════════════════════════════════════════════════════════════

DEBES hacer referencia explícita a mínimo 8-12 fuentes de la biblioteca:

1. SIEMPRE conectar con CS50x 2025 cuando sea pertinente
2. SIEMPRE mencionar aplicación práctica (OverTheWire, PortSwigger, HTB)
3. Incluir al menos UNA referencia de:
   - Libro técnico (Clean Code, Architecture Patterns, Hacking Art)
   - Guía práctica (Mouredev, Python Crash Course)
   - Documentación oficial (Python, Docker, PostgreSQL)
   - Recurso de IA (DeepSeek, Prompt Engineering Guide)
   - Material de seguridad (OWASP, Web Security Academy)
   - Arquitectura (System Design, 12-Factor App)
   - Metodología (Thinking in Systems, Pragmatic Programmer)

═══════════════════════════════════════════════════════════════════════════════
FORMATO DE SALIDA:
═══════════════════════════════════════════════════════════════════════════════

Entregar el guion COMPLETO con:

┌────────────────────────────────────────────────────────────────┐
│ TÍTULO DE LA CLASE: [Concepto] — [Analogía Cotidiana]         │
│ DURACIÓN TOTAL: XX minutos                                     │
│ FUENTES PRINCIPALES UTILIZADAS: [Lista de 8-12 fuentes]       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [00:00] SECCIÓN: [Nombre]                                     │
│ [TONO: X]                                                     │
│ Guion literal: "..."                                          │
│                                                                │
│ [XX:XX] SECCIÓN: [Nombre]                                     │
│ ...                                                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘

BONUS: Al final, incluir:
• 3 prompts de seguimiento para Gemini/Claude
• Recursos específicos a revisar en las 69 fuentes
• Ejercicio práctico con tiempo estimado

═══════════════════════════════════════════════════════════════════════════════
SESIÓN ESPECÍFICA A GENERAR:
═══════════════════════════════════════════════════════════════════════════════

[EL ESTUDIANTE ESPECIFICA AQUÍ:
- Número de sesión (1-52 semanas)
- Tema específico de interés
- Fuentes que ha estado estudiando recientemente
- Concepto que le cuesta más trabajo
- Área de foco: ¿Programación / Seguridad / IA / Arquitectura?
]

Ejemplo: 
"Genera la AudioClase para la Semana 3 de mi estudio: 
Arrays en C (CS50 Week 2). He estado viendo cómo funcionan 
los punteros pero no termino de entender la relación con memoria."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📝 EJEMPLOS DE SOLICITUDES ESPECÍFICAS

### Ejemplo 1: Semana Inicial (Fundamentos)

```
Genera AudioClase para Sesión 1:
- Tema: Pensamiento computacional y Scratch (CS50 Week 0)
- Contexto: Nunca he programado, vengo de carrera no técnica
- Objetivo: Entender qué es "pensar como computadora"
- Incluir: Conexión con cómo funciona un LLM (DeepSeek fuente)
```

### Ejemplo 2: Semana Intermedia (Python)

```
Genera AudioClase para Sesión 8:
- Tema: Funciones en Python (CS50P Week 2)
- Contexto: Ya sé variables y condicionales, atorado en funciones
- Dificultad: No entiendo cuándo usar return vs print
- Incluir: Conexión con arquitectura limpia (Clean Code fuente)
```

### Ejemplo 3: Fase Seguridad

```
Genera AudioClase para Sesión 20:
- Tema: Vulnerabilidades web básicas (OWASP Top 10)
- Contexto: Terminando fundamentos de Python, empezando seguridad
- Foco: Entender SQL Injection con analogía clara
- Incluir: Conexión con PortSwigger Web Security Academy
```

### Ejemplo 4: Fase Arquitectura

```
Genera AudioClase para Sesión 35:
- Tema: Diseño de sistemas escalables (System Design Primer)
- Contexto: Ya construí APIs básicas con FastAPI
- Dificultad: No entiendo cuando usar caché vs base de datos
- Incluir: 12-Factor App y Designing Data-Intensive Applications
```

---

## 🎨 CATEGORÍAS DE AUDIOCLASES PRE-DISEÑADAS

### Tipo A: Fundamentos CS (Semanas 1-12)
**Fuentes principales:** CS50x 2025, CS50P, Python Oficial, Mouredev
**Estilo:** Analogías visuales, juegos, conceptos cotidianos
**Duración:** 12-15 minutos

### Tipo B: Python Avanzado (Semanas 13-20)
**Fuentes principales:** Python Crash Course, Architecture Patterns, FastAPI
**Estilo:** Casos prácticos, construcción de proyectos
**Duración:** 15-18 minutos

### Tipo C: Seguridad (Semanas 21-40)
**Fuentes principales:** OWASP, PortSwigger, Hacking Art of Exploitation, HTB
**Estilo:** Narrativa de "caza", mindset de atacante/defensor
**Duración:** 18-20 minutos

### Tipo D: IA/ML (Semanas 41-60)
**Fuentes principales:** DeepSeek, HuggingFace, Prompt Engineering Guide
**Estilo:** Explicación de conceptos abstractos con visualizaciones mentales
**Duración:** 15-18 minutos

### Tipo E: Arquitectura (Semanas 61-80)
**Fuentes principales:** System Design Primer, Clean Architecture, DDIA
**Estilo:** Casos de estudio de sistemas reales (Netflix, Uber, etc.)
**Duración:** 18-22 minutos

### Tipo F: Especialización (Semanas 81+)
**Fuentes principales:** Combinación avanzada según especialidad elegida
**Estilo:** Deep dives técnicos, papers recientes, práctica intensiva
**Duración:** 20-25 minutos

---

## 🎯 PROMPTS DE SEGUIMIENTO PARA GEMINI/CLAUDE

Al final de cada AudioClase, NotebookLM debe generar estos 3 prompts:

### Prompt 1: Tutor Socrático Específico
```
Actúa como tutor socrático sobre [TEMA DE LA CLASE]. 
Acabo de escuchar la AudioClase y mi entendimiento actual es:
[Estudiante escribe su explicación]

Identifica qué estoy entendiendo mal y hazme 3 preguntas 
guía progresivas (detectar → cuestionar → reconstruir).
NO me des la respuesta correcta.
```

### Prompt 2: Ejercicio Práctico
```
Dame 3 ejercicios prácticos sobre [TEMA DE LA CLASE]:
1. Fácil (5 min) - Para confirmar entendimiento básico
2. Medio (15 min) - Para aplicar el concepto
3. Difícil (30 min) - Para integrar con otros conceptos

Incluye casos de prueba y validación para cada uno.
```

### Prompt 3: Debugging Challenge
```
Aquí hay un código con errores comunes relacionados con [TEMA]:
[código con errores intencionales]

Sin darme la solución, guíame con preguntas para que 
YO encuentre los errores y los corrija.
```

---

## 📊 CHECKLIST DE CALIDAD DEL PODCAST

Antes de considerar el guion completo, verificar:

- [ ] ¿Incluye gancho con analogía cotidiana en primer minuto?
- [ ] ¿Define términos técnicos en ≤10 palabras?
- [ ] ¿Tiene mínimo 8-12 referencias a fuentes de la biblioteca?
- [ ] ¿Conecta el tema con CS50x cuando aplica?
- [ ] ¿Menciona práctica en OverTheWire/PortSwigger/HTB?
- [ ] ¿Incluye indicaciones de tono [NORMAL]/[ÉNFASIS]/[PAUSA]?
- [ ] ¿Tiene sección de errores comunes con ejemplos específicos?
- [ ] ¿Incluye 3 preguntas de autoverificación al final?
- [ ] ¿Prepara para el siguiente concepto (puente)?
- [ ] ¿Duración está entre 15-20 minutos de lectura?

---

## 🚀 FLUJO DE TRABAJO COMPLETO

### Día de Estudio Tipo:

```
08:00 — Seleccionar fuente en AEGIS v5
08:05 — Copiar este Prompt Maestro en NotebookLM
08:10 — Especificar sesión/tema en el prompt
08:15 — NotebookLM genera guion (2-3 min)
08:20 — Revisar guion, ajustar si necesario
08:25 — Click "Generate Audio" en NotebookLM
08:30 — 🎧 ESCUCHAR AUDIOCLASE durante:
        • Caminata matutina
        • Preparando desayuno
        • Commute/trayecto
09:00 — Sentarse a estudiar con el material base
        (referencias ya están frescas por el audio)
10:30 — Descanso: Revisar ejercicios generados por NotebookLM
```

---

## 💡 TIPS PARA MÁXIMO APROVECHAMIENTO

1. **Escuchar antes de leer:** El audio prepara el cerebro para el material
2. **Notas de voz:** Después de escuchar, graba un voice memo explicando lo que entendiste
3. **Repetición espaciada:** Vuelve a escuchar la misma AudioClase 2 días después
4. **Contexto variado:** Escucha en diferentes contextos (caminata, gym, transporte)
5. **Compartir:** Explica a alguien más lo que escuchaste (refuerzo Feynman)

---

## 📁 GUARDA ESTE PROMPT

Copia este archivo a tu **NotebookLM** como fuente permanente, así puedes:
- Generar AudioClases bajo demanda
- Comparar explicaciones de diferentes fuentes
- Construir biblioteca de podcasts personalizados

---

*Última actualización: Mayo 2026*
*Versión: 1.0 — Maestro de AudioClases*
