// ============================================================
// PROYECTO AEGIS — AGENTE 1: ARQUITECTO — ESTRUCTURAS DE DATOS
// ============================================================

const CURRICULUM = {
  phases: [
    {
      id: 0, name: "Fundamentos Absolutos", duration_weeks: 16,
      courses: ["CS50x Weeks 0-4", "Khan Academy Algebra", "Linux Journey Basics", "Duolingo English Tech"],
      projects: ["Scratch project", "C calculator", "Caesar cipher", "Photo filter"],
      resources: ["https://cs50.harvard.edu/x/", "https://es.khanacademy.org/math/algebra", "https://linuxjourney.com/"]
    },
    {
      id: 1, name: "Programación & Algoritmos", duration_weeks: 24,
      courses: ["CS50x Weeks 5-10", "CS50P completo", "MIT 6.001 SICP", "Algorithms Part I (Coursera)"],
      projects: ["Spell checker in C", "Finance web app", "Python automation scripts", "Data structures library"],
      resources: ["https://cs50.harvard.edu/python/", "https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/"]
    },
    {
      id: 2, name: "Sistemas & Arquitectura", duration_weeks: 28,
      courses: ["Nand2Tetris Part I & II", "CS50W Web", "Linux Administration", "Computer Networks Basics"],
      projects: ["Build an ALU", "Full-stack web app", "Custom shell in C", "TCP/IP analyzer"],
      resources: ["https://www.nand2tetris.org/", "https://cs50.harvard.edu/web/"]
    },
    {
      id: 3, name: "Ciberseguridad Introducción", duration_weeks: 28,
      courses: ["CS50 Cybersecurity", "OverTheWire Bandit 0-20", "TryHackMe Pre-Security", "OWASP Top 10"],
      projects: ["CTF Bandit complete", "Burp Suite lab", "Python port scanner", "Vulnerability report"],
      resources: ["https://overthewire.org/wargames/bandit/", "https://tryhackme.com/", "https://owasp.org/"]
    },
    {
      id: 4, name: "Ciberseguridad Intermedio", duration_weeks: 32,
      courses: ["TryHackMe SOC Level 1", "Hack The Box Starting Point", "Metasploit Framework", "Wireshark Analysis"],
      projects: ["Home lab setup", "Complete OWASP Juice Shop", "Custom exploit script", "SIEM dashboard"],
      resources: ["https://www.hackthebox.com/", "https://www.metasploit.com/"]
    },
    {
      id: 5, name: "IA & Machine Learning", duration_weeks: 32,
      courses: ["fast.ai Practical DL", "Stanford CS229 ML", "Hugging Face Course", "LangChain Fundamentals"],
      projects: ["Image classifier", "NLP sentiment analyzer", "RAG system", "Local Ollama agent"],
      resources: ["https://www.fast.ai/", "https://cs229.stanford.edu/", "https://huggingface.co/learn"]
    },
    {
      id: 6, name: "Especialización", duration_weeks: 40,
      courses: ["Advanced Pentesting", "Cloud Security (AWS/GCP)", "Reverse Engineering", "AI Security"],
      projects: ["Bug bounty first report", "Cloud CTF", "Malware analysis lab", "AI red teaming tool"],
      resources: ["https://portswigger.net/web-security", "https://cloud.google.com/training"]
    },
    {
      id: 7, name: "Maestría & Contribución", duration_weeks: 56,
      courses: ["Research papers reading", "Open source contributions", "Teach others", "Publish tools"],
      projects: ["CVE discovery attempt", "Open source security tool", "Technical blog", "Conference talk"],
      resources: ["https://arxiv.org/list/cs/recent", "https://github.com/"]
    }
  ]
};

const ELITE_GOALS = [
  { id: 1, year: 1, title: "Primera Línea de Código", desc: "Completar CS50x Week 0 y entregar Scratch project", reward: "🎯 Rookie Activated" },
  { id: 2, year: 1, title: "Dominio de C", desc: "Completar CS50x con todos los psets en C", reward: "⚔️ C Warrior" },
  { id: 3, year: 2, title: "Pythonista", desc: "Completar CS50P y 5 proyectos Python", reward: "🐍 Snake Master" },
  { id: 4, year: 2, title: "Arquitecto de Sistemas", desc: "Completar Nand2Tetris completo", reward: "🖥️ Systems Architect" },
  { id: 5, year: 3, title: "First Blood CTF", desc: "Completar OverTheWire Bandit 0-33", reward: "🔴 CTF Hunter" },
  { id: 6, year: 4, title: "Infiltrado", desc: "Completar TryHackMe SOC Level 1 y HTB Starting Point", reward: "🕵️ Infiltrator" },
  { id: 7, year: 5, title: "IA Awakening", desc: "Desplegar primer modelo de ML propio", reward: "🤖 AI Pioneer" },
  { id: 8, year: 7, title: "Bug Bounty Hunter", desc: "Primer reporte válido en HackerOne o Bugcrowd", reward: "💰 Bounty Hunter" },
  { id: 9, year: 8, title: "Investigador", desc: "Contribuir a un proyecto open source de seguridad", reward: "🔬 Researcher" },
  { id: 10, year: 10, title: "Maestro AEGIS", desc: "Completar el plan completo de 10 años", reward: "👑 AEGIS Master" }
];

