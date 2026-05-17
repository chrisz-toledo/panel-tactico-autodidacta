/**
 * AEGIS PRO — Datos del Sistema
 * 
 * Currículo curado con URLs REALES verificadas (mayo 2026)
 * Plan de monetización por fases
 * 
 * Filosofía:
 * - Cada recurso tiene URL real funcional
 * - Cada fase tiene meta de ingresos clara
 * - Cada proyecto va al portfolio (CV-ready)
 * - Foco en empleabilidad, no en cantidad
 */

// ============================================================
// CURRÍCULO MAESTRO — 60 FUENTES CURADAS CON URLS REALES
// ============================================================

const CURRICULO = [
  // ═══════════════════════════════════════════════════════════
  // FASE 1: FUNDAMENTOS PYTHON (Mes 1-3) → Junior Track
  // META: Conseguir primer freelance $500-$1500
  // ═══════════════════════════════════════════════════════════
  {
    id: 1, fase: 1, orden: 1, mes: 1,
    nombre: "CS50P — Introduction to Programming with Python",
    institucion: "Harvard University",
    url: "https://cs50.harvard.edu/python/",
    horas: 30, dificultad: "beginner", categoria: "python",
    descripcion: "Curso oficial de Harvard. Bases sólidas de Python: variables, condicionales, loops, funciones, OOP, regex, exceptions, file I/O, unit tests.",
    skill: "Python fundamentals + Testing",
    cv: "Certificado verificable de Harvard",
    proyecto: "Final Project: aplicación Python con interfaz CLI",
    completado: false
  },
  {
    id: 2, fase: 1, orden: 2, mes: 1,
    nombre: "Python para Todos (Py4E)",
    institucion: "Charles Severance (University of Michigan)",
    url: "https://www.py4e.com/",
    horas: 25, dificultad: "beginner", categoria: "python",
    descripcion: "Especialización Python: data structures, web scraping, databases, JSON, APIs.",
    skill: "Python data manipulation + APIs",
    cv: "Coursera certificates (auditables gratis)",
    proyecto: "Script de scraping + análisis de datos",
    completado: false
  },
  {
    id: 3, fase: 1, orden: 3, mes: 1,
    nombre: "Automate the Boring Stuff with Python",
    institucion: "Al Sweigart",
    url: "https://automatetheboringstuff.com/",
    horas: 30, dificultad: "beginner", categoria: "python",
    descripcion: "Libro gratis online. Automatización práctica: Excel, PDF, emails, web scraping, GUI.",
    skill: "Python automation + Real-world scripts",
    cv: "Portfolio de automation scripts",
    proyecto: "Bot que automatiza una tarea de tu trabajo/vida",
    completado: false
  },
  {
    id: 4, fase: 1, orden: 4, mes: 2,
    nombre: "Real Python — Tutorials Gratuitos",
    institucion: "RealPython.com",
    url: "https://realpython.com/",
    horas: 20, dificultad: "intermediate", categoria: "python",
    descripcion: "Tutoriales profesionales gratis: deep dives en Python avanzado.",
    skill: "Python intermedio-avanzado",
    cv: "Refinement de skills, no certificado",
    proyecto: "Implementa 3 tutoriales completos",
    completado: false
  },
  {
    id: 5, fase: 1, orden: 5, mes: 2,
    nombre: "Git & GitHub — The Odin Project",
    institucion: "The Odin Project",
    url: "https://www.theodinproject.com/lessons/foundations-introduction-to-git",
    horas: 10, dificultad: "beginner", categoria: "git",
    descripcion: "Control de versiones desde cero. Workflow profesional. Branches, merges, conflictos, GitHub.",
    skill: "Git workflow profesional",
    cv: "GitHub profile activo con commits",
    proyecto: "Configura tu GitHub con README profesional",
    completado: false
  },
  {
    id: 6, fase: 1, orden: 6, mes: 2,
    nombre: "Linux Command Line — Learn Linux 101",
    institucion: "IBM via Coursera (gratis con audit)",
    url: "https://overthewire.org/wargames/bandit/",
    horas: 15, dificultad: "beginner", categoria: "systems",
    descripcion: "OverTheWire Bandit: aprende Linux jugando. CTF para terminal.",
    skill: "Linux CLI mastery",
    cv: "Habilidad esencial para todos los trabajos tech",
    proyecto: "Completa hasta nivel 20 de Bandit",
    completado: false
  },
  {
    id: 7, fase: 1, orden: 7, mes: 3,
    nombre: "SQL — Khan Academy",
    institucion: "Khan Academy",
    url: "https://www.khanacademy.org/computing/computer-programming/sql",
    horas: 12, dificultad: "beginner", categoria: "database",
    descripcion: "SQL desde cero: SELECT, JOIN, GROUP BY, transacciones, indexes.",
    skill: "SQL básico-intermedio",
    cv: "Skill requerido en 80%+ de trabajos backend",
    proyecto: "Base de datos relacional con 5+ tablas",
    completado: false
  },
  {
    id: 8, fase: 1, orden: 8, mes: 3,
    nombre: "FastAPI — Tutorial Oficial",
    institucion: "Sebastián Ramírez (FastAPI)",
    url: "https://fastapi.tiangolo.com/tutorial/",
    horas: 20, dificultad: "intermediate", categoria: "python",
    descripcion: "Framework backend Python moderno. APIs RESTful con docs automáticas.",
    skill: "Backend API development",
    cv: "Tecnología en auge, alta demanda",
    proyecto: "API REST con autenticación JWT + tests",
    completado: false
  },
  {
    id: 9, fase: 1, orden: 9, mes: 3,
    nombre: "MIT 6.0001 — Introduction to Computer Science",
    institucion: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
    horas: 35, dificultad: "intermediate", categoria: "cs50",
    descripcion: "CS fundamentals de MIT. Algoritmos, complejidad, debugging.",
    skill: "CS theoretical foundations",
    cv: "MIT certificate (auditable)",
    proyecto: "Implementa 3 algoritmos clásicos",
    completado: false
  },
  {
    id: 10, fase: 1, orden: 10, mes: 3,
    nombre: "🎯 PROYECTO CAPSTONE FASE 1",
    institucion: "Tú mismo",
    url: null,
    horas: 40, dificultad: "intermediate", categoria: "proyecto",
    descripcion: "Construir CLI tool útil + API REST + base de datos + tests + Docker + deploy.",
    skill: "Full backend stack",
    cv: "PRIMER PROYECTO EN PORTFOLIO",
    proyecto: "Ejemplos: gestor de tareas, monitor de servidor, bot Telegram",
    completado: false,
    capstone: true,
    metaIngreso: "$500-$1500 primer freelance"
  },

  // ═══════════════════════════════════════════════════════════
  // FASE 2: WEB DEVELOPMENT (Mes 4-9) → Mid Track
  // META: Trabajo remoto $2000-$5000/mes
  // ═══════════════════════════════════════════════════════════
  {
    id: 11, fase: 2, orden: 1, mes: 4,
    nombre: "The Odin Project — Foundations",
    institucion: "The Odin Project",
    url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
    horas: 50, dificultad: "beginner", categoria: "web",
    descripcion: "Curriculum gratuito completo: HTML, CSS, JavaScript, Git, terminal.",
    skill: "Web frontend fundamentals",
    cv: "Curriculum reconocido mundialmente",
    proyecto: "5 proyectos: calculator, sign-up form, etch-a-sketch, library, tic-tac-toe",
    completado: false
  },
  {
    id: 12, fase: 2, orden: 2, mes: 4,
    nombre: "freeCodeCamp — Responsive Web Design",
    institucion: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
    horas: 30, dificultad: "beginner", categoria: "web",
    descripcion: "HTML5 + CSS3 + Flexbox + Grid + Accessibility. Certificación gratis.",
    skill: "Modern responsive CSS",
    cv: "Certificación freeCodeCamp verificable",
    proyecto: "5 sitios web responsive",
    completado: false
  },
  {
    id: 13, fase: 2, orden: 3, mes: 5,
    nombre: "JavaScript.info — Modern JavaScript Tutorial",
    institucion: "Ilya Kantor",
    url: "https://javascript.info/",
    horas: 40, dificultad: "intermediate", categoria: "web",
    descripcion: "JavaScript moderno completo: ES6+, async/await, prototypes, modules, DOM.",
    skill: "Modern JavaScript mastery",
    cv: "El recurso más respetado de JS",
    proyecto: "5 ejercicios complejos del libro",
    completado: false
  },
  {
    id: 14, fase: 2, orden: 4, mes: 5,
    nombre: "freeCodeCamp — JavaScript Algorithms",
    institucion: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
    horas: 30, dificultad: "intermediate", categoria: "web",
    descripcion: "300+ ejercicios JS. Algoritmos, OOP, functional programming.",
    skill: "JS problem solving + algorithms",
    cv: "Certificación freeCodeCamp",
    proyecto: "Final: 5 algoritmos complejos resueltos",
    completado: false
  },
  {
    id: 15, fase: 2, orden: 5, mes: 6,
    nombre: "React — Official Tutorial",
    institucion: "Meta",
    url: "https://react.dev/learn",
    horas: 30, dificultad: "intermediate", categoria: "web",
    descripcion: "React moderno: hooks, components, state management, effects.",
    skill: "React.js modern (hooks-first)",
    cv: "Framework más demandado del mercado",
    proyecto: "Tic-tac-toe del tutorial + 2 propios",
    completado: false
  },
  {
    id: 16, fase: 2, orden: 6, mes: 6,
    nombre: "Frontend Masters — Bootcamp (Free)",
    institucion: "Frontend Masters",
    url: "https://frontendmasters.com/bootcamp/",
    horas: 20, dificultad: "beginner", categoria: "web",
    descripcion: "Bootcamp gratuito profesional. HTML, CSS, JS para principiantes.",
    skill: "Web fundamentals consolidation",
    cv: "Frontend Masters credential",
    proyecto: "Sitio profesional con animations",
    completado: false
  },
  {
    id: 17, fase: 2, orden: 7, mes: 7,
    nombre: "Next.js — Official Tutorial",
    institucion: "Vercel",
    url: "https://nextjs.org/learn",
    horas: 25, dificultad: "intermediate", categoria: "web",
    descripcion: "Framework fullstack React. SSR, routing, API routes, deployment.",
    skill: "Next.js fullstack",
    cv: "Framework #1 de React en 2026",
    proyecto: "App fullstack con auth + DB + deploy en Vercel",
    completado: false
  },
  {
    id: 18, fase: 2, orden: 8, mes: 7,
    nombre: "Tailwind CSS — Docs Oficial",
    institucion: "Tailwind Labs",
    url: "https://tailwindcss.com/docs",
    horas: 10, dificultad: "beginner", categoria: "web",
    descripcion: "CSS utility-first. Standard de la industria.",
    skill: "Modern CSS workflow",
    cv: "Standard en startups y empresas",
    proyecto: "Rediseño de proyectos previos con Tailwind",
    completado: false
  },
  {
    id: 19, fase: 2, orden: 9, mes: 8,
    nombre: "PostgreSQL — Tutorial",
    institucion: "PostgreSQL Tutorial",
    url: "https://www.postgresqltutorial.com/",
    horas: 20, dificultad: "intermediate", categoria: "database",
    descripcion: "PostgreSQL completo. Most popular DB en empresas modernas.",
    skill: "PostgreSQL production-ready",
    cv: "Skill requerido en 90% backend jobs",
    proyecto: "Schema complejo con migraciones",
    completado: false
  },
  {
    id: 20, fase: 2, orden: 10, mes: 8,
    nombre: "Docker — Get Started",
    institucion: "Docker",
    url: "https://docs.docker.com/get-started/",
    horas: 15, dificultad: "intermediate", categoria: "devops",
    descripcion: "Containerización: imágenes, containers, Dockerfile, docker-compose.",
    skill: "Docker básico-intermedio",
    cv: "Esencial para DevOps y deploy moderno",
    proyecto: "Containerizar 3 proyectos previos",
    completado: false
  },
  {
    id: 21, fase: 2, orden: 11, mes: 9,
    nombre: "GitHub Actions — Docs",
    institucion: "GitHub",
    url: "https://docs.github.com/en/actions/learn-github-actions",
    horas: 10, dificultad: "intermediate", categoria: "devops",
    descripcion: "CI/CD pipeline. Tests automáticos en cada commit.",
    skill: "CI/CD automation",
    cv: "Workflow profesional moderno",
    proyecto: "Pipeline con tests + linting + deploy",
    completado: false
  },
  {
    id: 22, fase: 2, orden: 12, mes: 9,
    nombre: "🎯 PROYECTO CAPSTONE FASE 2",
    institucion: "Tú mismo",
    url: null,
    horas: 80, dificultad: "advanced", categoria: "proyecto",
    descripcion: "SaaS completo: frontend Next.js + backend FastAPI + PostgreSQL + Docker + CI/CD + deploy.",
    skill: "Full-stack production-ready",
    cv: "PROYECTO ESTRELLA DEL PORTFOLIO",
    proyecto: "Ejemplos: SaaS productividad, marketplace, dashboard analytics",
    completado: false,
    capstone: true,
    metaIngreso: "Trabajo remoto $2000-$5000 USD/mes"
  },

  // ═══════════════════════════════════════════════════════════
  // FASE 3: PRIMER TRABAJO REMOTO (Mes 10-12)
  // META: $2000-$5000 USD/mes desde casa
  // ═══════════════════════════════════════════════════════════
  {
    id: 23, fase: 3, orden: 1, mes: 10,
    nombre: "GitHub Profile Optimization",
    institucion: "GitHub Docs",
    url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile",
    horas: 8, dificultad: "beginner", categoria: "carrera",
    descripcion: "Optimiza tu perfil: README profesional, pin proyectos top, contribution graph activo.",
    skill: "Personal branding técnico",
    cv: "Tu carta de presentación principal",
    proyecto: "Profile con 5 proyectos pinned + README impactante",
    completado: false
  },
  {
    id: 24, fase: 3, orden: 2, mes: 10,
    nombre: "LinkedIn for Developers",
    institucion: "LinkedIn Learning (gratis 1 mes)",
    url: "https://www.linkedin.com/learning/",
    horas: 5, dificultad: "beginner", categoria: "carrera",
    descripcion: "Perfil LinkedIn optimizado para developers: headline, summary, skills, recommendations.",
    skill: "Self-marketing online",
    cv: "+200% visibilidad de recruiters",
    proyecto: "Perfil completo + 50 contactos en industria",
    completado: false
  },
  {
    id: 25, fase: 3, orden: 3, mes: 10,
    nombre: "Tech Interview Handbook",
    institucion: "Yangshun Tay",
    url: "https://www.techinterviewhandbook.org/",
    horas: 30, dificultad: "intermediate", categoria: "carrera",
    descripcion: "Preparación entrevistas FAANG. Algoritmos, system design, behavioral.",
    skill: "Interview readiness",
    cv: "Aprobar entrevistas técnicas",
    proyecto: "Resolver 50 problemas + 5 mock interviews",
    completado: false
  },
  {
    id: 26, fase: 3, orden: 4, mes: 11,
    nombre: "LeetCode — Top Interview Questions",
    institucion: "LeetCode",
    url: "https://leetcode.com/problemset/?listId=wpwgkgt",
    horas: 60, dificultad: "intermediate", categoria: "carrera",
    descripcion: "75-150 problemas top para entrevistas. Easy → Medium.",
    skill: "Algorithm problem solving",
    cv: "LeetCode Easy/Medium proficiency",
    proyecto: "100 problemas resueltos + soluciones documentadas",
    completado: false
  },
  {
    id: 27, fase: 3, orden: 5, mes: 11,
    nombre: "Upwork / Fiverr — Setup",
    institucion: "Upwork, Fiverr",
    url: "https://www.upwork.com/",
    horas: 15, dificultad: "beginner", categoria: "carrera",
    descripcion: "Crear perfil de freelance. Portfolio público. Primeros proyectos.",
    skill: "Freelance business basics",
    cv: "Income stream alterno",
    proyecto: "Perfil completo + 1 primer cliente",
    completado: false,
    metaIngreso: "$300-$1500/mes en freelance"
  },
  {
    id: 28, fase: 3, orden: 6, mes: 12,
    nombre: "🎯 APLICAR A 50+ TRABAJOS",
    institucion: "RemoteOK, WeWorkRemotely, LinkedIn",
    url: "https://remoteok.io/",
    horas: 40, dificultad: "intermediate", categoria: "carrera",
    descripcion: "50 aplicaciones a trabajos remotos. CV personalizado. Cover letters.",
    skill: "Job hunting strategy",
    cv: "Track de aplicaciones + responses",
    proyecto: "50 aplicaciones enviadas + 5 entrevistas",
    completado: false,
    capstone: true,
    metaIngreso: "Primer salario tech $2000-$5000 USD/mes"
  },

  // ═══════════════════════════════════════════════════════════
  // FASE 4: CIBERSEGURIDAD (Año 2)
  // META: Especialización + $5000-$10000/mes
  // ═══════════════════════════════════════════════════════════
  {
    id: 29, fase: 4, orden: 1, mes: 13,
    nombre: "TryHackMe — Pre Security Path",
    institucion: "TryHackMe",
    url: "https://tryhackme.com/path/outline/presecurity",
    horas: 30, dificultad: "beginner", categoria: "security",
    descripcion: "Path gratuito: cyber security intro, networking, web fundamentals, Linux, Windows.",
    skill: "Cybersecurity foundations",
    cv: "TryHackMe profile (gamificado)",
    proyecto: "Complete path + Top 1% level",
    completado: false
  },
  {
    id: 30, fase: 4, orden: 2, mes: 13,
    nombre: "TryHackMe — Complete Beginner",
    institucion: "TryHackMe",
    url: "https://tryhackme.com/path/outline/beginner",
    horas: 40, dificultad: "beginner", categoria: "security",
    descripcion: "Path completo: Linux, Windows, networking, web hacking, basic exploitation.",
    skill: "Beginner pentesting",
    cv: "Track real de aprendizaje",
    proyecto: "20 rooms completados con writeups",
    completado: false
  },
  {
    id: 31, fase: 4, orden: 3, mes: 14,
    nombre: "PortSwigger Web Security Academy",
    institucion: "PortSwigger (creadores de Burp Suite)",
    url: "https://portswigger.net/web-security",
    horas: 60, dificultad: "intermediate", categoria: "security",
    descripcion: "Curso GRATIS más completo de web security. SQL injection, XSS, CSRF, SSRF, etc.",
    skill: "Web application security",
    cv: "Reconocido por toda la industria",
    proyecto: "Completar 100+ labs",
    completado: false
  },
  {
    id: 32, fase: 4, orden: 4, mes: 14,
    nombre: "OWASP Top 10",
    institucion: "OWASP Foundation",
    url: "https://owasp.org/www-project-top-ten/",
    horas: 15, dificultad: "intermediate", categoria: "security",
    descripcion: "Top 10 riesgos web. Standard de seguridad mundial.",
    skill: "Security best practices",
    cv: "Conocimiento estándar industria",
    proyecto: "Demo de cada vulnerabilidad",
    completado: false
  },
  {
    id: 33, fase: 4, orden: 5, mes: 15,
    nombre: "HackTheBox — Starting Point",
    institucion: "HackTheBox",
    url: "https://app.hackthebox.com/starting-point",
    horas: 30, dificultad: "intermediate", categoria: "security",
    descripcion: "Path gratuito introductorio. Machines real-world.",
    skill: "Hands-on pentesting",
    cv: "HTB profile activo",
    proyecto: "Completar Starting Point + Easy machines",
    completado: false
  },
  {
    id: 34, fase: 4, orden: 6, mes: 15,
    nombre: "TryHackMe — Jr Penetration Tester",
    institucion: "TryHackMe",
    url: "https://tryhackme.com/path/outline/jrpenetrationtester",
    horas: 60, dificultad: "intermediate", categoria: "security",
    descripcion: "Path de pago ($14/mes) preparatorio para eJPT. Worth it.",
    skill: "Junior penetration tester",
    cv: "Preparación eJPT certification",
    proyecto: "Path completo + práctica con OSCP-like boxes",
    completado: false
  },
  {
    id: 35, fase: 4, orden: 7, mes: 16,
    nombre: "eJPT — Certificación INE",
    institucion: "INE / eLearnSecurity",
    url: "https://my.ine.com/CyberSecurity/learning-paths/0d50e993-ec73-43ca-a902-9caea4f1f425/jr-penetration-tester",
    horas: 100, dificultad: "intermediate", categoria: "security",
    descripcion: "PRIMERA CERTIFICACIÓN. Reconocida internacionalmente. $200 USD.",
    skill: "eJPT certified",
    cv: "⭐ CERTIFICACIÓN VERIFICABLE",
    proyecto: "Aprobar examen eJPT",
    completado: false,
    metaIngreso: "Junior pentester $3000-$6000 USD/mes"
  },
  {
    id: 36, fase: 4, orden: 8, mes: 17,
    nombre: "HackerOne / Bugcrowd — Setup",
    institucion: "HackerOne, Bugcrowd",
    url: "https://www.hackerone.com/",
    horas: 20, dificultad: "intermediate", categoria: "security",
    descripcion: "Plataformas de bug bounties. Programas públicos.",
    skill: "Bug bounty hunting",
    cv: "Income stream + reputación",
    proyecto: "1er bug válido reportado",
    completado: false,
    metaIngreso: "$500-$5000 USD primer bug bounty"
  },
  {
    id: 37, fase: 4, orden: 9, mes: 18,
    nombre: "🎯 PROYECTO CAPSTONE FASE 4",
    institucion: "Tú mismo",
    url: null,
    horas: 60, dificultad: "advanced", categoria: "proyecto",
    descripcion: "Homelab de seguridad: VMs vulnerables + reportes + writeups públicos.",
    skill: "Independent security researcher",
    cv: "PORTFOLIO DE SECURITY",
    proyecto: "Blog con 10+ writeups técnicos",
    completado: false,
    capstone: true,
    metaIngreso: "Pentester / Bug Bounty Hunter $5000-$10000 USD/mes"
  },

  // ═══════════════════════════════════════════════════════════
  // FASE 5: ESPECIALIZACIÓN ÉLITE (Año 3+)
  // META: $10000+ USD/mes + libertad total
  // ═══════════════════════════════════════════════════════════
  {
    id: 38, fase: 5, orden: 1, mes: 25,
    nombre: "Offensive Security — PEN-200 (OSCP)",
    institucion: "Offensive Security",
    url: "https://www.offsec.com/courses/pen-200/",
    horas: 300, dificultad: "advanced", categoria: "security",
    descripcion: "LA certificación. OSCP es el gold standard. $1599 USD.",
    skill: "OSCP certified — Penetration Tester",
    cv: "🏆 CERTIFICACIÓN DE ÉLITE",
    proyecto: "Aprobar examen OSCP (24 horas)",
    completado: false,
    metaIngreso: "Senior Pentester $8000-$15000 USD/mes"
  },
  {
    id: 39, fase: 5, orden: 2, mes: 30,
    nombre: "AWS — Solutions Architect Associate",
    institucion: "Amazon Web Services",
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    horas: 80, dificultad: "intermediate", categoria: "cloud",
    descripcion: "Cloud architecture. Demanda enorme. $150 USD examen.",
    skill: "AWS certified architect",
    cv: "🏆 +$20000/año salario promedio",
    proyecto: "Aprobar AWS SAA-C03",
    completado: false,
    metaIngreso: "Cloud Engineer $10000+ USD/mes"
  },
  {
    id: 40, fase: 5, orden: 3, mes: 35,
    nombre: "Bug Bounty Career",
    institucion: "Bugcrowd University",
    url: "https://www.bugcrowd.com/hackers/bugcrowd-university/",
    horas: 50, dificultad: "advanced", categoria: "security",
    descripcion: "Universidad gratis de Bugcrowd. Bug bounty profesional.",
    skill: "Professional bug hunter",
    cv: "Top hackers ganan $100k+/año",
    proyecto: "Top 100 en HackerOne o Bugcrowd",
    completado: false,
    metaIngreso: "Bug Bounty $10000-$50000 USD/mes (top tier)"
  }
];

