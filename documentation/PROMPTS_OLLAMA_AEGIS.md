# 🧠 PROMPTS MANUALES PARA OLLAMA (AEGIS v3.0)
## Sin APIs de pago — Solo LLMs locales en tu Mac M4

---

## 🚀 Setup Inicial (1 vez)

```bash
# En tu Mac M4, instalar Ollama
brew install ollama

# Descargar modelos recomendados (7GB total)
ollama pull llama3.2              # 3B params - ultra rápido
ollama pull mistral               # 7B params - balance
ollama pull codellama:7b          # Especializado en código
ollama pull qwen2.5-coder:7b      # Excelente para programación

# Verificar instalación
ollama list
```

---

## 📋 PROMPT 1: Planificación Diaria Inteligente

### Cuándo usarlo
Cada mañana antes de estudiar (o la noche anterior).

### Prompt (copiar y pegar en Ollama)
```
Eres mi tutor de programación personal. Hoy necesito un plan de estudio optimizado.

**MI CONTEXTO:**
- Nivel actual: [PRINCIPIANTE/INTERMEDIO/AVANZADO - elige uno]
- Fase del plan: [AÑO 1-2 Fundamentos / AÑO 3-4 Pregrado / AÑO 5-6 Seguridad / AÑO 7-8 IA / AÑO 9-10 Maestría]
- Tiempo disponible HOY: [1 hora / 2 horas / 4 horas]
- Energía actual: [BAJA/MEDIA/ALTA]
- Tema que estoy estudiando: [PEGAR TEMA]

**MI EQUIPO:**
- Mac M4 (para teoría, IA local, videos)
- HP Arch Linux (para práctica, código, hacking)

**INSTRUCCIONES:**
Genera un plan con formato ADHD-friendly:

1. **MISIÓN 1** (15 min) - Tarea concreta con emoji
2. **MISIÓN 2** (10 min) - Cambio de actividad para mantener dopamina
3. **MISIÓN 3** (15 min) - Práctica hands-on
4. **DESCANSO** (5 min) - Actividad obligatoria de recuperación
5. **MISIÓN 4** (15-30 min) - Proyecto o integración

Para CADA misión, incluir:
- 🎯 Objetivo específico (una oración)
- 📚 Recurso exacto de las 55 fuentes
- ✅ Criterio de éxito (cómo sé que terminé)
- 🎵 Tipo de música recomendada (Deep Focus/Flow/Alert/Recovery)

**FORMATO:** Lista con checkboxes. Español. Sin explicaciones largas.
```

### Ejemplo de salida esperada
```markdown
⚡ PLAN DE HOY — Nivel: Principiante | Tiempo: 1.5h

- [ ] **MISIÓN 1** (15 min) 📺 Ver CS50x Week 1 (hasta minuto 15)
  - Recurso: cs50.harvard.edu/x/2024/weeks/1/
  - Éxito: Tomar 3 notas en papel
  - 🎵 Deep Focus (40Hz)

- [ ] **MISIÓN 2** (10 min) ⌨️ Copiar código del video
  - Recurso: Replit o VS Code en Mac
  - Éxito: Correr sin errores
  - 🎵 Flow State

- [ ] **MISIÓN 3** (15 min) 🧩 Ejercicio: Modificar código
  - Cambiar una variable, predecir resultado
  - Éxito: Predicción correcta
  - 🎵 Alert Study

- [ ] **DESCANSO** (5 min) ☕ Caminar + respiración
  - OBLIGATORIO — no saltar
  - 🎵 Recovery (5Hz Theta)

- [ ] **MISIÓN 4** (15 min) 📝 Documentar en blog/GitHub
  - Escribir qué aprendí hoy (3 líneas)
  - Éxito: Commit hecho
  - 🎵 Deep Focus
```

---

## 📋 PROMPT 2: Tutor Socrático Estricto

### Cuándo usarlo
Cuando no entiendes un concepto y quieres VERDADERAMENTE entenderlo (no memorizar).

### Prompt
```
Eres un profesor socrático ESTRUCTO. No me des la respuesta. No me des ejemplos de código completos.

**CONCEPTO QUE NO ENTIENDO:** [PEGAR CONCEPTO]

**MI INTENTO DE EXPLICACIÓN:**
[Intenta explicar el concepto con tus palabras, aunque esté mal]

**INSTRUCCIONES:**
1. Si mi explicación tiene errores, señala UN error específico con una pregunta que me haga descubrirlo.
2. No des la respuesta correcta. Solo preguntas guía.
3. Hazme resolver un mini-problema de 2 líneas para verificar que entendí.
4. Si lo resuelvo bien, dame un problema 10% más difícil.
5. Si me equivoco, vuelve al paso 1.

**REGLAS:**
- Máximo 3 preguntas por respuesta tuya.
- Nunca más de 100 palabras por mensaje.
- Sé implacable pero paciente.
- Si pido "dame la respuesta", responde: "No. Intenta de nuevo."

**FORMATO:**
Pregunta 1: [?]
Pregunta 2: [?]
Pregunta 3: [?]

Mini-problema: [descripción de 1 línea]
```

