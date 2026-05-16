# 🎮 Guía de Sincronización CodeCombat

**Tu perfil:** https://codecombat.com/user/chrisztoledogplus  
**Método:** Extracción manual vía consola del navegador  
**Por qué:** CodeCombat no tiene API pública oficial

---

## ⚡ Método Rápido (30 segundos)

### Paso 1: Abrir tu perfil
1. Ve a https://codecombat.com/user/chrisztoledogplus
2. Asegúrate de estar **logueado** en CodeCombat

### Paso 2: Abrir Consola del Navegador
```
Windows/Linux: Presiona F12
Mac: Cmd + Option + J
```

### Paso 3: Extraer datos
En la consola, pega este código y presiona Enter:

```javascript
copy(JSON.stringify({
  username: me.get('name'),
  levels: me.get('levels'),
  xp: me.get('points'),
  gems: me.get('gems'),
  heroConfig: me.get('heroConfig'),
  dateJoined: me.get('dateJoined')
}))
```

**Verás:** `"copied to clipboard"`

### Paso 4: Sincronizar con AEGIS
1. Vuelve a AEGIS v5
2. En el widget "🎮 CodeCombat Sync"
3. Pega el JSON en el textarea
4. Click "🔄 Sincronizar Ahora"

---

## 📊 Qué datos se sincronizan

| Dato | Descripción | XP en AEGIS |
|------|-------------|-------------|
| **Niveles completados** | Cada nivel de CodeCombat | +50 XP por nivel |
| **XP de CodeCombat** | Experiencia acumulada | Bonus calculado |
| **Conceptos aprendidos** | Variables, loops, funciones, etc. | Mapeo automático |
| **Skills** | Python, JavaScript, problem-solving | Progresión porcentual |

---

## 🧠 Conceptos Mapeados Automáticamente

AEGIS extrae estos conceptos de tus niveles completados:

```javascript
// Fundamentos
'dungeons-of-kithgard'      → ['sequences', 'algorithms-basic']
'gems-in-the-deep'          → ['movement', 'coordinates']
'shadow-guard'              → ['strings', 'methods']
'forgetful-gemsmith'        → ['variables', 'assignment']

// Control de flujo
'kounter-kithwise'          → ['loops-for', 'counting']
'crawlways-of-kithgard'     → ['loops-while', 'conditions']
'illustrious-imanzi'        → ['functions', 'parameters']
'sarven-savior'             → ['functions-return', 'logic']

// Lógica avanzada
'raiders-of-the-long-dark'  → ['conditionals-if', 'boolean-logic']
'kithgard-librarian'        → ['comparison-operators', 'conditionals-else']
'the-final-kithmaze'        → ['nested-loops', 'complexity']
'kithgard-gates'            → ['boolean-operators', 'and-or-not']

// Data structures
'thornbush-farm'            → ['arrays', 'iteration']
'backwoods-bombardier'      → ['object-properties', 'dot-notation']

// Debugging
'destroying-angel'          → ['debugging', 'problem-solving']
'deadly-pursuit'            → ['optimization', 'efficiency']
```

**18 niveles mapeados** → Conceptos CS reales

---

## 🔄 Sincronización Bidireccional

### CodeCombat → AEGIS
```
✅ Nuevos niveles completados → +50 XP cada uno
✅ Nuevos conceptos aprendidos → Actualiza skills
✅ Tiempo jugado → Estadísticas de sesión
```

### AEGIS → CodeCombat
```
❌ No disponible (CodeCombat no permite escritura externa)
```

---

## 🛠️ Troubleshooting

### "ReferenceError: me is not defined"
```
CAUSA: No estás logueado en CodeCombat
SOLUCIÓN: 
1. Logueate en codecombat.com
2. Refresca la página de tu perfil
3. Intenta de nuevo
```

### "undefined" en el resultado
```
CAUSA: El perfil está cargando
SOLUCIÓN:
1. Espera 3 segundos después de cargar la página
2. Intenta de nuevo
```

### Datos desactualizados
```
CAUSA: Caché del navegador
SOLUCIÓN:
1. Cierra sesión y vuelve a loguearte
2. Refresca AEGIS antes de sincronizar
```

---

## 📝 Ejemplo de JSON esperado

```json
{
  "username": "chrisztoledogplus",
  "levels": {
    "dungeons-of-kithgard": {
      "complete": true,
      "lastPlayed": "2024-01-15",
      "playtime": 180
    },
    "shadow-guard": {
      "complete": true,
      "lastPlayed": "2024-01-16",
      "playtime": 240
    }
  },
  "xp": 1250,
  "gems": 150,
  "dateJoined": "2023-12-01"
}
```

---

## 🎯 Pro Tip: Sincronización Automática (Bookmarklet)

Crea un bookmark con este código para extraer datos en un click:

```javascript
javascript:(function(){
  if(typeof me === 'undefined') {
    alert('Logueate primero en CodeCombat');
    return;
  }
  var data = JSON.stringify({
    username: me.get('name'),
    levels: me.get('levels'),
    xp: me.get('points')
  });
  copy(data);
  alert('Datos copiados! Ahora pega en AEGIS');
})();
```

**Pasos:**
1. Crea un nuevo bookmark en tu navegador
2. Nombre: "CodeCombat → AEGIS"
3. URL: Pega el código de arriba
4. Click cuando estés en tu perfil de CodeCombat

---

## 📈 Historial de Sincronización

AEGIS guarda automáticamente:
- Fecha de cada sincronización
- Niveles completados antes/después
- XP antes/después
- Conceptos nuevos descubiertos

**Ver historial:** Abre consola de AEGIS (F12) y ejecuta:
```javascript
console.log(STATE.codeCombat.syncHistory)
```

---

## 🚀 Próximos pasos

1. **Sincroniza ahora** con el método de 4 pasos arriba
2. **Verifica** que tus niveles aparezcan en el widget de stats
3. **Juega** nuevos niveles en CodeCombat
4. **Re-sincroniza** semanalmente para actualizar progreso

---

**¿Preguntas?** Abre la consola (F12) en AEGIS y revisa errores en la pestaña Console.
