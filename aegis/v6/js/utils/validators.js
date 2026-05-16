/**
 * validators.js — Validación de Datos
 * AEGIS v6.0
 */

/**
 * Valida que un valor sea un número entero positivo
 */
export function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

/**
 * Valida que un string no esté vacío
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Valida rango de energía (1-10)
 */
export function isValidEnergyLevel(value) {
  return Number.isInteger(value) && value >= 1 && value <= 10;
}

/**
 * Valida estructura de fuente
 */
export function isValidSource(source) {
  if (!source || typeof source !== 'object') return false;
  
  const required = ['id', 'name', 'category', 'desc', 'tactical'];
  for (const field of required) {
    if (!isNonEmptyString(source[field]) && !Number.isInteger(source[field])) {
      return false;
    }
  }
  
  return true;
}

/**
 * Valida estructura de proof of work
 */
export function isValidProof(proof) {
  if (!proof || typeof proof !== 'object') {
    return { valid: false, error: 'Proof debe ser un objeto' };
  }

  const errors = [];

  if (!isNonEmptyString(proof.explanation)) {
    errors.push('Explicación requerida');
  }

  if (!isNonEmptyString(proof.pseudocode)) {
    errors.push('Pseudocódigo requerido');
  }

  if (!isNonEmptyString(proof.connection)) {
    errors.push('Conexión requerida');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valida formato de backup
 */
export function isValidBackup(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Datos inválidos' };
  }

  if (!data.version || !data.state) {
    return { valid: false, error: 'Falta versión o estado' };
  }

  return { valid: true };
}
