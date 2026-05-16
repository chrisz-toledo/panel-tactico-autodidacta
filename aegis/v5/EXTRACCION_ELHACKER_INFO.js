// Extracción y análisis de fuentes de elhacker.info
// Filtro de alta calidad para integración en AEGIS

const fs = require('fs');

// Fuentes extraídas de elhacker.info - Categorías de alta relevancia
const fuentesElHacker = {
  // 🔴 PRIORIDAD CRÍTICA: Seguridad (Año 5-6) - Faltantes identificados
  seguridadCritica: [
    { name: "Active Directory Exploitation and Lateral Movement Black-Box", category: "security", icon: "🛡️", level: "avanzado", desc: "AD Pentesting: Domain Privilege Escalation, Cross-Forest Trust Attacks, BloodHound, PowerView.", tactical: "CRÍTICO Año 5-6: Active Directory pentesting real.", priority: "CRÍTICA" },
    { name: "Active Directory Pentesting With Kali Linux-RedTeam", category: "security", icon: "🛡️", level: "avanzado", desc: "Red Team AD: Domain Enumeration, Lateral Movement, PowerShell Empire, EvilWinRM.", tactical: "CRÍTICO Año 5-6: AD completo con Kali.", priority: "CRÍTICA" },
    { name: "Advanced Malware Analysis Redux", category: "security", icon: "☠️", level: "avanzado", desc: "Reverse Engineering, x86/x64 Architecture, Dynamic/Static Analysis, Memory Forensics.", tactical: "CRÍTICO Año 5-6: Malware Analysis avanzado.", priority: "CRÍTICA" },
    { name: "Android Malware Analysis", category: "security", icon: "📱", level: "intermedio", desc: "Análisis de malware móvil: Static/Dynamic Analysis, Reverse Engineering APKs.", tactical: "CRÍTICO: Expansión a mobile security.", priority: "ALTA" },
    { name: "ABCs of Malware Analysis", category: "security", icon: "☠️", level: "principiante", desc: "Fundamentos de análisis de malware para principiantes.", tactical: "Base para Malware Analysis.", priority: "ALTA" },
    { name: "YARA Malware Analysis and Threat Detection", category: "security", icon: "🔍", level: "intermedio", desc: "YARA rules, RAT detection, Crypto P2P, Ransomware identification.", tactical: "Threat detection profesional.", priority: "ALTA" },
    { name: "Zero Point Security - Red Team Ops 2025.2", category: "security", icon: "🔴", level: "avanzado", desc: "Red Team completo: C2, Lateral Movement, Kerberos, ADCS, Pivoting, Domain Dominance.", tactical: "CRÍTICO: Red Team profesional moderno.", priority: "CRÍTICA" },
    { name: "zSecurity - Learn Ethical Hacking From Scratch 2024", category: "security", icon: "🛡️", level: "intermedio", desc: "Hacking ético completo: Network, Web, Gaining Access, Post Exploitation.", tactical: "Hacking ético integral.", priority: "ALTA" },
    { name: "Ultimate Ethical Hacking and Penetration Testing (UEH)", category: "security", icon: "⚔️", level: "avanzado", desc: "Pentesting completo: x86 Assembly, Fuzzing, Buffer Overflows, Shellcoding, Active Directory.", tactical: "Pentesting con exploit development.", priority: "CRÍTICA" },
    { name: "Wifi Hacking Series For Red Teamers & Pentesters", category: "security", icon: "📡", level: "intermedio", desc: "WiFi pentesting: Evil Twin, WPA Cracking, Wifi Pineapple, Raspberry Pi.", tactical: "Wireless security assessment.", priority: "MEDIA" },
    { name: "Windows Post Exploitation", category: "security", icon: "🪟", level: "avanzado", desc: "Post-explotación Windows: Privilege Escalation, Persistence, Lateral Movement.", tactical: "Post-explotación Windows.", priority: "ALTA" },
    { name: "Windows Registry Forensics", category: "security", icon: "🔎", level: "intermedio", desc: "Forense Windows Registry: NTUser.DAT, SAM, Software, System hives.", tactical: "Forense Windows avanzado.", priority: "ALTA" },
    { name: "Web Application Hacking and Penetration Testing", category: "security", icon: "🕸️", level: "intermedio", desc: "Web pentesting: Vulnerabilities, Kali Linux tools, WAFs.", tactical: "Web security testing.", priority: "ALTA" },
    { name: "Web Ethical Hacking Bug Bounty Course", category: "security", icon: "💰", level: "intermedio", desc: "Bug Bounty: Recon, Vulnerability Discovery, Reporting.", tactical: "Monetización: Bug Bounty hunting.", priority: "ALTA" },
    { name: "Blue Team Security Foundations Course", category: "security", icon: "🔵", level: "intermedio", desc: "Blue Team: Defense, Monitoring, Incident Response.", tactical: "Defensa y detección.", priority: "ALTA" },
    { name: "Blue Team Tools Path", category: "security", icon: "🔧", level: "intermedio", desc: "Blue Team práctico: Network Analysis, OS Analysis, File Analysis, Threat Intelligence.", tactical: "Herramientas Blue Team.", priority: "ALTA" },
    { name: "Automobile Hacking and Security v2.0", category: "security", icon: "🚗", level: "avanzado", desc: "CAN Bus, CAN-utils, OBD2, MCP2515, reverse engineering vehículos.", tactical: "IoT/Automotive hacking especializado.", priority: "MEDIA" }
  ],

  // 🟡 PRIORIDAD ALTA: Cloud Security (Año 5-6) - Gap identificado
  cloud: [
    { name: "AWS Certified Solutions Architect - Professional 2023", category: "cloud", icon: "☁️", level: "avanzado", desc: "AWS SAA-C03: Multi-Account, VPC, Serverless, Security, Disaster Recovery.", tactical: "CRÍTICO: Cloud Architecture AWS.", priority: "CRÍTICA" },
    { name: "AWS Cloud Red Team Specialist [CARTS]", category: "cloud", icon: "🔴", level: "avanzado", desc: "AWS Red Teaming: IAM, EC2, Lambda, S3, Secrets Manager, RDS, Containers.", tactical: "CRÍTICO: Cloud Red Team AWS.", priority: "CRÍTICA" },
    { name: "Azure Security Engineer Associate (AZ-500)", category: "cloud", icon: "🔵", level: "intermedio", desc: "Azure Security: Implement security controls, identity protection.", tactical: "Azure Security certificación.", priority: "ALTA" },
    { name: "Altered Security - Certified Azure Red Team Professional (CARTP)", category: "cloud", icon: "🔴", level: "avanzado", desc: "Azure Red Team: Labs, walkthroughs, técnicas ofensivas en Azure.", tactical: "Azure Red Team profesional.", priority: "CRÍTICA" },
    { name: "Ultimate AWS Certified SysOps Administrator Associate", category: "cloud", icon: "⚙️", level: "intermedio", desc: "AWS SysOps: EC2, S3, RDS, CloudFormation, Beanstalk, monitoring.", tactical: "Administración AWS.", priority: "ALTA" }
  ],

  // 🟢 PRIORIDAD MEDIA: Programación y Sistemas (Complemento)
  programacion: [
    { name: "64-Bit Assembly & Shellcoding for Ethical Hackers", category: "systems", icon: "🦀", level: "avanzado", desc: "Assembly x86_64, Shellcoding, Buffer Overflows, Exploit Dev.", tactical: "Exploit development bajo nivel.", priority: "ALTA" },
    { name: "x86x64 Assembly Language for Cybersecurity Maniacs", category: "systems", icon: "🧩", level: "avanzado", desc: "MASM x64, SYSCALL, Self-Modifying Code, AVX, SSE.", tactical: "Assembly avanzado para seguridad.", priority: "ALTA" },
    { name: "Assembly Language Programming for Reverse Engineering", category: "systems", icon: "🔧", level: "intermedio", desc: "Assembly para RE: Code Caves, Functions, Flags, Jumps.", tactical: "Reverse Engineering con Assembly.", priority: "ALTA" },
    { name: "Assembly 101", category: "systems", icon: "💻", level: "intermedio", desc: "x86-16 y x86-64: Registers, MOV, Memory, Loops, Functions.", tactical: "Fundamentos Assembly.", priority: "MEDIA" },
    { name: "Write Your Own Operating System From Scratch", category: "systems", icon: "🖥️", level: "avanzado", desc: "OS Development: Boot, Long Mode, Interrupts, Memory Management, Processes.", tactical: "OS Development avanzado.", priority: "MEDIA" },
    { name: "Working with Pointers and Arrays in C++ 20", category: "systems", icon: "🎯", level: "avanzado", desc: "C++20: Pointers, Dynamic Memory, Modern C++ abstractions.", tactical: "C++ moderno y memoria.", priority: "MEDIA" },
    { name: "Beginning C++ Programming - From Beginner to Beyond", category: "systems", icon: "💻", level: "intermedio", desc: "C++ completo: OOP, STL, Smart Pointers, Lambdas.", tactical: "C++ profesional completo.", priority: "MEDIA" },
    { name: "ZeroToMastery - DevOps Bootcamp: Linux Sysadmin", category: "devops", icon: "🐧", level: "intermedio", desc: "Linux profundo: Terminal, File System, Bash, Docker, Ansible, DNS.", tactical: "Linux Sysadmin profesional.", priority: "ALTA" }
  ],

  // 🔵 PRIORIDAD MEDIA: IA/ML Avanzado (Año 7-8) - Complemento
  iaAvanzado: [
    { name: "ZTM - Developing LLM Apps with LangChain", category: "ai", icon: "🤖", level: "intermedio", desc: "LangChain, Vector Stores (Pinecone), RAG, Gemini, Proyecto Q&A.", tactical: "CRÍTICO: LangChain y RAG práctico.", priority: "CRÍTICA" },
    { name: "AI Governance Professional (AIGP) Certification", category: "ai", icon: "⚖️", level: "intermedio", desc: "AI Governance: Ethics, Compliance, Risk Management, Regulatory Frameworks.", tactical: "Gobernanza y ética IA.", priority: "MEDIA" }
  ],

  // 🟠 Cursos Generales / Misceláneos (No prioritarios)
  otros: [
    { name: "Universidad Hacking - Todo en Ciberseguridad", category: "security", icon: "🎓", level: "intermedio", desc: "Curso integral: Python, Redes, Metasploit, Malware, Móvil, Privacidad.", tactical: "Curso integral español.", priority: "MEDIA" },
    { name: "Aprende Pentesting Avanzado", category: "security", icon: "⚔️", level: "avanzado", desc: "Pentesting en español.", tactical: "Pentesting hispanohablante.", priority: "MEDIA" }
  ]
};

