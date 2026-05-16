// ═══════════════════════════════════════════════════════════
// CODECOMBAT LEVELS DATABASE
// ═══════════════════════════════════════════════════════════
// Mapeo de niveles con criterios de evaluación y soluciones guía

const CODECOMBAT_LEVELS = {
  // Nivel 1: Dungeons of Kithgard
  'dungeons-of-kithgard': {
    id: 1,
    name: 'Dungeons of Kithgard',
    concepts: ['sequences', 'basic-syntax'],
    language: 'python',
    difficulty: 'beginner',
    objectives: ['Mover el héroe derecha 2 veces', 'Llegar a la salida'],
    hints: ['Usa hero.moveRight() dos veces'],
    maxLines: 3,
    expectedPatterns: ['moveRight'],
    evaluationCriteria: {
      correctness: 'El héroe debe llegar a la salida',
      efficiency: 'Mínimo 2 líneas de movimiento',
      readability: 'Código claro y sin comentarios innecesarios'
    }
  },
  
  // Nivel 2: Gems in the Deep
  'gems-in-the-deep': {
    id: 2,
    name: 'Gems in the Deep', 
    concepts: ['movement', 'coordinates'],
    language: 'python',
    difficulty: 'beginner',
    objectives: ['Mover el héroe a la gema', 'Recoger la gema'],
    hints: ['Combina moveRight() y moveDown()'],
    maxLines: 3,
    expectedPatterns: ['moveRight', 'moveDown'],
    evaluationCriteria: {
      correctness: 'El héroe debe recoger la gema',
      efficiency: 'Ruta óptima sin movimientos extra',
      readability: 'Orden lógico de movimientos'
    }
  },
  
  // Nivel 3: Shadow Guard
  'shadow-guard': {
    id: 3,
    name: 'Shadow Guard',
    concepts: ['strings', 'method-syntax'],
    language: 'python',
    difficulty: 'beginner',
    objectives: ['Decir el nombre del enemigo', 'Atacar'],
    hints: ['Usa hero.say() con el nombre exacto'],
    maxLines: 4,
    expectedPatterns: ['say', 'attack'],
    evaluationCriteria: {
      correctness: 'Debe decir el nombre correcto antes de atacar',
      efficiency: 'Un solo ataque después de identificar',
      readability: 'Strings correctamente formateados'
    }
  },
  
  // Nivel 4: Forgetful Gemsmith
  'forgetful-gemsmith': {
    id: 4,
    name: 'Forgetful Gemsmith',
    concepts: ['variables', 'assignment'],
    language: 'python',
    difficulty: 'beginner',
    objectives: ['Crear variable con número de pasos', 'Usar la variable'],
    hints: ['Asigna un número a una variable', 'Usa la variable en moveRight()'],
    maxLines: 4,
    expectedPatterns: ['=', 'variable'],
    evaluationCriteria: {
      correctness: 'Debe usar una variable, no números mágicos',
      efficiency: 'Variable reutilizable',
      readability: 'Nombre de variable descriptivo'
    }
  },
  
  // Nivel 5: Kounter Kithwise
  'kounter-kithwise': {
    id: 5,
    name: 'Kounter Kithwise',
    concepts: ['loops-for', 'counting'],
    language: 'python',
    difficulty: 'beginner',
    objectives: ['Usar un loop for', 'Moverse 4 veces'],
    hints: ['for i in range(4):', 'Indentación correcta'],
    maxLines: 5,
    expectedPatterns: ['for', 'in range', 'indent'],
    evaluationCriteria: {
      correctness: 'Debe usar un loop for, no repetir código',
      efficiency: 'Exactamente 4 iteraciones',
      readability: 'Indentación correcta de 4 espacios'
    }
  },
  
  // Nivel 6: Crawlways of Kithgard
  'crawlways-of-kithgard': {
    id: 6,
    name: 'Crawlways of Kithgard',
    concepts: ['loops-while', 'conditions'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Usar while loop', 'Condición de parada'],
    hints: ['while True:', 'Condición para salir del loop'],
    maxLines: 8,
    expectedPatterns: ['while', 'True', 'break'],
    evaluationCriteria: {
      correctness: 'Loop debe terminar correctamente',
      efficiency: 'Sin loops infinitos',
      readability: 'Condición de parada clara'
    }
  },
  
  // Nivel 7: Illustrious Imazi
  'illustrious-imanzi': {
    id: 7,
    name: 'Illustrious Imazi',
    concepts: ['functions', 'parameters'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Definir función', 'Llamar función con parámetros'],
    hints: ['def nombre(parametro):', 'Llamada función(argumento)'],
    maxLines: 10,
    expectedPatterns: ['def ', '(', '):', 'return'],
    evaluationCriteria: {
      correctness: 'Función debe definirse y llamarse correctamente',
      efficiency: 'Reutilización de función',
      readability: 'Nombre descriptivo y docstring'
    }
  },
  
  // Nivel 8: Sarven Savior
  'sarven-savior': {
    id: 8,
    name: 'Sarven Savior',
    concepts: ['functions-return', 'logic'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Función con return', 'Usar valor retornado'],
    hints: ['return valor', 'Guardar resultado en variable'],
    maxLines: 12,
    expectedPatterns: ['def', 'return', '='],
    evaluationCriteria: {
      correctness: 'Valor retornado debe usarse correctamente',
      efficiency: 'Sin cálculos redundantes',
      readability: 'Flujo lógico claro'
    }
  },
  
  // Nivel 9: Raiders of the Long Dark
  'raiders-of-the-long-dark': {
    id: 9,
    name: 'Raiders of the Long Dark',
    concepts: ['conditionals-if', 'boolean-logic'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Usar if statement', 'Condición booleana'],
    hints: ['if enemy:', 'Condición antes de atacar'],
    maxLines: 10,
    expectedPatterns: ['if ', ':', 'else:'],
    evaluationCriteria: {
      correctness: 'Condición debe evaluarse correctamente',
      efficiency: 'Sin condiciones redundantes',
      readability: 'Lógica clara y casos cubiertos'
    }
  },
  
  // Nivel 10: Kithgard Librarian
  'kithgard-librarian': {
    id: 10,
    name: 'Kithgard Librarian',
    concepts: ['comparison-operators', 'conditionals-else'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Usar operadores de comparación', 'if-else completo'],
    hints: ['if distance < 10:', 'else: para otro caso'],
    maxLines: 12,
    expectedPatterns: ['<', '>', '==', 'if', 'else'],
    evaluationCriteria: {
      correctness: 'Comparaciones correctas',
      efficiency: 'Cobertura de todos los casos',
      readability: 'Operadores apropiados'
    }
  },
  
  // Nivel 11: Closing the Distance
  'closing-the-distance': {
    id: 11,
    name: 'Closing the Distance',
    concepts: ['arithmetic', 'math-operators'],
    language: 'python',
    difficulty: 'intermediate',
    objectives: ['Operaciones matemáticas', 'Cálculo de distancia'],
    hints: ['Usa +, -, *, /', 'Variables para cálculos'],
    maxLines: 10,
    expectedPatterns: ['+', '-', '*', '/'],
    evaluationCriteria: {
      correctness: 'Cálculos matemáticos correctos',
      efficiency: 'Fórmula optimizada',
      readability: 'Variables intermedias descriptivas'
    }
  },
  
  // Nivel 12: The Final Kithmaze
  'the-final-kithmaze': {
    id: 12,
    name: 'The Final Kithmaze',
    concepts: ['nested-loops', 'complexity'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Loops anidados', 'Moverse en 2D'],
    hints: ['for dentro de for', 'Patrón de movimiento'],
    maxLines: 15,
    expectedPatterns: ['for', 'for', 'indent', 'indent'],
    evaluationCriteria: {
      correctness: 'Estructura de loops anidados correcta',
      efficiency: 'Sin movimientos redundantes',
      readability: 'Indentación perfecta, nombres claros'
    }
  },
  
  // Nivel 13: Kithgard Gates
  'kithgard-gates': {
    id: 13,
    name: 'Kithgard Gates',
    concepts: ['boolean-operators', 'and-or-not'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Operadores lógicos complejos', 'Múltiples condiciones'],
    hints: ['and, or, not', 'Combinar condiciones'],
    maxLines: 15,
    expectedPatterns: ['and', 'or', 'not', 'if'],
    evaluationCriteria: {
      correctness: 'Lógica booleana correcta',
      efficiency: 'Simplificación de expresiones',
      readability: 'Paréntesis para claridad'
    }
  },
  
  // Nivel 14: Destroying Angel
  'destroying-angel': {
    id: 14,
    name: 'Destroying Angel',
    concepts: ['debugging', 'problem-solving'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Encontrar y corregir bugs', 'Debugging sistemático'],
    hints: ['Revisa errores de sintaxis', 'Lógica de flujo'],
    maxLines: 20,
    expectedPatterns: ['debug', 'fix', 'test'],
    evaluationCriteria: {
      correctness: 'Código funciona sin errores',
      efficiency: 'Solución elegante',
      readability: 'Código limpio y comentado'
    }
  },
  
  // Nivel 15: Deadly Pursuit
  'deadly-pursuit': {
    id: 15,
    name: 'Deadly Pursuit',
    concepts: ['optimization', 'efficiency'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Optimizar algoritmo', 'Mínimo de acciones'],
    hints: ['Menos es más', 'Algoritmo greedy vs óptimo'],
    maxLines: 20,
    expectedPatterns: ['optimized', 'efficient'],
    evaluationCriteria: {
      correctness: 'Solución correcta',
      efficiency: 'Mínimo de pasos/acciones',
      readability: 'Algoritmo comprensible'
    }
  },
  
  // Nivel 16: Thornbush Farm
  'thornbush-farm': {
    id: 16,
    name: 'Thornbush Farm',
    concepts: ['arrays', 'iteration'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Usar arrays/listas', 'Iterar sobre colección'],
    hints: ['for item in list:', 'Índices o iteración directa'],
    maxLines: 15,
    expectedPatterns: ['[', ']', 'for', 'in'],
    evaluationCriteria: {
      correctness: 'Acceso a elementos correcto',
      efficiency: 'Iteración eficiente',
      readability: 'Nombres de lista descriptivos'
    }
  },
  
  // Nivel 17: Backwoods Bombardier
  'backwoods-bombardier': {
    id: 17,
    name: 'Backwoods Bombardier',
    concepts: ['object-properties', 'dot-notation'],
    language: 'python',
    difficulty: 'advanced',
    objectives: ['Acceder propiedades de objetos', 'Notación punto'],
    hints: ['object.property', 'Métodos y atributos'],
    maxLines: 15,
    expectedPatterns: ['.', '(', ')'],
    evaluationCriteria: {
      correctness: 'Acceso a propiedades correcto',
      efficiency: 'Sin accesos redundantes',
      readability: 'Cadena de accesos clara'
    }
  },
  
  // Nivel 18: Portcheck
  'portcheck': {
    id: 18,
    name: 'Portcheck',
    concepts: ['input-validation', 'error-handling'],
    language: 'python',
    difficulty: 'expert',
    objectives: ['Validar entrada', 'Manejar errores'],
    hints: ['if input is valid:', 'try-except para errores'],
    maxLines: 25,
    expectedPatterns: ['try:', 'except', 'validate'],
    evaluationCriteria: {
      correctness: 'Manejo de edge cases',
      efficiency: 'Validación temprana',
      readability: 'Mensajes de error claros'
    }
  }
};

// ═══════════════════════════════════════════════════════════
// EVALUATION FUNCTIONS
// ═══════════════════════════════════════════════════════════

function getLevelById(levelId) {
  return CODECOMBAT_LEVELS[levelId] || null;
}

function getAllLevels() {
  return Object.values(CODECOMBAT_LEVELS);
}

function getLevelsByConcept(concept) {
  return Object.values(CODECOMBAT_LEVELS).filter(level => 
    level.concepts.includes(concept)
  );
}

function getLevelsByDifficulty(difficulty) {
  return Object.values(CODECOMBAT_LEVELS).filter(level => 
    level.difficulty === difficulty
  );
}

// Evaluación de código
function evaluateCode(code, levelId) {
  const level = getLevelById(levelId);
  if (!level) return null;
  
  const issues = [];
  const score = { correctness: 0, efficiency: 0, readability: 0, total: 0 };
  
  // Análisis básico
  const lines = code.split('\n').filter(line => line.trim());
  
  // Verificar número de líneas
  if (lines.length > level.maxLines) {
    issues.push(`⚠️ Código muy largo: ${lines.length} líneas (máx: ${level.maxLines})`);
    score.efficiency -= 10;
  }
  
  // Verificar patrones esperados
  level.expectedPatterns.forEach(pattern => {
    if (!code.includes(pattern)) {
      issues.push(`❌ Falta: ${pattern}`);
      score.correctness -= 15;
    }
  });
  
  // Verificar indentación
  const indentIssues = lines.filter(line => {
    const spaces = line.match(/^(\s*)/)[1].length;
    return spaces % 4 !== 0 && line.trim();
  });
  
  if (indentIssues.length > 0) {
    issues.push(`⚠️ Indentación inconsistente (usa 4 espacios)`);
    score.readability -= 10;
  }
  
  // Verificar números mágicos (para niveles de variables)
  if (level.concepts.includes('variables')) {
    const magicNumbers = code.match(/\bmove(Right|Left|Up|Down)\s*\(\s*\d+\s*\)/g);
    if (magicNumbers && !code.includes('=')) {
      issues.push(`⚠️ Usa variables en lugar de números mágicos`);
      score.correctness -= 10;
    }
  }
  
  // Verificar repetición de código (DRY)
  const repeatedLines = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[i].trim() === lines[j].trim() && lines[i].trim()) {
        repeatedLines.push(lines[i].trim());
      }
    }
  }
  
  if (repeatedLines.length > 0 && level.concepts.includes('loops')) {
    issues.push(`⚠️ Código repetido - usa un loop`);
    score.efficiency -= 15;
  }
  
  // Calcular score total
  score.total = Math.max(0, Math.min(100, 
    30 + score.correctness + score.efficiency + score.readability
  ));
  
  // Generar feedback
  const feedback = generateFeedback(score, issues, level);
  
  return {
    score,
    issues,
    feedback,
    level,
    grade: getGrade(score.total)
  };
}

function generateFeedback(score, issues, level) {
  const feedback = [];
  
  // Feedback por categoría
  if (score.correctness >= 25) {
    feedback.push('✅ Correctness: Tu código resuelve el problema');
  } else if (score.correctness >= 15) {
    feedback.push('⚠️ Correctness: Casi correcto, revisa la lógica');
  } else {
    feedback.push('❌ Correctness: La solución tiene errores importantes');
  }
  
  if (score.efficiency >= 25) {
    feedback.push('✅ Efficiency: Solución optimizada');
  } else if (score.efficiency >= 15) {
    feedback.push('⚠️ Efficiency: Puede ser más eficiente');
  } else {
    feedback.push('❌ Efficiency: Hay redundancias o código innecesario');
  }
  
  if (score.readability >= 25) {
    feedback.push('✅ Readability: Código limpio y legible');
  } else if (score.readability >= 15) {
    feedback.push('⚠️ Readability: Mejora la indentación o nombres');
  } else {
    feedback.push('❌ Readability: Difícil de leer, revisa estilo');
  }
  
  // Sugerencias específicas del nivel
  feedback.push('\n🎯 Conceptos practicados:');
  level.concepts.forEach(concept => {
    feedback.push(`   • ${concept}`);
  });
  
  feedback.push('\n💡 Tips para este nivel:');
  level.hints.forEach(hint => {
    feedback.push(`   • ${hint}`);
  });
  
  return feedback.join('\n');
}

function getGrade(total) {
  if (total >= 90) return { letter: 'S', label: 'Excelente', emoji: '🌟' };
  if (total >= 80) return { letter: 'A', label: 'Muy Bien', emoji: '⭐' };
  if (total >= 70) return { letter: 'B', label: 'Bien', emoji: '👍' };
  if (total >= 60) return { letter: 'C', label: 'Regular', emoji: '😐' };
  if (total >= 50) return { letter: 'D', label: 'Necesita Mejorar', emoji: '📚' };
  return { letter: 'F', label: 'Requiere Práctica', emoji: '💪' };
}

// Exportar para uso en AEGIS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CODECOMBAT_LEVELS, evaluateCode, getLevelById, getAllLevels };
}
