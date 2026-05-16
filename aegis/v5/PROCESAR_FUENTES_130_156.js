// Procesador de fuentes 130-156 de Notebook LM
// Compara contra las 118 fuentes existentes

const fs = require('fs');

// Fuentes 130-156 recibidas
const nuevasFuentes = [
  { id: 130, name: "problemas-y-algoritmos.pdf", category: "methodology", icon: "🧩", desc: "Disección de problemas lógico-matemáticos. Duplicado de #94.", tactical: "Evitar cuellos de botella intelectuales.", duplicado: true, originalId: 94 },
  { id: 131, name: "progit.pdf", category: "git", icon: "🐙", desc: "Manual avanzado de Git de Scott Chacon. Gestión de ramas, rebase, CI/CD.", tactical: "Orquestar infraestructuras colaborativas profesionalmente.", duplicado: false },
  { id: 132, name: "python-aprende-sergio-delgado.pdf", category: "python", icon: "🐍", desc: "Compendio transversal: scraping, requests, beautifulsoup, numpy, pandas, matplotlib.", tactical: "Enciclopedia táctica multidisciplinar para datos e IA.", duplicado: false },
  { id: 133, name: "python-apuntes.pdf", category: "python", icon: "📓", desc: "Cuaderno de ejercicios, entornos virtuales, URLs, proyectos web, ML con Colab.", tactical: "Repositorio de campo para aplicaciones probadas.", duplicado: true, originalId: 97 },
  { id: 134, name: "python-calculo-cientifico.pdf", category: "python", icon: "🧮", desc: "Matrices, integración, resolución matemática con NumPy, SciPy, Matplotlib.", tactical: "Procesamiento numérico para criptografía y optimización.", duplicado: true, originalId: 98 },
  { id: 135, name: "python-ejercicios-basicos.pdf", category: "python", icon: "🏋️", desc: "Criptografía, tratamiento de imágenes OpenCV, algoritmos Scikit-Learn.", tactical: "Transición a visión artificial y machine learning.", duplicado: true, originalId: 99 },
  { id: 136, name: "python-explorando-informacion.pdf", category: "python", icon: "🌐", desc: "Python for Everybody: APIs, XML/JSON, visualización de datos, bases de datos.", tactical: "Visión de Red para OSINT ofensivo y backends.", duplicado: true, originalId: 100 },
  { id: 137, name: "python-inmersion.pdf", category: "python", icon: "🤿", desc: "Dive Into Python: introspección, refactorización, sindicación XML.", tactical: "Minería de texto para scripts de ciberseguridad.", duplicado: true, originalId: 101 },
  { id: 138, name: "python-intermedio.pdf", category: "python", icon: "🐍", desc: "Estilo Pythonic: generadores, comprehensions, map/filter/reduce, lambdas.", tactical: "Optimización logarítmica Big O en memoria RAM.", duplicado: true, originalId: 102 },
  { id: 139, name: "python-intermedio.pdf (dup)", category: "python", icon: "🐍", desc: "Duplicado de guía intermedia/avanzada.", tactical: "Respaldo del sistema.", duplicado: true, originalId: 102 },
  { id: 140, name: "python-inventa-juegos.pdf", category: "python", icon: "🎮", desc: "Al Sweigart: tableros lógicos, IA para minijuegos, coordenadas cartesianas.", tactical: "Entrenador geométrico para punteros y lógica backend.", duplicado: true, originalId: 103 },
  { id: 141, name: "python-manual-basico.pdf", category: "python", icon: "📘", desc: "Prontuario ágil: sintaxis base, selectores HTML, comandos de datos.", tactical: "Cheat-Sheet de rescate rápido.", duplicado: true, originalId: 104 },
  { id: 142, name: "python-manual-basico.pdf (dup)", category: "python", icon: "📘", desc: "Replicado del prontuario sintáctico.", tactical: "Copia de soporte.", duplicado: true, originalId: 104 },
  { id: 143, name: "python-para-todos.pdf", category: "python", icon: "🐍", desc: "Desde cero: tipos, colecciones, excepciones, POO, archivos, bases de datos.", tactical: "Enciclopedia primaria para Fase 1 del Roadmap.", duplicado: true, originalId: 105 },
  { id: 144, name: "python-pensar-programador.pdf", category: "python", icon: "🤔", desc: "Programación funcional, rendimiento, estructuras enlazadas, recursión árboles.", tactical: "Evolución de amateur a ingeniero de soluciones abstractas.", duplicado: true, originalId: 106 },
  { id: 145, name: "r-introduccion.pdf", category: "methodology", icon: "📊", desc: "Lenguaje R: estadístico, vectorial, tablas de frecuencias, Data Frames.", tactical: "Analítica paramétrica, base para Big Data con Pandas.", duplicado: true, originalId: 107 },
  { id: 146, name: "react-aprendiz-maestro.pdf", category: "architecture", icon: "⚛️", desc: "Ecosistema React: componentes asíncronos, vistas dinámicas, estado.", tactical: "Baluarte para orquestar interfaces web reactivas con FastAPI.", duplicado: true, originalId: 108 },
  { id: 147, name: "react-stackoverflow-docs.pdf", category: "architecture", icon: "⚛️", desc: "Snippets y soluciones de StackOverflow sobre React.", tactical: "Destrabar bloqueos técnicos de frontend rápidamente.", duplicado: true, originalId: 109 },
  { id: 148, name: "rust-aprendizaje.pdf", category: "systems", icon: "🦀", desc: "Rust: memoria en bruto, paralelismo por hilos, safety checker.", tactical: "Expansión violenta al Bajo Nivel Crítico, prevención de fallos memoria.", duplicado: true, originalId: 110 },
  { id: 149, name: "scrum-y-xp-desde-las-trincheras.pdf", category: "methodology", icon: "🏃", desc: "Henrik Kniberg: Scrum y XP en corporaciones de alta tensión.", tactical: "Madurez empresarial para CI/CD corporativo.", duplicado: true, originalId: 111 },
  { id: 150, name: "sistemas-operativos-wolf.pdf", category: "systems", icon: "🖥️", desc: "UNAM: Kernel, CPU, RAM virtual, persistencia asíncrona de archivos.", tactical: "Comprensión Nivel Dios del núcleo de sistema.", duplicado: true, originalId: 112 },
  { id: 151, name: "typescript-aprendizaje.pdf", category: "methodology", icon: "💙", desc: "TypeScript: tipado estricto, genéricos, clases, interfaces.", tactical: "Red de seguridad que intercepta fallos antes del cliente.", duplicado: true, originalId: 113 },
  { id: 152, name: "typescript-introduccion-adictos-trabajo.pdf", category: "methodology", icon: "💙", desc: "Introducción pragmática a TypeScript para frameworks modernos.", tactical: "Puente rápido sin sobrecarga teórica pesada.", duplicado: true, originalId: 114 },
  { id: 153, name: "typescript-para-principiantes-envato-tuts.pdf", category: "methodology", icon: "💙", desc: "Tutorial tsconfig.json: reglas de validación severas.", tactical: "Orden y reglas estandarizadas al código frontend.", duplicado: true, originalId: 115 },
  { id: 154, name: "typescript-para-principiantes-envato-tuts.pdf (dup)", category: "methodology", icon: "💙", desc: "Redundante del tutorial tsconfig.json.", tactical: "Archivo de respaldo.", duplicado: true, originalId: 115 },
  { id: 155, name: "visualising-data-structures-visuAlgo", category: "methodology", icon: "👁️", desc: "Simulador gráfico VisuAlgo: recorrido de algoritmos en memoria.", tactical: "Destruye ceguera algorítmica, enseña Big O empíricamente.", duplicado: true, originalId: 116 },
  { id: 156, name: "Álgebra de Boole en Trinchera", category: "math", icon: "🧮", desc: "Protocolo táctico: compuertas lógicas, Leyes de De Morgan.", tactical: "Puente para refactorizar Python y subnetting CIDR.", duplicado: true, originalId: 117, cambioCategoria: true }
];

