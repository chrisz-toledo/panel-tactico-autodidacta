/**
 * sanitizers.js — Utilidades de Sanitización (Anti-XSS)
 * AEGIS v6.0
 * 
 * CRÍTICO: Nunca usar innerHTML con contenido dinámico.
 * Siempre usar textContent o sanitizar con estas funciones.
 */

/**
 * Escapa caracteres HTML peligrosos
 * @param {string} text — Texto a sanitizar
 * @returns {string} — Texto escapado
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') {
    return '';
  }

  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return text.replace(/[&<>"'`=\/]/g, char => htmlEscapes[char]);
}

/**
 * Sanitiza un objeto recursivamente
 * @param {any} obj — Objeto a sanitizar
 * @returns {any} — Objeto sanitizado
 */
export function sanitizeObject(obj) {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }

  return obj;
}

/**
 * Detecta si un string contiene posible código malicioso
 * @param {string} text — Texto a verificar
 * @returns {boolean} — True si parece peligroso
 */
export function containsScript(text) {
  if (typeof text !== 'string') return false;

  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<script\b/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onload, etc.
    /eval\s*\(/i,
    /new\s+Function\s*\(/i,
    /document\.write/i,
    /innerHTML\s*=/i,
    /outerHTML\s*=/i,
    /insertAdjacentHTML/i,
    /setTimeout\s*\(\s*["'][^"']*["']/i,
    /setInterval\s*\(\s*["'][^"']*["']/i
  ];

  return dangerousPatterns.some(pattern => pattern.test(text));
}

/**
 * Crea un elemento DOM seguro con contenido escapado
 * @param {string} tag — Tag HTML
 * @param {string} text — Contenido de texto
 * @param {Object} attrs — Atributos (se escapan)
 * @returns {HTMLElement} — Elemento seguro
 */
export function createSafeElement(tag, text = '', attrs = {}) {
  const element = document.createElement(tag);
  element.textContent = text; // Escapado automático

  for (const [key, value] of Object.entries(attrs)) {
    // Solo atributos seguros
    if (isSafeAttribute(key)) {
      element.setAttribute(key, escapeHtml(String(value)));
    }
  }

  return element;
}

/**
 * Verifica si un atributo HTML es seguro para asignar
 */
function isSafeAttribute(attr) {
  const dangerousAttrs = [
    'onclick', 'onload', 'onerror', 'onmouseover',
    'onmouseout', 'onkeydown', 'onkeypress', 'onkeyup',
    'onchange', 'onsubmit', 'onfocus', 'onblur',
    'href', 'src', 'style', 'formaction'
  ];

  return !dangerousAttrs.includes(attr.toLowerCase());
}

/**
 * Trunca texto a longitud máxima segura
 */
export function truncate(text, maxLength = 200, suffix = '...') {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Valida que un string sea seguro para usar como ID
 */
export function safeId(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/[^a-zA-Z0-9_-]/g, '_');
}
