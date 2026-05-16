// Script para integrar fuentes 130-178 de Notebook LM a AEGIS
const fs = require('fs');

const nuevasFuentes = [
  { id: 130, name: "97 Things Every Programmer Should Know", category: "methodology", icon: "🧠", url: "#", desc: "Consejos y mejores prácticas para el desarrollo de software por Kevlin Henney.", tactical: "Fomenta código limpio, refactorización y madurez profesional." },
  { id: 131, name: "CIBERSEGURIDAD.TODOS-LOS-PDF (GitHub)", category: "security", icon: "🛡️", url: "https://github.com/Aquiles369/CIBERSEGURIDAD.TODOS-LOS-PDF", desc: "Repositorio exhaustivo de manuales sobre auditorías, redes, hacking y OWASP.", tactical: "Arsenal documental para Hacking Ético y defensa de redes." },
  { id: 132, name: "Hacking con Buscadores", category: "security", icon: "🔍", url: "#", desc: "Uso de dorks y operadores lógicos en buscadores para encontrar vulnerabilidades.", tactical: "Técnicas de OSINT pasivo e Inteligencia de Fuentes Abiertas." },
  { id: 133, name: "Clean Architecture - Uncle Bob", category: "architecture", icon: "🏛️", url: "https://github.com/ropalma/ICMC-USP", desc: "Principios para el diseño de arquitecturas limpias y mantenibles.", tactical: "Reglas estructurales absolutas para Arquitectos de Software." },
  { id: 134, name: "CS50P - Lecture 0: Functions, Variables", category: "cs50", icon: "🎓", url: "#", desc: "Introducción a variables, funciones y sintaxis de Python por David J. Malan.", tactical: "Primeros pasos en la Trinchera para forjar memoria muscular." },
  { id: 135, name: "CS50P - Lecture 1: Conditionals", category: "cs50", icon: "🎓", url: "#", desc: "Lección sobre condicionales y control de flujo en Python.", tactical: "Aprender a programar la toma de decisiones dinámicas." },
  { id: 136, name: "Ciberseguridad - A. Corletti", category: "security", icon: "🔒", url: "#", desc: "Manual militar y empresarial sobre procesos, SIEM y análisis de redes.", tactical: "Base defensiva e infraestructura de ciberseguridad corporativa." },
  { id: 137, name: "Principios de Seguridad", category: "security", icon: "🛡️", url: "http://www.openlearning.es", desc: "Normativas ISO/IEC 27000, gestión de incidentes y seguridad en desarrollo.", tactical: "Marco legal y de políticas para administrar infraestructura." },
  { id: 138, name: "Proyecto de Asalto Técnico Autodidacta", category: "methodology", icon: "📜", url: "#", desc: "Manifiesto de auditoría del plan de estudios de 12 meses.", tactical: "Protocolo Stop-Loss y gestión de riesgos para evitar el burnout." },
  { id: 139, name: "ROADMAP MAESTRO", category: "methodology", icon: "🗺️", url: "#", desc: "Hoja de ruta secuencial de 12 meses desde Python hasta DevSecOps.", tactical: "Brújula cronológica que dictamina la fase exacta de estudio." },
  { id: 140, name: "ROLES PEDAGOGIA IA", category: "ai", icon: "🎭", url: "#", desc: "System Prompt con 8 perfiles pedagógicos para evitar atajos.", tactical: "Genera fricción educativa y evita respuestas pasivas de la IA." },
  { id: 141, name: "Apuntes: Estructuras de Datos y Algoritmos", category: "methodology", icon: "🧱", url: "#", desc: "Teoría sobre asignación en memoria estática vs dinámica, diccionarios y punteros.", tactical: "Vital para estructurar esquemas lógicos eficientes en código." },
  { id: 142, name: "C - Introducción a la Programación", category: "systems", icon: "💻", url: "#", desc: "Gestión de memoria, punteros, lectura de ficheros y matrices en C.", tactical: "Bases de bajo nivel para prevenir vulnerabilidades de memoria." },
  { id: 143, name: "CodeCombat Curriculum", category: "methodology", icon: "🎮", url: "#", desc: "Mapeo de mecánicas RPG de CodeCombat a fundamentos de CS.", tactical: "Evita el Falso Positivo de Competencia gamificada." },
  { id: 144, name: "CSS3 y JavaScript Avanzado (UOC)", category: "web", icon: "🌐", url: "#", desc: "Manual formativo avanzado de interacciones asíncronas JS y CSS3.", tactical: "Refuerza comprensión del Front-end y manipulación dinámica del DOM." },
  { id: 145, name: "elhacker.INFO", category: "security", icon: "☠️", url: "https://elhacker.info", desc: "Directorio de manuales, tutoriales y libros de hacking.", tactical: "Repositorio de recursos ofensivos y defensivos." },
  { id: 146, name: "Estructuras de Datos - L. Zapata", category: "methodology", icon: "🧱", url: "#", desc: "Análisis teórico sobre implementación y complejidad de estructuras de datos.", tactical: "Base analítica para optimización en memoria." },
  { id: 147, name: "Git Pro (Chacon & Straub)", category: "git", icon: "🐙", url: "#", desc: "Manual técnico avanzado sobre Git, branching, rebase y CI/CD.", tactical: "Herramienta innegociable para flujos corporativos e integración continua." },
  { id: 148, name: "Guía Scrum (European)", category: "methodology", icon: "🏃", url: "#", desc: "Guía sobre el marco de trabajo ágil Scrum, Sprints y roles.", tactical: "Adaptación de mentalidad autodidacta a entornos corporativos iterativos." },
  { id: 149, name: "Guía Programadores Junior 2026 - MoureDev", category: "methodology", icon: "🧭", url: "#", desc: "Roadmap 2026 que integra fundamentos clásicos con Prompts y Agentes de IA.", tactical: "Alinea entrenamiento severo con demandas del mercado actual." },
  { id: 150, name: "Haskell Piensa", category: "methodology", icon: "𝜆", url: "#", desc: "Curso de programación funcional y matemática con Haskell.", tactical: "Expande pensamiento lateral modelando estados inmutables." },
  { id: 151, name: "Haskell-Python Ejercicios", category: "python", icon: "🐍", url: "#", desc: "Ejercicios comparativos entre Python y Haskell: recursión y conjuntos.", tactical: "Práctica para asimilar código elegante y comprensiones complejas." },
  { id: 152, name: "Attacking Azure AD", category: "security", icon: "☁️", url: "https://elhacker.info", desc: "Explotación de Entra ID, Azure Services, Movimiento Lateral y escalada cloud.", tactical: "Capacitación ofensiva para ecosistemas Cloud modernos." },
  { id: 153, name: "Becoming the Hacker", category: "security", icon: "☠️", url: "https://elhacker.info", desc: "Libro de explotación con ejemplos de inyección de código JS/Keyloggers.", tactical: "Ejemplos prácticos de vectores de ataque en cliente." },
  { id: 154, name: "Java - Apuntes Básicos", category: "methodology", icon: "☕", url: "#", desc: "Guía práctica de sintaxis y manejo de archivos en Java.", tactical: "Contrastar dinamismo de Python con rigurosidad estática." },
  { id: 155, name: "Java Básico para Aprendices", category: "methodology", icon: "☕", url: "#", desc: "Manual universitario para asimilar tokens, variables y POO en Java.", tactical: "Rigor académico en diseño de clases y polimorfismo." },
  { id: 156, name: "JavaScript - Asincronismo", category: "web", icon: "⚡", url: "#", desc: "Gestión del Event Loop, callbacks y llamadas asíncronas en JS.", tactical: "Vital para consumir APIs sin bloquear la interfaz de usuario." },
  { id: 157, name: "JavaScript Elocuente (4ta Ed)", category: "web", icon: "🟨", url: "#", desc: "Obra maestra sobre JS: closures, DOM, NodeJS, expresiones regulares.", tactical: "Pilar central para dominar programación del cliente (Frontend)." },
  { id: 158, name: "JavaScript (UOC)", category: "web", icon: "🟨", url: "#", desc: "Manual universitario sobre interacción estructurada con navegadores usando JS.", tactical: "Metodologías de control dinámico del lado del cliente." },
  { id: 159, name: "jQuery Fundamentos", category: "web", icon: "📜", url: "#", desc: "Guía técnica para manipular DOM y peticiones AJAX usando jQuery.", tactical: "Crítico para auditar o mantener infraestructuras legacy." },
  { id: 160, name: "Lógica de Programación", category: "methodology", icon: "🧠", url: "#", desc: "Libro de fundamentos: historia, diagramas de flujo y pseudocódigo.", tactical: "Instala mentalidad abstracta para planificar antes de codificar." },
  { id: 161, name: "Ruta de Estudio MoureDev Pro", category: "methodology", icon: "🗺️", url: "#", desc: "Índice visual de la currícula de cursos sugeridos por MoureDev Pro.", tactical: "Mapeo auxiliar para contrastar aprendizaje de lenguajes." },
  { id: 162, name: "PHP POO y MVC", category: "architecture", icon: "🐘", url: "#", desc: "Implementación estricta del patrón MVC y POO en PHP.", tactical: "Base indispensable para separación de responsabilidades en Backend." },
  { id: 163, name: "Python Aprende - S. Delgado", category: "python", icon: "🐍", url: "#", desc: "Compendio inmenso: sintaxis, Data Science, Scraping web con Selenium.", tactical: "Enciclopedia táctica multidisciplinar para orquestación general." },
  { id: 164, name: "Python Apuntes - M. Vergara", category: "python", icon: "📓", url: "#", desc: "Apuntes prácticos sobre Django, Machine Learning y librerías de voz.", tactical: "Molde de tracción rápida para clonar configuraciones ya probadas." },
  { id: 165, name: "Python Cálculo Científico", category: "python", icon: "🧮", url: "#", desc: "Explotación del motor numérico de Python usando NumPy y visualización.", tactical: "Afila capacidad de procesamiento matricial y criptográfico." },
  { id: 166, name: "Python Ejercicios Básicos", category: "python", icon: "🏋️", url: "#", desc: "Proyectos aplicados: ordenamiento, visión artificial (OpenCV) y IA (Scikit).", tactical: "Memoria muscular para algoritmos reales en CS." },
  { id: 167, name: "Python Explorando Información", category: "python", icon: "🌐", url: "#", desc: "Python for Everybody: lectura de APIs, JSON, XML y Sockets.", tactical: "Otorga la 'Visión de Red' esencial para consumir servicios web." },
  { id: 168, name: "Python Inmersión", category: "python", icon: "🤿", url: "#", desc: "Dive Into Python: introspección, parseo XML complejo y serialización JSON.", tactical: "Clave para minería de texto e inyecciones precisas de código." },
  { id: 169, name: "Python Inventa Juegos - Al Sweigart", category: "python", icon: "🎮", url: "http://inventwithpython.com/es", desc: "Desarrollo de lógica geométrica y diccionarios mediante juegos de consola.", tactical: "Entrenador para control bidimensional de memoria y coordenadas." },
  { id: 170, name: "React Aprendiz y Maestro", category: "web", icon: "⚛️", url: "#", desc: "Guía técnica sobre ecosistema de componentes asíncronos en React.", tactical: "Baluarte para orquestar interfaces avanzadas conectadas a APIs." },
  { id: 171, name: "Rust Aprendizaje", category: "systems", icon: "🦀", url: "#", desc: "Manual sobre lenguaje seguro en memoria: Safety Checker, hilos, ownership.", tactical: "Expansión hacia Bajo Nivel Seguro previniendo exploits de memoria." },
  { id: 172, name: "Scrum y XP desde las Trincheras", category: "methodology", icon: "🏃", url: "#", desc: "Guía empírica sobre aplicar Scrum y Extreme Programming bajo presión.", tactical: "Mentalidad corporativa ágil vital para CI/CD." },
  { id: 173, name: "Sistemas Operativos - Wolf (UNAM)", category: "systems", icon: "🖥️", url: "http://github.org/gwolf/sistop", desc: "Tratado profundo sobre gestión de CPU, hilos, y RAM virtual por el Kernel.", tactical: "Maestría técnica esencial para fortificar y administrar Arch Linux." },
  { id: 174, name: "TypeScript Aprendizaje", category: "web", icon: "💙", url: "#", desc: "Manual técnico sobre genéricos, clases e interfaces restrictivas en JS.", tactical: "Red de seguridad que bloquea fallos lógicos en tiempo de compilación." },
  { id: 175, name: "TypeScript Introducción (Adictos al Trabajo)", category: "web", icon: "💙", url: "#", desc: "Tutorial veloz de introducción a TS para ecosistemas Front-end.", tactical: "Puente de arranque sin sobrecarga teórica." },
  { id: 176, name: "TypeScript para Principiantes (Envato)", category: "web", icon: "💙", url: "#", desc: "Guía orientada al archivo de configuración tsconfig.json.", tactical: "Organización para evitar caos en ecosistemas web grandes." },
  { id: 177, name: "VisuAlgo - Visualización Algoritmos", category: "methodology", icon: "👁️", url: "https://visualgo.net", desc: "Portal interactivo que anima ejecución en memoria de árboles, grafos y loops.", tactical: "Destruye la ceguera algorítmica para entender visualmente el Big O." },
  { id: 178, name: "Álgebra de Boole en Trinchera", category: "math", icon: "🧮", url: "#", desc: "Evaluación conversacional sobre De Morgan y compuertas lógicas.", tactical: "Refactoriza código feo y entrena para cálculo de subredes." }
];

