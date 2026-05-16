/**
 * PromptEngine.js — Generador de Prompts Pedagógicos
 * AEGIS v6.0
 * 
 * Arquitectura extensible: registra generadores nuevos sin modificar código existente.
 * Genera prompts para IA externa (Gemini, Claude, etc.) basados en fuentes de estudio.
 */

import { escapeHtml } from '../utils/sanitizers.js';

class PromptEngine {
  constructor() {
    this.generators = new Map();
    this.registerDefaults();
  }

  registerDefaults() {
    this.register('socratic', new SocraticGenerator());
    this.register('notebooklm', new NotebookLMGenerator());
    this.register('plan', new StudyPlanGenerator());
    this.register('audioclase', new AudioClassGenerator());
    this.register('code_review', new CodeReviewGenerator());
    this.register('master', new MasterPromptGenerator());
  }

  /**
   * Registra un nuevo generador de prompts
   * @param {string} type — Identificador del tipo
   * @param {Object} generator — Objeto con método generate()
   */
  register(type, generator) {
    if (!generator || typeof generator.generate !== 'function') {
      throw new Error(`Generator ${type} debe tener método generate()`);
    }
    this.generators.set(type, generator);
  }

  /**
   * Genera un prompt del tipo especificado
   * @param {string} type — Tipo de prompt
   * @param {Object} context — Contexto para el generador
   * @returns {Object} — { system, user, metadata }
   */
  generate(type, context = {}) {
    const generator = this.generators.get(type);
    if (!generator) {
      throw new Error(`Tipo de prompt desconocido: ${type}. Disponibles: ${this.listTypes().join(', ')}`);
    }

    // Sanitizar contexto para prevenir XSS
    const safeContext = this.sanitizeContext(context);
    return generator.generate(safeContext);
  }

  /**
   * Genera múltiples prompts para una sesión completa
   */
  generateSessionPlan(source, energyLevel = 5, availableMinutes = 60) {
    return {
      plan: this.generate('plan', { source, energyLevel, availableMinutes }),
      socratic: this.generate('socratic', { source }),
      notebooklm: this.generate('notebooklm', { source }),
      audioclase: this.generate('audioclase', { source, energyLevel })
    };
  }

