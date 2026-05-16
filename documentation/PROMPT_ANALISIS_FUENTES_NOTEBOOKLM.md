# 🧠 PROMPT: Análisis de Fuentes para AEGIS

**Para usar en:** Notebook LM (Google)  
**Objetivo:** Analizar todas las fuentes de la biblioteca y extraer metadatos estructurados

---

## 📋 INSTRUCCIONES DE USO

1. **Abre Notebook LM** (notebooklm.google.com)
2. **Crea un nuevo notebook**
3. **Agrega todas las fuentes** de tu biblioteca como documentos fuente
4. **Pega este prompt** en el chat
5. **Pide el formato JSON** al final

---

## 🎯 PROMPT MAESTRO

```
ACTÚA COMO AUDITOR DE CONTENIDO EDUCATIVO

Tu misión es analizar TODAS las fuentes que he subido a este notebook y crear un catálogo estructurado para mi sistema de gestión de aprendizaje AEGIS.

═══════════════════════════════════════════════════════════════════

## 📚 PARA CADA FUENTE, EXTRAE:

### 1. IDENTIFICACIÓN BÁSICA
- **Nombre exacto** de la fuente
- **Tipo**: Curso online | Libro | Documentación | Tutorial | Video | Artículo | CTF/Lab
- **Autor/Organización** (si aplica)
- **URL principal** (verifica que funcione)
- **Formato principal**: Texto | Video | Interactive | Mixto

### 2. CATEGORIZACIÓN TÉCNICA
Clasifica en UNA categoría principal:
- 🎓 **cs50** - Cursos Harvard CS50
- 🐍 **python** - Python y frameworks
- 💻 **bash** - Linux/Shell scripting
- 🤖 **ai** - Machine Learning, LLMs, IA
- 🌐 **web** - Desarrollo web frontend/backend
- 🔒 **security** - Ciberseguridad, hacking ético, CTFs
- 🗄️ **databases** - Bases de datos SQL/NoSQL
- 🌲 **git** - Control de versiones
- 🏗️ **architecture** - Diseño de sistemas, patrones
- 🧠 **methodology** - Metodología, algoritmos, pensamiento
- ⚙️ **systems** - Programación de sistemas, bajo nivel
- 🐳 **devops** - Docker, CI/CD, infraestructura

### 3. CONCEPTOS CLAVE
Lista los 5-10 conceptos técnicos principales que enseña:
Ejemplo: "variables", "loops", "APIs REST", "autenticación JWT", "Docker containers"

### 4. NIVEL DE DIFICULTAD
- 🟢 **Principiante** - No requiere conocimientos previos
- 🟡 **Intermedio** - Requiere bases de programación
- 🔴 **Avanzado** - Requiere experiencia previa
- ⚫ **Experto** - Nivel profesional/especializado

### 5. UTILIDAD TÁCTICA
Describe en 1-2 oraciones:
- Por qué es valioso para un autodidacta de CS
- En qué situación específica se aplica
- Qué problema resuelve

### 6. PREREQUISITOS
Lista conceptos que el estudiante debe saber ANTES de empezar esta fuente.

### 7. DURACIÓN ESTIMADA
- Horas de video (si aplica)
- Número de capítulos/secciones
- Tiempo estimado de completitud

### 8. RECURSOS ADICIONALES
- ¿Tiene ejercicios prácticos?
- ¿Hay proyecto final?
- ¿Certificación al completar?
- ¿Comunidad/foro de soporte?

═══════════════════════════════════════════════════════════════════

## 📝 FORMATO DE SALIDA REQUERIDO

Para cada fuente, entrega en este formato:

```
═══════════════════════════════════════════════════════
FUENTE #[NÚMERO]: [NOMBRE EXACTO]
═══════════════════════════════════════════════════════

📋 BÁSICO:
• Tipo: [tipo]
• Autor: [autor]
• URL: [url verificada]
• Formato: [formato]

🏷️ CATEGORÍA: [categoría con emoji]

🎯 CONCEPTOS CLAVE:
1. [concepto]
2. [concepto]
3. [concepto]
4. [concepto]
5. [concepto]

📊 DIFICULTAD: [nivel con color]

⚡ UTILIDAD TÁCTICA:
[descripción en 1-2 oraciones de valor real]

📚 PREREQUISITOS:
• [prerequisito 1]
• [prerequisito 2]
• [prerequisito 3]

⏱️ DURACIÓN: [X horas | X capítulos]