const CC_WORLDS = [
  {
    id: 1, name: "Dungeon of Basics", levels: 40,
    description: "Python fundamentals, variables, loops, functions",
    skill_unlocked: "Python Apprentice",
    weeks_available: [1, 8]
  },
  {
    id: 2, name: "Forest of Algorithms", levels: 30,
    description: "Sorting, searching, recursion, complexity",
    skill_unlocked: "Algorithm Thinker",
    weeks_available: [9, 24]
  },
  {
    id: 3, name: "Castle of Data Structures", levels: 30,
    description: "Lists, trees, graphs, hash tables",
    skill_unlocked: "Data Architect",
    weeks_available: [25, 52]
  },
  {
    id: 4, name: "Cybervault", levels: 30,
    description: "Security concepts, encryption, CTF basics",
    skill_unlocked: "Cyber Initiate",
    weeks_available: [53, 104]
  },
  {
    id: 5, name: "AI Nexus", levels: 20,
    description: "ML fundamentals, neural networks, agents",
    skill_unlocked: "Neural Commander",
    weeks_available: [105, 260]
  }
];

const MUSIC_PLAYLISTS = {
  deep_focus: {
    name: "Deep Focus — Flujo Máximo",
    science: "El ruido blanco y marrón a 40-60Hz sincroniza ondas gamma para máxima concentración (Gamma entrainment, 40Hz).",
    best_for: "Matemáticas, algoritmos, código complejo",
    tracks: [
      { name: "Brain.fm Deep Work", url: "https://brain.fm", type: "generative" },
      { name: "Lofi Hip Hop Radio - beats to study", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", type: "youtube" },
      { name: "Focus Flow - Spotify", url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ", type: "spotify" },
      { name: "Dark Ambient Study", url: "https://www.youtube.com/watch?v=1KaOrSuWZeM", type: "youtube" }
    ]
  },
  creative_mode: {
    name: "Creative Mode — Exploración",
    science: "Ondas Alpha (8-12Hz) favorecen el pensamiento lateral y la creatividad (Jensen & Tesche, 2002).",
    best_for: "Diseño, brainstorming, proyectos creativos",
    tracks: [
      { name: "Atmospheric Ambient", url: "https://www.youtube.com/watch?v=21qNxnCS8WU", type: "youtube" },
      { name: "Jazz for Coding", url: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa", type: "spotify" },
      { name: "Brian Eno — Music for Airports", url: "https://www.youtube.com/watch?v=vNwYtllyt3Q", type: "youtube" }
    ]
  },
  high_energy: {
    name: "High Energy — Sprint Mode",
    science: "BPM 130-145 activa el sistema nervioso simpático, aumentando velocidad de procesamiento 15% (Karageorghis, 2013).",
    best_for: "Revisión rápida, flashcards, repaso, sprint final",
    tracks: [
      { name: "Power Hour — Electronic", url: "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy", type: "spotify" },
      { name: "Synthwave Coding", url: "https://www.youtube.com/watch?v=0l1lMHfJFP4", type: "youtube" },
      { name: "Drum & Bass Study", url: "https://www.youtube.com/watch?v=pqkC1VWJM8A", type: "youtube" }
    ]
  },
  recovery: {
    name: "Recovery — Restauración",
    science: "60 BPM sincroniza con ritmo cardíaco en reposo, activando el sistema nervioso parasimpático y consolidando memoria (Walker, 2017).",
    best_for: "Descansos, meditación, repaso pasivo, sueño",
    tracks: [
      { name: "Tibetan Bowls", url: "https://www.youtube.com/watch?v=1ZYbU82GVz4", type: "youtube" },
      { name: "Nature Sounds Forest", url: "https://www.youtube.com/watch?v=xNN7iTA57jM", type: "youtube" },
      { name: "432Hz Healing Tones", url: "https://www.youtube.com/watch?v=FgMbhFNKMcg", type: "youtube" }
    ]
  }
};

const CODE_COMBAT_EXERCISES = [
  { id: 1, title: "FizzBuzz Elite", difficulty: "basic", category: "algorithms", language: "python",
    description: "Imprime números 1-100. Múltiplos de 3: 'Fizz', de 5: 'Buzz', de ambos: 'FizzBuzz'.",
    test_cases: [{ input: "15", expected: "FizzBuzz" }, { input: "9", expected: "Fizz" }, { input: "25", expected: "Buzz" }],
    hint: "Usa el operador módulo %" },
  { id: 2, title: "Caesar Cipher", difficulty: "basic", category: "cybersecurity", language: "python",
    description: "Implementa cifrado César. Encripta y desencripta texto con shift variable.",
    test_cases: [{ input: "hello,3", expected: "khoor" }, { input: "WORLD,13", expected: "JBEYQ" }],
    hint: "ord() y chr() son tus aliados" },
  { id: 3, title: "Binary Search", difficulty: "intermediate", category: "algorithms", language: "python",
    description: "Busca un elemento en una lista ordenada en O(log n).",
    test_cases: [{ input: "[1,3,5,7,9],7", expected: "3" }, { input: "[2,4,6,8],5", expected: "-1" }],
    hint: "Divide y conquista con left, right, mid" },
  { id: 4, title: "Stack Validator", difficulty: "intermediate", category: "data_structures", language: "python",
    description: "Valida si los paréntesis, corchetes y llaves están balanceados.",
    test_cases: [{ input: "({[]})", expected: "True" }, { input: "({[})", expected: "False" }],
    hint: "Usa una stack (lista) y dict de pares" },
  { id: 5, title: "XOR Decrypt", difficulty: "intermediate", category: "cybersecurity", language: "python",
    description: "Descifra un mensaje encriptado con XOR dado la clave.",
    test_cases: [{ input: "message,key", expected: "decrypted" }],
    hint: "XOR es su propio inverso: m^k^k = m" },
  { id: 6, title: "Port Scanner", difficulty: "advanced", category: "cybersecurity", language: "python",
    description: "Escanea puertos TCP 1-1024 en localhost. Retorna lista de puertos abiertos.",
    test_cases: [{ input: "localhost", expected: "list of open ports" }],
    hint: "socket.connect_ex() retorna 0 si el puerto está abierto" },
  { id: 7, title: "Merge Sort", difficulty: "advanced", category: "algorithms", language: "python",
    description: "Implementa merge sort recursivo. Complejidad O(n log n).",
    test_cases: [{ input: "[5,2,8,1,9]", expected: "[1,2,5,8,9]" }],
    hint: "Divide la lista a la mitad, ordena cada parte, merge" },
  { id: 8, title: "Hash Table from Scratch", difficulty: "advanced", category: "data_structures", language: "python",
    description: "Implementa una tabla hash con manejo de colisiones por chaining.",
    test_cases: [{ input: "set/get operations", expected: "correct values" }],
    hint: "hash(key) % size da el índice. Cada bucket es una lista" },
  { id: 9, title: "SQL Injection Detector", difficulty: "expert", category: "cybersecurity", language: "python",
    description: "Detecta patrones de SQL injection en strings de input.",
    test_cases: [{ input: "' OR 1=1--", expected: "INJECTION_DETECTED" }],
    hint: "Regex para OR, UNION, SELECT, DROP patterns" },
  { id: 10, title: "Neural Network from Scratch", difficulty: "expert", category: "ai", language: "python",
    description: "Implementa una red neuronal simple con numpy. Forward y backprop.",
    test_cases: [{ input: "XOR dataset", expected: "accuracy > 0.95" }],
    hint: "sigmoid activation, cross-entropy loss, gradient descent" }
];

const AI_ACADEMY = {
  levels: [
    { id: 1, name: "IA 101 — El Despertar", weeks: 4,
      topics: ["¿Qué es IA?", "Historia de la IA", "Machine Learning vs Deep Learning", "Python para IA"],
      project: "Clasificador de flores Iris con scikit-learn",
      resources: ["fast.ai lesson 1", "3Blue1Brown Neural Networks"]
    },
    { id: 2, name: "Matematicas de IA", weeks: 6,
      topics: ["Álgebra lineal para ML", "Cálculo (gradiente)", "Estadística bayesiana", "Numpy/Pandas"],
      project: "Implementar regresión lineal desde cero con numpy",
      resources: ["Gilbert Strang Linear Algebra MIT", "Khan Academy Statistics"]
    },
    { id: 3, name: "Deep Learning", weeks: 8,
      topics: ["CNNs", "RNNs/LSTMs", "Transfer Learning", "PyTorch fundamentals"],
      project: "Clasificador de imágenes con ResNet fine-tuning",
      resources: ["fast.ai Part 1", "PyTorch official tutorials"]
    },
    { id: 4, name: "NLP & Transformers", weeks: 8,
      topics: ["Tokenización", "Embeddings", "Attention mechanism", "BERT/GPT architecture"],
      project: "Chatbot con Hugging Face Transformers",
      resources: ["Hugging Face NLP Course", "Andrej Karpathy — makemore"]
    },
    { id: 5, name: "IA en Producción", weeks: 6,
      topics: ["MLOps basics", "FastAPI para modelos", "Docker para IA", "Monitoring con Langfuse"],
      project: "Deploy de modelo ML en API REST",
      resources: ["Made With ML", "Full Stack Deep Learning"]
    },
    { id: 6, name: "Agentes IA", weeks: 8,
      topics: ["RAG systems", "LangChain/LangGraph", "Ollama local", "Tool use & function calling"],
      project: "Agente de investigación con RAG y Ollama local",
      resources: ["LangChain docs", "Anthropic cookbook"]
    },
    { id: 7, name: "IA Avanzada & Seguridad", weeks: 12,
      topics: ["Adversarial attacks", "AI red teaming", "Fine-tuning LLMs", "Creación de modelos propios"],
      project: "IA de seguridad: detector de vulnerabilidades en código",
      resources: ["Anthropic AI Safety", "OpenAI red teaming guide"]
    }
  ]
};

const COUNCIL_OF_MASTERS = [
  { id: 1, name: "Alan Turing", role: "Padre de la Computación", specialty: "Algoritmos y Pensamiento Abstracto",
    wisdom: "A veces son las personas que nadie imagina hacer algo las que hacen cosas que nadie puede imaginar.",
    advice_for: "cuando el problema parece imposible" },
  { id: 2, name: "Grace Hopper", role: "Pionera del Software", specialty: "Persistencia y Debugging",
    wisdom: "El frase más dañino en cualquier lenguaje es: 'siempre lo hemos hecho así'.",
    advice_for: "cuando quieres rendirte" },
  { id: 3, name: "Ada Lovelace", role: "Primera Programadora", specialty: "Visión y Creatividad",
    wisdom: "La imaginación es la facultad descubridora por excelencia.",
    advice_for: "cuando necesitas creatividad" },
  { id: 4, name: "Richard Feynman", role: "Físico y Pedagogo", specialty: "Comprensión Profunda",
    wisdom: "Si no puedes explicarlo de forma simple, no lo entiendes suficientemente bien.",
    advice_for: "cuando estudias algo complejo" },
  { id: 5, name: "Linus Torvalds", role: "Creador de Linux", specialty: "Sistemas y Persistencia",
    wisdom: "Los proyectos reales comienzan pequeños. Linux comenzó como mi hobby personal.",
    advice_for: "cuando tu proyecto parece pequeño" },
  { id: 6, name: "Kevin Mitnick", role: "Hacker Legendario", specialty: "Ciberseguridad y Creatividad",
    wisdom: "El factor humano es el eslabón más débil en cualquier sistema de seguridad.",
    advice_for: "cuando estudias seguridad" },
  { id: 7, name: "Geoffrey Hinton", role: "Padre del Deep Learning", specialty: "Paciencia y Visión a Largo Plazo",
    wisdom: "Seguí creyendo en las redes neuronales durante 30 años cuando nadie más lo hacía.",
    advice_for: "cuando dudas del largo plazo" },
  { id: 8, name: "Barbara Liskov", role: "Arquitecta de Software", specialty: "Diseño y Abstracción",
    wisdom: "La abstracción es la herramienta más poderosa del programador.",
    advice_for: "cuando diseñas sistemas" },
  { id: 9, name: "Donald Knuth", role: "Maestro de Algoritmos", specialty: "Perfección y Profundidad",
    wisdom: "La optimización prematura es la raíz de todos los males.",
    advice_for: "cuando quieres optimizar antes de tiempo" },
  { id: 10, name: "Sun Tzu", role: "El Estratega", specialty: "Estrategia y Disciplina",
    wisdom: "Conócete a ti mismo y conoce a tu enemigo, y no temerás el resultado de mil batallas.",
    advice_for: "cuando necesitas estrategia de estudio" }
];
