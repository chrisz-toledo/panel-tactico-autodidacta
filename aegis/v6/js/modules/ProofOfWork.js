/**
 * ProofOfWork.js — Validación de Comprensión Real
 * AEGIS v6.0
 * 
 * Sistema anti "Falso Positivo de Competencia":
 - Antes de marcar una fuente como completada, exige:
   1. Explicación en propias palabras (mín. 150 caracteres)
   2. Pseudocódigo (mín. 5 líneas)
   3. Conexión con otra área (mín. 50 caracteres)
 * - Detecta explicaciones genéricas/copiadas
 * - Genera prompt para revisión por IA externa
 */

class ProofOfWork {
  constructor(stateManager) {
    this.sm = stateManager;
    this.validationRules = {
      minExplanationLength: 150,
      minPseudocodeLines: 5,
      minConnectionLength: 50,
      maxGenericScore: 3 // Si supera, se considera genérica
    };
  }

  /**
   * Envía un Proof of Work para validación y almacenamiento
   * @param {number} sourceId — ID de la fuente
   * @param {Object} proof — { explanation, pseudocode, connection }
   * @returns {Object} — { success: boolean, errors: [], warnings: [] }
   */
  async submit(sourceId, proof) {
    // Validación estricta
    const validation = this.validate(proof);
    
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
        warnings: validation.warnings
      };
    }

    // Guardar proof
    const proofData = {
      sourceId: Number(sourceId),
      explanation: proof.explanation.trim(),
      pseudocode: proof.pseudocode.trim(),
      connection: proof.connection.trim(),
      timestamp: Date.now(),
      date: new Date().toISOString(),
      wordCount: this._countWords(proof.explanation),
      validated: false // El usuario debe validar con IA externa
    };

    await this.sm.saveProof(sourceId, proofData);

    // Marcar fuente como "completada pendiente de validación"
    await this._markSourcePendingValidation(sourceId);

    return {
      success: true,
      proof: proofData,
      reviewPrompt: this.generateReviewPrompt(proofData),
      warnings: validation.warnings
    };
  }

  /**
   * Valida un proof según reglas estrictas
   */
  validate(proof) {
    const errors = [];
    const warnings = [];

    // Validar explicación
    if (!proof.explanation || proof.explanation.trim().length < this.validationRules.minExplanationLength) {
      errors.push(`Explicación muy corta. Mínimo ${this.validationRules.minExplanationLength} caracteres. Actual: ${proof.explanation?.length || 0}`);
    }

    // Detectar contenido genérico/copiado
    const genericScore = this._detectGenericContent(proof.explanation);
    if (genericScore > this.validationRules.maxGenericScore) {
      errors.push('Explicación demasiado genérica o posiblemente copiada. Usa tus propias palabras, explica con tus términos.');
    } else if (genericScore > 0) {
      warnings.push('Algunas frases parecen genéricas. Considera reescribir con más detalle personal.');
    }

    // Validar pseudocódigo
    if (!proof.pseudocode) {
      errors.push('Pseudocódigo requerido.');
    } else {
      const lines = proof.pseudocode.trim().split('\n').filter(line => line.trim().length > 0);
      if (lines.length < this.validationRules.minPseudocodeLines) {
        errors.push(`Pseudocódigo muy corto. Mínimo ${this.validationRules.minPseudocodeLines} líneas de código/pasos. Actual: ${lines.length}`);
      }

      // Verificar que parece código o algoritmo (no solo texto)
      const codePatterns = /[{}();=+\-<>\[\]]|function|if|else|for|while|return|class|def/i;
      if (!codePatterns.test(proof.pseudocode)) {
        warnings.push('El pseudocódigo no parece contener estructuras de código. Asegúrate de incluir sintaxis o pasos algorítmicos claros.');
      }
    }

    // Validar conexión
    if (!proof.connection || proof.connection.trim().length < this.validationRules.minConnectionLength) {
      errors.push(`Conexión con otra área muy corta. Mínimo ${this.validationRules.minConnectionLength} caracteres. Explica cómo se relaciona con lo que ya sabes.`);
    }

    // Seguridad básica: detectar posible código malicioso
    if (this._containsDangerousContent(proof.explanation) || 
        this._containsDangerousContent(proof.pseudocode)) {
      errors.push('Contenido potencialmente peligoso detectado. No incluyas scripts o código ejecutable.');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Genera prompt para que IA externa revise el proof
   */
  generateReviewPrompt(proofData) {
    return {
      system: `Eres un AUDITOR PEDAGÓGICO estricto evaluando la comprensión real de un estudiante autodidacta.

CRITERIOS DE EVALUACIÓN (1-10 cada uno):
1. **Profundidad**: ¿Demuestra comprensión más allá de la superficie?
2. **Claridad**: ¿Se expresa de forma coherente y estructurada?
3. **Originalidad**: ¿Usa sus propias palabras o parece copiado?
4. **Aplicación**: ¿El pseudocódigo refleja entendimiento práctico?
5. **Conexión**: ¿La relación con otras áreas es válida y útil?

REGLAS DEL VEREDICTO:
- Total ≥ 40/50 y ningún criterio < 6: "VALIDADO"
- Total 30-39 o algún criterio < 5: "NECESITA MEJORAR" (indicar qué)
- Total < 30: "NO VALIDADO" (explicar por qué y qué revisar)

Sé específico en tus críticas. Cita ejemplos del texto del estudiante.`,

      user: `EVALUACIÓN DE PROOF OF WORK

EXPLICACIÓN DEL ESTUDIANTE:
${proofData.explanation}

PSEUDOCÓDIGO:
\`\`\`
${proofData.pseudocode}
\`\`\`

CONEXIÓN CON OTRAS ÁREAS:
${proofData.connection}

REALIZA LA EVALUACIÓN COMPLETA SIGUIENDO LOS CRITERIOS.`,

      metadata: {
        type: 'proof_review',
        format: 'evaluation rubric',
        maxScore: 50,
        passingScore: 40
      }
    };
  }

  /**
   * Obtiene proof guardado
   */
  async getProof(sourceId) {
    return await this.sm.getProof(sourceId);
  }

  /**
   * Lista todos los proofs pendientes de validación
   */
  async getPendingValidations() {
    // Esto requeriría un índice en IndexedDB
    // Por ahora, obtenemos todos y filtramos
    const allProofs = await this.sm._getAllFromStore('proofs');
    return allProofs.filter(p => !p.validated);
  }

  /**
   * Marca un proof como validado (después de revisión IA o manual)
   */
  async validateProof(sourceId, validator = 'self') {
    const proof = await this.getProof(sourceId);
    if (!proof) return false;

    proof.validated = true;
    proof.validatedBy = validator;
    proof.validatedAt = Date.now();

    await this.sm.saveProof(sourceId, proof);

    // Mover de "pending" a "completed"
    await this._finalizeSourceCompletion(sourceId);

    return true;
  }

  // ============ MÉTODOS PRIVADOS ============

  _detectGenericContent(text) {
    if (!text) return 0;

    const genericPatterns = [
      /este (libro|curso|recurso|material) trata sobre/i,
      /en (este|el) (capítulo|sección|módulo) se explica/i,
      /la (autora|autor|profesora|profesor) dice que/i,
      /básicamente (es|se trata de)/i,
      /es importante (porque|ya que)/i,
      /en resumen,/i,
      /para concluir,/i,
      /esto significa que/i,
      /la definición de/i,
      /según el autor/i
    ];

    let score = 0;
    const lowerText = text.toLowerCase();

    for (const pattern of genericPatterns) {
      if (pattern.test(lowerText)) {
        score++;
      }
    }

    return score;
  }

  _containsDangerousContent(text) {
    if (!text) return false;

    const dangerousPatterns = [
      /<script\b/i,
      /javascript:/i,
      /on\w+\s*=/i, // event handlers
      /eval\s*\(/i,
      /document\.write/i,
      /innerHTML/i
    ];

    return dangerousPatterns.some(pattern => pattern.test(text));
  }

  _countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }

  async _markSourcePendingValidation(sourceId) {
    // Implementar lógica si se quiere un estado intermedio
    // Por ahora, no hacemos nada especial
  }

  async _finalizeSourceCompletion(sourceId) {
    const completed = await this.sm.get('completedSources') || [];
    if (!completed.includes(Number(sourceId))) {
      completed.push(Number(sourceId));
      await this.sm.set('completedSources', completed);
    }
  }
}

export default ProofOfWork;
export { ProofOfWork };