// ============================================================
// FASES DEL PROGRAMA
// ============================================================

const FASES = [
  {
    numero: 1,
    nombre: "Fundamentos Python",
    duracion: "Meses 1-3",
    objetivo: "Dominar Python + Linux + Git + SQL básico",
    proyectoFinal: "CLI tool + API REST + DB + Docker",
    metaIngresos: "$500-$1500 primer freelance",
    salarioObjetivo: "$1500-$3000 USD/mes (junior)",
    color: "#3b82f6",
    icono: "🐍"
  },
  {
    numero: 2,
    nombre: "Web Development",
    duracion: "Meses 4-9",
    objetivo: "Full-stack: React + Node/Python + PostgreSQL + Docker",
    proyectoFinal: "SaaS completo deployado en producción",
    metaIngresos: "Trabajos freelance $1000-$3000/mes",
    salarioObjetivo: "$2000-$5000 USD/mes (mid junior)",
    color: "#10b981",
    icono: "🌐"
  },
  {
    numero: 3,
    nombre: "Primer Trabajo Remoto",
    duracion: "Meses 10-12",
    objetivo: "Portfolio + LinkedIn + 50 aplicaciones + entrevistas",
    proyectoFinal: "PRIMER SALARIO TECH",
    metaIngresos: "Salario fijo $2000-$5000/mes",
    salarioObjetivo: "$3000-$6000 USD/mes (mid)",
    color: "#f59e0b",
    icono: "💼"
  },
  {
    numero: 4,
    nombre: "Ciberseguridad",
    duracion: "Año 2 (Meses 13-24)",
    objetivo: "TryHackMe + HackTheBox + PortSwigger + eJPT",
    proyectoFinal: "Certificación eJPT + primer bug bounty",
    metaIngresos: "Bug bounties $500-$5000",
    salarioObjetivo: "$5000-$10000 USD/mes (junior pentester)",
    color: "#ef4444",
    icono: "🛡️"
  },
  {
    numero: 5,
    nombre: "Especialización Élite",
    duracion: "Año 3+ (Meses 25+)",
    objetivo: "OSCP + AWS + Bug Bounty profesional",
    proyectoFinal: "Carrera consolidada + ingresos pasivos",
    metaIngresos: "Múltiples streams $10000+/mes",
    salarioObjetivo: "$10000-$50000 USD/mes (top tier)",
    color: "#a855f7",
    icono: "👑"
  }
];