### Ejemplo de diálogo
**Tú:** "Creo que los punteros en C son variables que guardan el valor de otra variable"

**Ollama:** 
```
Pregunta 1: Si un puntero guarda el "valor", ¿por qué usamos & para obtenerlo?
Pregunta 2: ¿Qué operador usamos para acceder al valor APUNTADO, no al guardado?
Pregunta 3: Si int x = 5; int *p = &x; ¿cuántos bytes ocupa p vs cuántos ocupa x?

Mini-problema: Escribe en papel (sin compilar) qué imprime:
int a = 10;
int *p = &a;
printf("%d", *p + 1);
```

---

## 📋 PROMPT 3: Auditoría de Código (Sentinel Local)

### Cuándo usarlo
Antes de hacer commit de cualquier código. Reemplaza "code review" de un humano.

### Prompt
```
Eres un code reviewer de Google. Audita este código sin piedad.

**LENGUAJE:** [Python/C/JavaScript/otro]

**CÓDIGO:**
```
[PEGAR CÓDIGO]
```

**CONTEXTO:**
- Propósito del código: [1 línea]
- Nivel de complejidad esperada: [básico/intermedio/avanzado]

**AUDITORÍA REQUERIDA:**

🔴 **CRÍTICO** (Bugs/Security)
- [ ] Identificar bugs lógicos
- [ ] Vulnerabilidades de seguridad
- [ ] Race conditions
- [ ] Memory leaks (si aplica)

🟠 **ALTO** (Calidad)
- [ ] Violaciones de principios SOLID
- [ ] Código duplicado
- [ ] Nombres poco claros
- [ ] Falta de manejo de errores

🟡 **MEDIO** (Performance)
- [ ] Algoritmos ineficientes O(n²) cuando puede ser O(n)
- [ ] Operaciones bloqueantes
- [ ] Uso innecesario de memoria

🟢 **BAJO** (Style)
- [ ] Formato inconsistente
- [ ] Falta de comentarios en código complejo

**FORMATO DE RESPUESTA:**
```
🔴 CRÍTICO: [Cantidad]
- [Descripción corta] Línea [X]
- [Descripción corta] Línea [Y]

🟠 ALTO: [Cantidad]
...

🟡 MEDIO: [Cantidad]
...

🟢 BAJO: [Cantidad]
...

💡 SUGERENCIA TOP 1: [La más importante a arreglar]
```

**RESTRICCIÓN:** No reescribas el código completo. Solo indica qué cambiar.
```

---

## 📋 PROMPT 4: Generador de Podcast de Estudio

### Cuándo usarlo
Cuando terminas una sesión y quieres un resumen para escuchar caminando/conduciendo.

### Prompt
```
Genera un guion de podcast de 10 minutos para repasar lo que acabo de estudiar.

**TEMA ESTUDIADO HOY:** [PEGAR TEMA]

**RECURSOS CONSULTADOS:**
- [Fuente 1]
- [Fuente 2]

**CONCEPTOS CLAVE APRENDIDOS:**
- [Concepto 1]
- [Concepto 2]
- [Concepto 3]

**DUDAS QUE TODAVÍA TENGO:**
- [Duda 1]

**INSTRUCCIONES:**

Estructura del podcast (guion para que YO lo grabe):

1. **INTRO (1 min)** — Gancho interesante sobre por qué este tema importa
2. **CONCEPTO 1 (2 min)** — Explicación con analogía cotidiana
3. **CONCEPTO 2 (2 min)** — Conexión con lo que ya sabía
4. **CONCEPTO 3 (2 min)** — Ejemplo práctico con código (si aplica)
5. **DUDA RESUELTA (2 min)** — Respuesta a mi duda de arriba
6. **TAKEAWAY (1 min)** — Frase memorable para recordar todo

**FORMATO:**
Guion completo con indicaciones de tono:
- [NORMAL] texto
- [ÉNFASIS] **texto importante**
- [PAUSA] ...
- [SONRISA] tono ligero

**IDIOMA:** Español natural, como si lo explicaras a un amigo.
```

---

## 📋 PROMPT 5: Conexión de Conceptos (Análisis de Patrones)

### Cuándo usarlo
Cuando sientes que estás aprendiendo "islas" de conocimiento sin conexión.