🛠️ RECURSOS:
• Ejercicios: [Sí/No]
• Proyecto: [Sí/No - descripción breve]
• Certificación: [Sí/No]
• Comunidad: [Sí/No]
```

═══════════════════════════════════════════════════════════════════

## 🔄 ANÁLISIS ADICIONAL REQUERIDO

Además del análisis individual, proporciona:

### 1. MAPA DE RUTAS DE APRENDIZAJE
Muestra qué fuentes son prerequisitos de otras. Ejemplo:
```
CS50x → CS50 AI → HuggingFace Course
     ↳ CS50 Web
Python Tutorial → FastAPI → Architecture Patterns
```

### 2. AGRUPACIÓN POR TEMAS TRANSVERSALES
Agrupa fuentes que enseñan el mismo concepto desde diferentes ángulos:
- "Autenticación": [lista de fuentes]
- "Docker/Contenedores": [lista de fuentes]
- "Algoritmos": [lista de fuentes]

### 3. RECOMENDACIÓN DE ORDEN
Si estuvieras creando un currículum para un autodidacta de 0 a experto en 10 años, ¿en qué orden recomendarías estas fuentes?

═══════════════════════════════════════════════════════════════════

## 📦 ENTREGA FINAL - JSON ESTRUCTURADO

Al final de todo, genera un código JSON válido que pueda copiar directamente a mi código:

```json
{
  "fuentes": [
    {
      "id": 1,
      "name": "Nombre Exacto",
      "category": "categoria",
      "icon": "emoji",
      "url": "https://...",
      "desc": "Descripción técnica en 1-2 oraciones",
      "tactical": "Utilidad táctica específica",
      "difficulty": "beginner|intermediate|advanced|expert",
      "concepts": ["concepto1", "concepto2", "concepto3"],
      "prerequisites": ["prereq1", "prereq2"],
      "duration": "X horas",
      "hasExercises": true,
      "hasProject": false,
      "format": "video|text|interactive"
    }
  ],
  "learningPaths": {
    "csFoundations": [1, 2, 3],
    "webDevelopment": [10, 15, 20],
    "machineLearning": [30, 35, 40]
  },
  "conceptIndex": {
    "docker": [77, 45, 23],
    "authentication": [12, 18, 34]
  }
}
```

═══════════════════════════════════════════════════════════════════

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de entregar, verifica:
- [ ] Todas las URLs son válidas y accesibles
- [ ] Las categorías siguen el sistema de 12 categorías definido
- [ ] Cada fuente tiene exactamente 1 categoría principal
- [ ] Los conceptos clave están en minúsculas y separados por espacios
- [ ] La dificultad usa los 4 niveles específicos
- [ ] El JSON al final es válido (sin comentarios, formato correcto)

═══════════════════════════════════════════════════════════════════

EMPIEZA AHORA: Analiza la primera fuente y continúa sistemáticamente.
```

---

## 💡 TIPS PARA MEJORES RESULTADOS

### Optimización del Prompt:
1. **Si tienes muchas fuentes** (>50), pide el análisis en lotes de 10
2. **Si una fuente es muy larga** (ej: curso de 40h), pide análisis detallado por módulos
3. **Si Notebook LM no reconoce una fuente**, pega la URL directamente y pide análisis basado en el contenido

### Variaciones del Prompt:

**Para análisis rápido (si tienes prisa):**
```
Analiza todas mis fuentes y dame solo: nombre, categoría, dificultad, y 3 conceptos clave por fuente. Formato JSON al final.
```

**Para análisis profundo (si quieres calidad):**
```
Analiza en profundidad cada fuente con todo el formato detallado. Después crea 3 rutas de aprendizaje sugeridas basadas en mis objetivos: 1) Full Stack Developer, 2) AI/ML Engineer, 3) Security Specialist.
```

**Para verificación de calidad:**
```
Después de analizar todas las fuentes, identifica cuáles son redundantes (enseñan lo mismo) y cuáles son únicas/irreemplazables. Sugiere cuáles eliminar si tuviera que reducir la biblioteca a la mitad.
```

---

## 🎯 OUTPUT ESPERADO

Notebook LM debería entregar:
1. ✅ Análisis detallado de cada fuente
2. ✅ Categorización consistente
3. ✅ Mapa de rutas de aprendizaje
4. ✅ JSON válido y estructurado
5. ✅ Recomendaciones de orden

---

**¿Listo para usar?** Copia el prompt maestro, ábrelo en Notebook LM, y empieza el análisis sistemático de tu biblioteca.
