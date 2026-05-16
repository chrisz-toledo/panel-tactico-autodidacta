# ⏰ Ritmo Circadiano Adaptativo — Guía de Uso

## 🎯 Qué es

Sistema que sugiere fuentes de estudio óptimas según:
- **Hora del día** (cronotipo: morning person / night owl)
- **Nivel de energía reportado** (1-10)
- **Dificultad de la fuente** (high/medium/low)

Basado en cronobiología: el prefrontal cortex está más activo 9am-12pm, ideal para temas complejos.

---

## 🚀 Para empezar

### 1. Abre AEGIS v5.0
El widget de "⏰ Ritmo Circadiano" aparece automáticamente en el sidebar.

### 2. Reporta tu energía
- Usa el slider (1-10) en el sidebar
- Click "Reportar Energía"
- La sugerencia se actualiza automáticamente

### 3. Interpreta la sugerencia

| Badge | Significado | Acción recomendada |
|-------|-------------|-------------------|
| 🟢 **ÓPTIMO** | Fuente alineada con tu cronotipo y energía | ✅ Estudiar ahora |
| 🔵 **BUENO** | Buen match, aunque no perfecto | ✅ Adelante, pero consciente |
| 🟡 **ACEPTABLE** | Estudiable pero no ideal | ⚠️ Posible, pero vigila fatiga |
| 🔴 **SUBÓPTIMO** | Desalineado con tu ritmo | 🛑 Considera cambiar horario |

---

## ⚙️ Configuración avanzada

### Si eres "night owl" (nocturno)

Edita el estado en localStorage o consola del navegador:

```javascript
STATE.energyProfile.morningPerson = false;
STATE.energyProfile.peakHours = [20, 21, 22];  // 8-11pm
STATE.energyProfile.lowEnergyHours = [6, 7, 8, 9, 10, 11, 12];  // Mañanas
save();
```

### Mapeo de dificultad por categoría

```javascript
// En código fuente (CATEGORY_DIFFICULTY)
'cs50': 'high'      // Mañana (complejidad algorítmica)
'security': 'high'  // Mañana (requiere atención máxima)
'ai': 'high'        // Mañana (abstracto)
'systems': 'high'   // Mañana (bajo nivel)
'python': 'medium'  // Tarde (práctica hands-on)
'architecture': 'medium'  // Tarde (diseño)
'database': 'medium'      // Tarde (SQL)
'devops': 'low'     // Noche (comandos)
'git': 'low'        // Noche (memorístico)
'methodology': 'low' // Noche (lectura)
```

---

## 🧪 Verificación funcional

### Prueba 1: Mañana (9-11am)
```
Acción: Abrir AEGIS a las 10:00 AM, reportar energía 8
Esperado: Sugerir fuente 'high' (CS50, Security, AI, Systems)
```

### Prueba 2: Tarde (3-5pm)
```
Acción: Abrir AEGIS a las 4:00 PM, reportar energía 6
Esperado: Sugerir fuente 'medium' (Python, Architecture, Database)
```

### Prueba 3: Noche (10pm)
```
Acción: Abrir AEGIS a las 10:00 PM, reportar energía 3
Esperado: Sugerir fuente 'low' (DevOps, Git, Methodology)
```

### Prueba 4: Persistencia
```
Acción: Reportar energía 7, recargar página
Esperado: Energía reportada se mantiene, widget actualizado
```

---

## 📊 Historial de energía

El sistema guarda los últimos 30 reportes de energía:

```javascript
// Ver historial
console.log(STATE.energyProfile.energyHistory);

// Formato:
[
  {date: "2026-05-16T10:30:00.000Z", energy: 8, sourceStudiedId: 5},
  {date: "2026-05-16T15:00:00.000Z", energy: 6, sourceStudiedId: 12}
]
```

---

## 💡 Tips de uso

1. **Reporta energía al inicio** de cada sesión de estudio
2. **Sigue las sugerencias** 🟢 ÓPTIMO para máxima retención
3. **No ignores** el 🔴 SUBÓPTIMO — indica que estás forzando contra tu ritmo natural
4. **Ajusta tu cronotipo** si descubres que eres más productivo en otro horario

---

## 🔧 Troubleshooting

### "No aparece sugerencia"
- Verifica que tienes fuentes pendientes (no completadas)
- Revisa consola por errores: `getCircadianSuggestion()`

### "Sugerencias no cambian con energía"
- Asegúrate de hacer click en "Reportar Energía", no solo mover el slider
- Verifica: `STATE.energyProfile.lastReportedEnergy`

### "Siempre dice SUBÓPTIMO"
- Tu cronotipo podría estar mal configurado
- Ajusta `morningPerson` y `peakHours` según tu experiencia real

---

## 🎓 Ciencia detrás

- **Cronobiología**: Ritmos circadianos regulan alerta cognitiva
- **Prefrontal cortex**: Máxima función 9am-12pm (morning persons)
- **Efectividad**: Estudiar temas difíciles en peak hours mejora retención 20-40%

---

*Implementado en FASE 1 de Kitbashing Emergentes*  
*Auditoría Bilawal Sidhu - AEGIS v5.0*