### Prompt
```
Estoy aprendiendo [TEMA NUEVO] pero quiero entender cómo se conecta con todo lo demás.

**CONCEPTOS QUE YA DOMINO:**
1. [Concepto A] — nivel: [básico/intermedio/avanzado]
2. [Concepto B] — nivel: [básico/intermedio/avanzado]
3. [Concepto C] — nivel: [básico/intermedio/avanzado]

**TEMA NUEVO:** [TEMA]

**OBJETIVO:**
Entender las conexiones, no solo el tema aislado.

**GENERA:**

1. **MAPA DE CONEXIONES**
   Dibuja (en texto ASCII) cómo se conecta el tema nuevo con los 3 conceptos previos.
   Indica la "fuerza" de la conexión: (fuerte) --- (media) - - - (débil) . . .

2. **ANALOGÍA UNIFICADORA**
   Una analogía que incluya los 4 conceptos juntos.

3. **PROYECTO MINI**
   Descripción de un proyecto de 1 hora que use los 4 conceptos.
   (No código, solo descripción de qué haría)

4. **PRINCIPIO SUBYACENTE**
   ¿Qué principio fundamental de CS une todos estos conceptos?
   (Ej: "abstracción", "separación de concerns", "composición", etc.)

**FORMATO:**
Visual y conciso. Máximo 300 palabras.
```

---

## 📋 PROMPT 6: Debugging Conceptual (Cuando estás atascado)

### Cuándo usarlo
Llevas 20+ minutos atascado en el mismo error/concepto.

### Prompt
```
Estoy atascado en [CONCEPTO/ERROR]. Llevo [X] minutos sin progresar.

**MI INTENCIÓN (qué quería hacer):**
[Describir lo que intentabas lograr]

**LO QUE PASÓ:**
[Error exacto o confusión exacta]

**LO QUE INTENTÉ:**
1. [Intento 1] → Resultado: [qué pasó]
2. [Intento 2] → Resultado: [qué pasó]

**INSTRUCCIONES:**

Explica el concepto de 3 formas diferentes:

1. **ANALOGÍA FÍSICA/CONCRETA**
   Usa objetos de la vida real. Nada de computadoras.

2. **PSEUDOCÓDIGO PASO A PASO**
   Sin sintaxis real. Solo lógica pura.

3. **DIAGRAMA EN TEXTO**
   Usa caracteres ASCII para mostrar flujo/estructura.

Luego dame un problema PARALELO (misma estructura, diferente contexto) para verificar que entendí.

**RESTRICCIÓN:**
- No uses jerga técnica sin explicarla.
- Si usas un término nuevo, ponlo entre **negritas** y defínelo en 5 palabras.
```

---

## 🎯 WORKFLOW DIARIO RECOMENDADO

### Mañana (5 min)
1. Abrir AEGIS v3.0
2. Click en Exportar Backup (automático diario)
3. Abrir terminal → `ollama run llama3.2`
4. Pegar **PROMPT 1** (Planificación)
5. Copiar plan a AEGIS (o papel)

### Durante estudio
6. Usar **PROMPT 2** cuando no entiendas algo
7. Usar **PROMPT 3** antes de cada commit
8. Completar micro-misiones en AEGIS

### Final del día (5 min)
9. Usar **PROMPT 4** para crear podcast de repaso
10. Grabarte a ti mismo (voice memo) explicando lo que aprendiste
11. Marcar daily tasks en AEGIS

### Fin de semana
12. Usar **PROMPT 5** para conectar conceptos de la semana
13. Revisar logros desbloqueados en AEGIS

---

## 💾 GUARDAR ESTOS PROMPTS

Copia este archivo a tu Mac M4 en:
```
~/Documents/AEGIS/prompts/
```

O mejor aún, crea un snippet en VS Code/Code:
- **Mac:** `Cmd + Shift + P` → "Configure User Snippets"
- Crea snippets para cada prompt con un prefijo corto:
  - `aegis-plan` → Prompt 1
  - `aegis-socratic` → Prompt 2
  - `aegis-audit` → Prompt 3
  - `aegis-podcast` → Prompt 4
  - `aegis-connect` → Prompt 5
  - `aegis-debug` → Prompt 6

---

## 📱 ATAJO RÁPIDO (Automatización)

Crea un script `aegis-prompt` en tu Mac:

```bash
#!/bin/bash
# ~/bin/aegis-prompt

PROMPT_TYPE=$1

case $PROMPT_TYPE in
  plan)
    cat ~/Documents/AEGIS/prompts/plan.txt | pbcopy
    echo "Prompt de planificación copiado al clipboard"
    ;;
  socratic)
    cat ~/Documents/AEGIS/prompts/socratic.txt | pbcopy
    echo "Prompt socrático copiado"
    ;;
  audit)
    cat ~/Documents/AEGIS/prompts/audit.txt | pbcopy
    echo "Prompt de auditoría copiado"
    ;;
  *)
    echo "Uso: aegis-prompt [plan|socratic|audit|podcast|connect|debug]"
    ;;
esac
```

Uso:
```bash
aegis-prompt plan
# Luego Cmd+V en Ollama
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Instalar Ollama en Mac M4
- [ ] Descargar llama3.2 y mistral
- [ ] Probar Prompt 1 (Planificación)
- [ ] Guardar estos prompts en archivo accesible
- [ ] Crear snippets en VS Code (opcional pero recomendado)
- [ ] Usar al menos 1 prompt por día de estudio

---

> *"El mejor prompt es el que usas. No busques el perfecto, busca el que funcione para ti."*
