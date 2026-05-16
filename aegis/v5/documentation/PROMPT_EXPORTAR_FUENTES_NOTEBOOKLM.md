# 📓 Prompt para Exportar Fuentes de NotebookLM a AEGIS

## 🎯 Instrucciones para NotebookLM

Copia y pega este prompt en una nueva conversación con NotebookLM:

---

```
Analiza todas las fuentes que tengo en este notebook y genera un reporte estructurado para integrarlas en mi sistema de aprendizaje AEGIS.

Para cada fuente en mi biblioteca, proporciona:

## FORMATO DE SALIDA (uno por fuente)

```
=== FUENTE #X ===
TÍTULO COMPLETO: [nombre exacto de la fuente]
CATEGORÍA SUGERIDA: [elige una: cs50 | python | security | ai | architecture | systems | database | devops | git | methodology | cloud | math]
DESCRIPCIÓN BREVE: [2-3 oraciones sobre el contenido principal]
UTILIDAD TÁCTICA: [por qué es útil para alguien aprendiendo CS y ciberseguridad]
ICONO EMOJI: [emoji representativo]
URL/REFERENCIA: [si está disponible en la fuente]
NIVEL: [principiante | intermedio | avanzado]
DURACIÓN ESTIMADA: [horas/videos/capítulos si aplica]
PREREQUISITOS: [qué necesito saber antes]
```

## CATEGORÍAS DISPONIBLES EN AEGIS

- **cs50**: Harvard CS50x, fundamentos de CS
- **python**: Cursos y recursos de Python
- **security**: Ciberseguridad, hacking ético, pentesting
- **ai**: Machine Learning, LLMs, IA generativa
- **architecture**: Diseño de sistemas, microservicios
- **systems**: Sistemas operativos, bajo nivel
- **database**: Bases de datos, SQL, NoSQL
- **devops**: Docker, Kubernetes, CI/CD, cloud
- **git**: Control de versiones
- **methodology**: Metodologías, matemáticas, pensamiento sistémico
- **cloud**: AWS, Azure, GCP
- **math**: Matemáticas puras para CS

## INSTRUCCIONES ESPECIALES

1. Si hay **papers de investigación** de arXiv: categoría = ai o security según tema
2. Si hay **cursos de YouTube**: incluir nombre del canal y duración aproximada
3. Si hay **documentación técnica**: mencionar versión/framework si aplica
4. Si hay **libros**: incluir autor y año si están en la fuente
5. Si hay **labs o CTFs**: categoría = security, nivel según dificultad
6. Si hay **herramientas específicas** (Burp, IDA, Ghidra): security/tools

## EJEMPLO DE SALIDA ESPERADA

```
=== FUENTE #1 ===
TÍTULO COMPLETO: Harvard CS50x 2025 — Lecture 0: Scratch
CATEGORÍA SUGERIDA: cs50
DESCRIPCIÓN BREVE: Introducción a la programación con bloques visuales, fundamentos de lógica computacional y transición a código.
UTILIDAD TÁCTICA: Base pedagógica para entender algoritmos antes de escribir código. Demuestra que la lógica es independiente del lenguaje.
ICONO EMOJI: 🧩
URL/REFERENCIA: https://cs50.harvard.edu/x/2025/weeks/0/
NIVEL: principiante
DURACIÓN ESTIMADA: ~2 horas (video + ejercicios)
PREREQUISITOS: Ninguno, curso introductorio
```

## TAREA

Genera este formato para **TODAS** las fuentes que detectes en mi notebook actual. Sé específico y preciso. Si no estás seguro de algún dato, indícalo con [?].

Al final, incluye un resumen:
- Total de fuentes
- Distribución por categoría
- Fuentes marcadas como "críticas" o "prioritarias" si detectas algún patrón
```

---

## 🚀 Cómo usar

1. **Abre NotebookLM** → Crea nueva nota/chat
2. **Pega el prompt** de arriba
3. **Espera** la respuesta estructurada
4. **Copia la salida** y pégala aquí
5. **Yo (Cascade)** integro todas las fuentes al `BIBLIOTECA` array automáticamente

## 📋 Lista de Verificación Post-Integración

Después de que yo integre las fuentes:

- [ ] IDs únicos asignados (secuencia continúa desde 67)
- [ ] Categorías validadas contra AEGIS
- [ ] URLs verificadas (si están disponibles)
- [ ] Íconos asignados coherentemente
- [ ] Descripciones tácticas incluidas
- [ ] Nivel de dificultad estimado

## 📊 Contadores Actuales

- **Biblioteca AEGIS actual:** 67 fuentes
- **Próximo ID disponible:** 68
- **Categorías existentes:** cs50, python, security, ai, architecture, systems, database, devops, git, methodology

---

*Este prompt está optimizado para generar output que yo pueda parsear e integrar directamente.*