// Análisis
const duplicados = nuevasFuentes.filter(f => f.duplicado);
const unicas = nuevasFuentes.filter(f => !f.duplicado);

console.log('=== ANÁLISIS FUENTES 130-156 ===\n');
console.log(`Total recibidas: ${nuevasFuentes.length}`);
console.log(`Duplicados: ${duplicados.length}`);
console.log(`Únicas nuevas: ${unicas.length}\n`);

console.log('--- DUPLICADOS IDENTIFICADOS ---');
duplicados.forEach(f => {
  console.log(`  #${f.id}: ${f.name} → coincide con #${f.originalId}`);
});

console.log('\n--- FUENTES REALMENTE NUEVAS ---');
unicas.forEach(f => {
  console.log(`  #${f.id}: ${f.name} (${f.category})`);
});

console.log('\n--- CAMBIO DE CATEGORÍA ---');
const cambioCat = nuevasFuentes.filter(f => f.cambioCategoria);
cambioCat.forEach(f => {
  console.log(`  #${f.id}: ${f.name} → ${f.originalId} cambia a ${f.category}`);
});

console.log('\n=== BALANCE FINAL ===');
console.log(`118 fuentes existentes + ${unicas.length} nuevas = ${118 + unicas.length} fuentes únicas`);
console.log(`Reporte Notebook LM dice: 156 fuentes totales`);
console.log(`Duplicados totales: ${156 - (118 + unicas.length)}`);