// Calcular totales por prioridad
const allSources = [...fuentesElHacker.seguridadCritica, ...fuentesElHacker.cloud, ...fuentesElHacker.programacion, ...fuentesElHacker.iaAvanzado, ...fuentesElHacker.otros];

const byPriority = {
  CRÍTICA: allSources.filter(s => s.priority === "CRÍTICA"),
  ALTA: allSources.filter(s => s.priority === "ALTA"),
  MEDIA: allSources.filter(s => s.priority === "MEDIA")
};

console.log('=== EXTRACCIÓN ELHACKER.INFO ===\n');
console.log(`Total fuentes identificadas: ${allSources.length}`);
console.log(`Prioridad CRÍTICA: ${byPriority.CRÍTICA.length}`);
console.log(`Prioridad ALTA: ${byPriority.ALTA.length}`);
console.log(`Prioridad MEDIA: ${byPriority.MEDIA.length}\n`);

console.log('--- FUENTES CRÍTICAS PARA INTEGRAR ---');
byPriority.CRÍTICA.forEach((s, i) => {
  console.log(`${i+1}. [${s.category}] ${s.name}`);
  console.log(`   Tactical: ${s.tactical}\n`);
});

console.log('\n--- RECOMENDACIÓN DE INTEGRACIÓN ---');
console.log(`Se recomiendan ${byPriority.CRÍTICA.length} fuentes CRÍTICAS para integrar inmediatamente.`);
console.log(`Esto cubriría los gaps de:`);
console.log(`  - Active Directory (3 cursos)`);
console.log(`  - Malware Analysis (4 cursos)`);
console.log(`  - Cloud Red Team (3 cursos)`);
console.log(`  - Pentesting Avanzado (2 cursos)`);
console.log(`  - LangChain/RAG (1 curso)`);