  sanitizeContext(context) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(context)) {
      if (typeof value === 'string') {
        sanitized[key] = escapeHtml(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeContext(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  listTypes() {
    return Array.from(this.generators.keys());
  }
}

// ============ GENERADORES ESPECÍFICOS ============

class SocraticGenerator {
  generate({ source, userExplanation = '' }) {
    return {
      system: `Actúa como TUTOR SOCRÁTICO ESTRUCTO. Tu misión es GUÍAR mediante preguntas, NUNCA dar respuestas directas.

PROTOCOLO SOCRÁTICO:
1. Lee la explicación del estudiante cuidadosamente
2. Identifica el error conceptual o vacío específico
3. Formula 3 preguntas progresivas:
   - P1 (Detectar): "¿Por qué crees que...?" — detecta malentendido
   - P2 (Cuestionar): "¿Qué pasaría si...?" — expone contradicción
   - P3 (Reconstruir): "¿Cómo conectas X con Y?" — guía a síntesis
4. Propón un mini-problema de 3-5 líneas para resolver

REGLAS INQUEBRANTABLES:
- NUNCA digas "la respuesta correcta es..."
- NUNCA corrijas directamente
- Si la respuesta es incorrecta, haz otra pregunta guía
- Mantén tono paciente pero incisivo
- Usa analogías cotidianas cuando sea útil`,

      user: `CONTEXTO DE ESTUDIO:
Fuente: ${source?.name || 'No especificada'}
Descripción: ${source?.desc || 'No disponible'}

INTENTO DE EXPLICACIÓN DEL ESTUDIANTE:
${userExplanation || '[El estudiante aún no ha intentado explicar este concepto. Pídele que lo haga primero.]'}

EJECUTA EL PROTOCOLO SOCRÁTICO AHORA.`,

      metadata: {
        type: 'socratic',
        expectedOutput: '3 preguntas guía + mini-problema',
        tone: 'pedagógico, incisivo, paciente',
        language: 'español'
      }
    };
  }
}

class NotebookLMGenerator {
  generate({ source }) {
    return {
      system: `Eres un EDUCADOR EXPERIMENTADO creando un podcast para Notebook LM. Tono: mentor explicando caminando, profesional pero conversacional. Usa "tú" y "nosotros".

ESTRUCTURA OBLIGATORIA (10 minutos totales):
1. HOOK INICIAL (1 min): Conecta con situación cotidiana sorprendente. ¿Por qué esto importa HOY?
2. CONCEPTO PRINCIPAL (4 min): Explicación profunda usando UNA analogía cotidiana:
   - Cocina/Recetas (procesos, ingredientes)
   - Autos/Tráfico (flujos, cuellos de botella)
   - Gym/Deporte (entrenamiento, progresión)
   - Organizar fiesta (coordinación, recursos)
   - Supermercado/Compras (almacenamiento, búsqueda)
3. EJEMPLO PRÁCTICO (3 min): Caso real de aplicación en industria tech
4. ERRORES COMUNES (1 min): Qué NO hacer (la trampa que caen los junior)
5. BRIDGE AL SIGUIENTE TEMA (1 min): Cómo esto conecta con próximos estudios

AL FINAL: 3 preguntas de auto-evaluación que el oyente debería poder responder.

RESTRICCIÓN: Primero explica la analogía COMPLETA, LUEGO mapea a conceptos técnicos.`,

      user: `CREA UN PODCAST EDUCATIVO EN NOTEBOOKLM SOBRE:

TÍTULO: ${source?.name || 'Tema no especificado'}
DESCRIPCIÓN DE LA FUENTE: ${source?.desc || ''}
UTILIDAD TÁCTICA: ${source?.tactical || ''}

GENERA EL GUION COMPLETO SIGUIENDO LA ESTRUCTURA DE 10 MINUTOS.`,

      metadata: {
        type: 'notebooklm',
        format: 'podcast script',
        duration: '10 minutos',
        analogies: ['cocina', 'autos', 'gym', 'supermercado', 'fiesta'],
        language: 'español'
      }
    };
  }
}

class StudyPlanGenerator {
  generate({ source, energyLevel = 5, availableMinutes = 60 }) {
    const pomodoros = Math.floor(availableMinutes / 30); // 25 min + 5 min break
    
    return {
      system: `Eres un PLANIFICADOR DE ESTUDIO experto. Genera planes diarios REALISTAS y EJECUTABLES.

REGLAS:
- Sé específico: qué leer, qué código escribir, qué output producir
- Usa técnica Pomodoro (25 min foco / 5 min descanso)
- Considera nivel de energía del estudiante
- Define criterio de éxito claro y medible`,

      user: `PLAN DE ESTUDIO PERSONALIZADO

FUENTE: ${source?.name}
DESCRIPCIÓN: ${source?.desc}
HORAS ESTIMADAS TOTAL: ${source?.estimated_hours || 'Variable'}

CONTEXTO DE HOY:
- Tiempo disponible: ${availableMinutes} minutos (${pomodoros} pomodoros)
- Nivel de energía: ${energyLevel}/10
- Dificultad de la fuente: ${source?.difficulty || 'medium'}

GENERA:
1. OBJETIVO CLARO (1 oración): ¿Qué dominaré específicamente hoy?
2. DESGLOSE POR POMODOROS:
   ${Array.from({length: pomodoros}, (_, i) => 
     `Pomodoro ${i + 1} (25 min): [actividad específica]`
   ).join('\n   ')}
3. OUTPUT TANGIBLE: ¿Qué archivo/código/documento debo producir?
4. CRITERIO DE ÉXITO: ¿Cómo sé que completé exitosamente?
5. CHECKPOINT FINAL: 3 preguntas rápidas de autoverificación`,

      metadata: {
        type: 'plan',
        format: 'daily study plan',
        pomodoro: '25/5',
        language: 'español'
      }
    };
  }
}

class AudioClassGenerator {
  generate({ source, energyLevel = 5 }) {
    return {
      system: `Crea un GUION COMPLETO para una AudioClase de 8-12 minutos que el estudiante grabará como voice memo.

ESTRUCTURA DEL GUION:
1. GANCHO (30 seg): "Hoy vamos a entender [concepto] usando algo que haces todos los días..."
2. ANTECEDENTE (1 min): ¿Qué problema resolvemos? ¿Por qué es importante?
3. EXPLICACIÓN CON ANALOGÍA (4 min): 
   - Primero explica la analogía cotidiana COMPLETA
   - LUEGO mapea: "En código, eso equivale a..."
4. EJEMPLO PRÁCTICO (3 min): Paso a paso como receta de cocina
5. SEÑALES DE ALERTA (1 min): Errores que cometen quienes empiezan
6. CHECKPOINT (30 seg): 2 preguntas de autoverificación

MARCAS DE TONO (incluir en guion):
[NORMAL] = explicación regular
[ÉNFASIS] = momento clave (subir volumen/énfasis)
[PAUSA 3 SEG] = silencio para que el oyente piense
[DICE EN VOZ ALTA] = "Repite conmigo: ..."

ANALOGÍAS PERMITIDAS: cocina/recetas, autos/tráfico, gym/entreno, organizar fiesta, supermercado, música/playlists.`,

      user: `AUDIOCLASE PARA HOY

TEMA: ${source?.name}
DESCRIPCIÓN: ${source?.desc}
NIVEL: ${source?.difficulty || 'intermedio'}
MI ENERGÍA AHORA: ${energyLevel}/10

CREA EL GUION COMPLETO CON MARCAS DE TONO.`,

      metadata: {
        type: 'audioclase',
        format: 'voice memo script',
        duration: '8-12 minutos',
        language: 'español'
      }
    };
  }
}

class CodeReviewGenerator {
  generate({ code, language, context = '' }) {
    return {
      system: `Actúa como SENIOR ENGINEER de Google/Faang realizando code review. Sé estricto pero constructivo.

CRITERIOS DE EVALUACIÓN:
1. SEGURIDAD: XSS, injection, buffer overflows, secrets expuestos
2. CALIDAD: Naming, DRY, KISS, complejidad ciclomática
3. PERFORMANCE: Algoritmos ineficientes, memory leaks
4. TESTING: Cobertura, edge cases, assertions
5. DOCUMENTACIÓN: Comentarios útiles vs obvios

FORMATO DE SALIDA:
🔴 [CRÍTICO]: Issues que bloquean merge (seguridad, bugs graves)
🟠 [ALTO]: Mejoras importantes (performance, arquitectura)
🟡 [MEDIO]: Sugerencias de estilo y limpieza
🟢 [BUENO]: Lo que está bien hecho (reconocer positivos)

Para cada issue: explicación + ejemplo de código corregido.`,

      user: `CODE REVIEW REQUEST

LENGUAJE: ${language || 'No especificado'}
CONTEXTO: ${context || 'No proporcionado'}

CÓDIGO A REVISAR:
\`\`\`${language || ''}
${code || '[No se proporcionó código]'}
\`\`\`

REALIZA EL ANÁLISIS COMPLETO SIGUIENDO LOS CRITERIOS.`,

      metadata: {
        type: 'code_review',
        format: 'structured review',
        language: 'español'
      }
    };
  }
}

class MasterPromptGenerator {
  generate({ sources, stats, goals }) {
    return {
      system: `Eres un ESTRATEGA DE APRENDIZAJE analizando el progreso de un estudiante autodidacta.

PROVIDENCIA ANÁLISIS ESTRATÉGICO:
1. Evalúa velocidad de progreso (¿adecuada, lenta, rápida?)
2. Identifica desequilibrios (¿demasiada teoría? ¿falta práctica?)
3. Detecta riesgos de burnout o abandono
4. Sugiere ajustes de ruta para las próximas 4 semanas

FORMATO:
- DIAGNÓSTICO: Estado actual en 3 bullets
- RIESGOS: Qué podría salir mal
- ACCIONES: 3 acciones concretas para las próximas 2 semanas
- RECURSOS: Qué herramientas/fuentes priorizar`,

      user: `ANÁLISIS ESTRATÉGICO DE APRENDIZAJE

PROGRESO ACTUAL:
- Fuentes completadas: ${stats?.completed || 0}/178
- Fuentes en progreso: ${stats?.inProgress || 0}
- XP acumulado: ${stats?.xp || 0}
- Nivel actual: ${stats?.level || 1}
- Racha: ${stats?.streak || 0} días
- Horas estudiadas: ${stats?.totalStudyHours || 0}

FUENTES PRIORITARIAS PENDIENTES:
${sources?.map(s => `- ${s.name} (${s.category}, ${s.priority || 'normal'})`).join('\n') || 'No especificadas'}

METAS DECLARADAS:
${goals || 'No declaradas explícitamente'}

GENERA ANÁLISIS ESTRATÉGICO COMPLETO.`,

      metadata: {
        type: 'master',
        format: 'strategic analysis',
        frequency: 'semanal'
      }
    };
  }
}

const promptEngine = new PromptEngine();
export default promptEngine;
export { PromptEngine, SocraticGenerator, NotebookLMGenerator };