// Calcular conteos por categoría
const counts = {};
nuevasFuentes.forEach(f => {
  counts[f.category] = (counts[f.category] || 0) + 1;
});

console.log('=== NUEVAS FUENTES 130-178 ===');
console.log(`Total a agregar: ${nuevasFuentes.length}`);
console.log('\nPor categoría:');
Object.entries(counts).sort((a,b) => b[1]-a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

// Generar formato para copiar
console.log('\n=== FORMATO AEGIS (COPIAR AL HTML) ===\n');
nuevasFuentes.forEach(f => {
  console.log(`  { id: ${f.id}, name: "${f.name}", category: "${f.category}", icon: "${f.icon}", url: "${f.url}", desc: "${f.desc}", tactical: "${f.tactical}" },`);
});

// Guardar JSON
const output = {
  metadata: {
    total: nuevasFuentes.length,
    ids_range: "130-178",
    by_category: counts,
    date: new Date().toISOString()
  },
  fuentes: nuevasFuentes
};

fs.writeFileSync('/Users/christiantoledo/Desarrollo/00-Learning/aegis/v5/FUENTES_130_178_PARA_AEGIS.json', JSON.stringify(output, null, 2));
console.log('\n✅ Archivo guardado: FUENTES_130_178_PARA_AEGIS.json');
