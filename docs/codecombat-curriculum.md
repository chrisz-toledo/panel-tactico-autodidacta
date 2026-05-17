# CodeCombat: Guía Curricular y Conceptos de Ciencias de la Computación

Este documento sirve como fuente de verdad para los tutores IA (Gemini, NotebookLM, AEGIS) sobre el currículo estructural de **CodeCombat**. El objetivo es auditar correctamente el aprendizaje del estudiante y evitar el "Falso Positivo de Competencia" (superar niveles sin entender la teoría).

## Mapeo de Mundos y Conceptos (Computer Science Pathway)

CodeCombat disfraza conceptos complejos de ingeniería de software bajo mecánicas de juegos RPG. A continuación, el desglose de lo que el estudiante *debe* dominar al finalizar cada mundo.

### 1. Kithgard Dungeon (Fundamentos)
* **Enfoque Pedagógico:** Sintaxis básica y secuenciación.
* **Conceptos CS:**
  * **Sintaxis Básica:** Escritura estricta, uso de paréntesis, comillas y case sensitivity.
  * **Secuenciación Algorítmica:** Ejecución top-down (línea por línea).
  * **Llamada de Métodos y Argumentos:** Uso de métodos predefinidos (ej. `hero.moveRight()`, `hero.attack(target)`) pasando parámetros.
  * **Cadenas de Texto (Strings):** Diferencia entre variables y literales de texto.
  * **Bucles Básicos (While-True):** Automatización de tareas repetitivas infinitas.

### 2. Backwoods Forest (Lógica y Control de Flujo)
* **Enfoque Pedagógico:** Toma de decisiones dinámicas.
* **Conceptos CS:**
  * **Condicionales (If / Else / Elif):** Ramificación del código basada en el estado del entorno (ej. "si hay enemigo, ataca; si no, muévete").
  * **Operadores Relacionales:** `<, >, <=, >=, ==, !=`.
  * **Variables:** Almacenamiento y actualización de datos en memoria (ej. guardar el resultado de `hero.findNearestEnemy()` en una variable).
  * **Pensamiento Procedimental:** Diseño de pasos lógicos para sortear laberintos dinámicos.

### 3. Sarven Desert (Complejidad y Matemáticas)
* **Enfoque Pedagógico:** Operaciones matemáticas y condiciones compuestas.
* **Conceptos CS:**
  * **Lógica Booleana:** Operadores `AND`, `OR`, `NOT` para evaluar múltiples escenarios simultáneamente.
  * **Aritmética Computacional:** Operadores matemáticos (`+, -, *, /, %`) para cálculos de distancias y recursos.
  * **Geometría y Coordenadas 2D:** Uso de planos cartesianos (X, Y) para movimiento y vectores de ataque.
  * **Bucles Anidados:** Ciclos dentro de ciclos para recorrer cuadrículas o manejar múltiples oleadas de enemigos.

### 4. Kelvintaph Glacier y Cloudrip Mountain (Abstracción y Estructuras)
* **Enfoque Pedagógico:** Ingeniería de Software Avanzada.
* **Conceptos CS:**
  * **Estructuras de Datos (Arrays/Listas):** Manejo de colecciones de datos (ej. un array de todos los enemigos en pantalla).
  * **Bucles For / Iteradores:** Recorrer arrays elemento por elemento (`for enemy in enemies:`).
  * **Funciones Personalizadas (Abstracción):** Crear bloques de código reutilizables con parámetros propios para no repetir lógica.
  * **Objetos y Propiedades:** Acceder a estados de entidades (ej. `enemy.health`, `item.pos.x`).
  * **Algoritmos Complejos:** Pathfinding básico, búsqueda del elemento máximo/mínimo (ej. encontrar el enemigo más fuerte).

## Directrices para el Auditor IA (Protocolo AEGIS)
Cuando el usuario reporte haber completado un nivel o mundo de CodeCombat:

1. **No preguntar sobre el juego:** Evita preguntas como "¿Cómo derrotaste al ogro?".
2. **Preguntar sobre el concepto:** "Veo que terminaste Backwoods Forest. Explícame, sin usar código, qué sucede en la memoria de la computadora cuando asignas un enemigo a una variable y luego ese enemigo muere."
3. **Requerir Analogías Reales:** Pide al usuario que explique el `While-True` o las `Arrays` usando ejemplos de la vida cotidiana o procesos de negocios.
4. **Prueba de Escritorio Mental:** Dale un bloque de código falso/con bugs y pídele que ejecute la lógica en su cabeza e identifique por qué el héroe fallaría.

---
*Documento generado por AEGIS para integración con NotebookLM y sistemas RAG locales.*