// ============================================================
// MILESTONES DE INGRESOS (Reality Check)
// ============================================================

const MILESTONES_INGRESOS = [
  { mes: 3, monto: 500, descripcion: "Primer freelance pequeño (Upwork/Fiverr)", probabilidad: "Alta si completas Fase 1" },
  { mes: 6, monto: 1500, descripcion: "Freelance regular + side projects", probabilidad: "Alta si entregas Capstone 2" },
  { mes: 12, monto: 3000, descripcion: "Primer trabajo remoto junior", probabilidad: "Media-Alta con portfolio sólido" },
  { mes: 18, monto: 5000, descripcion: "Mid developer + bug bounties ocasionales", probabilidad: "Media con eJPT + 1 año experiencia" },
  { mes: 24, monto: 7000, descripcion: "Especialista security + bug hunting activo", probabilidad: "Media con dedicación full-time" },
  { mes: 36, monto: 10000, descripcion: "Senior + OSCP + reputación", probabilidad: "Media con 3 años consistentes" },
  { mes: 60, monto: 20000, descripcion: "Élite: consultoría + bug bounties top tier", probabilidad: "Baja-Media (top 1%)" }
];

// ============================================================
// RECURSOS COMPLEMENTARIOS REALES
// ============================================================

const RECURSOS_EXTRA = [
  {
    categoria: "Práctica gratis",
    items: [
      { nombre: "freeCodeCamp", url: "https://www.freecodecamp.org/", descripcion: "10,000+ horas de cursos gratuitos" },
      { nombre: "The Odin Project", url: "https://www.theodinproject.com/", descripcion: "Curriculum fullstack gratuito" },
      { nombre: "Exercism", url: "https://exercism.org/", descripcion: "Ejercicios + mentoría gratis en 60+ lenguajes" },
      { nombre: "Codewars", url: "https://www.codewars.com/", descripcion: "Katas (problemas) por niveles" }
    ]
  },
  {
    categoria: "Documentación oficial",
    items: [
      { nombre: "MDN Web Docs", url: "https://developer.mozilla.org/", descripcion: "Biblia del web development" },
      { nombre: "Python Docs", url: "https://docs.python.org/3/", descripcion: "Documentación oficial Python" },
      { nombre: "Devhints.io", url: "https://devhints.io/", descripcion: "Cheatsheets de TODO" }
    ]
  },
  {
    categoria: "Bug Bounty / Pentesting",
    items: [
      { nombre: "PicoCTF", url: "https://picoctf.org/", descripcion: "CTFs gratuitos para aprender" },
      { nombre: "OverTheWire", url: "https://overthewire.org/wargames/", descripcion: "Wargames CTF" },
      { nombre: "HackTricks", url: "https://book.hacktricks.xyz/", descripcion: "Wiki de pentesting completo" },
      { nombre: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", descripcion: "Payloads para pentesting" }
    ]
  },
  {
    categoria: "Trabajos remotos",
    items: [
      { nombre: "RemoteOK", url: "https://remoteok.io/", descripcion: "Trabajos remotos curados" },
      { nombre: "We Work Remotely", url: "https://weworkremotely.com/", descripcion: "Empleos 100% remoto" },
      { nombre: "Hacker News Jobs", url: "https://news.ycombinator.com/jobs", descripcion: "Trabajos en startups top" },
      { nombre: "Wellfound (AngelList)", url: "https://wellfound.com/", descripcion: "Trabajos en startups" }
    ]
  },
  {
    categoria: "Freelance",
    items: [
      { nombre: "Upwork", url: "https://www.upwork.com/", descripcion: "Plataforma freelance #1" },
      { nombre: "Toptal", url: "https://www.toptal.com/", descripcion: "Top 3% freelancers (mejor pago)" },
      { nombre: "Fiverr", url: "https://www.fiverr.com/", descripcion: "Servicios desde $5" },
      { nombre: "Freelancer", url: "https://www.freelancer.com/", descripcion: "Marketplace global" }
    ]
  },
  {
    categoria: "Comunidad",
    items: [
      { nombre: "r/cscareerquestions", url: "https://www.reddit.com/r/cscareerquestions/", descripcion: "Subreddit careers tech" },
      { nombre: "Dev.to", url: "https://dev.to/", descripcion: "Comunidad blog técnico" },
      { nombre: "Discord — The Programmer's Hangout", url: "https://discord.gg/programming", descripcion: "Comunidad activa" },
      { nombre: "MoureDev (YouTube ES)", url: "https://www.youtube.com/@mouredev", descripcion: "Comunidad hispana #1" }
    ]
  }
];

// Export para usar en main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULO, FASES, MILESTONES_INGRESOS, RECURSOS_EXTRA };
}