// Generar formato AEGIS para fuentes críticas
const aegisFormat = byPriority.CRÍTICA.map((s, index) => ({
  id: 121 + index,
  name: s.name,
  category: s.category,
  icon: s.icon,
  url: "#",
  desc: s.desc,
  tactical: s.tactical
}));

console.log('\n--- FORMATO AEGIS (LISTO PARA COPIAR) ---');
aegisFormat.forEach(item => {
  console.log(`  { id: ${item.id}, name: "${item.name}", category: "${item.category}", icon: "${item.icon}", url: "${item.url}", desc: "${item.desc}", tactical: "${item.tactical}" },`);
});

// Guardar JSON para integración
const output = {
  metadata: {
    fuente: "elhacker.info/descargas.html",
    fecha_extraccion: new Date().toISOString(),
    total_analizadas: allSources.length,
    criticas: byPriority.CRÍTICA.length,
    altas: byPriority.ALTA.length,
    medias: byPriority.MEDIA.length
  },
  fuentes_criticas: aegisFormat,
  todas_las_fuentes: allSources
};

fs.writeFileSync('/Users/christiantoledo/Desarrollo/00-Learning/aegis/v5/ELHACKER_FUENTES_INTEGRAR.json', JSON.stringify(output, null, 2));
console.log('\n✅ Archivo guardado: ELHACKER_FUENTES_INTEGRAR.json');
