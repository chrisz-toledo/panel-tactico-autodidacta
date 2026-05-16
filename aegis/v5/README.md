# 🛡️ AEGIS v5.0 — Biblioteca de 69 Fuentes

**Aplicación principal:** `aegis-v5-BIBLIOTECA.html`

---

## 🚀 LANZAR APLICACIÓN

### Mac (Recomendado)
```bash
# Desde el Desktop:
double-click "🛡️ AEGIS V5.command"

# Desde esta carpeta:
./launchers/🛡️\ AEGIS\ V5.command
```

### O abrir directamente
Abre `aegis-v5-BIBLIOTECA.html` en tu navegador (Chrome/Safari/Firefox)

---

## 📁 CONTENIDO DE V5

| Carpeta | Descripción |
|---------|-------------|
| `documentation/` | Guías y documentación específica v5 |
| `flows/` | Flujos de trabajo diario |
| `launchers/` | Scripts para iniciar la aplicación |
| `aegis-v5-BIBLIOTECA.html` | **Aplicación principal** |

---

## 🎧 FLUJO DIARIO RECOMENDADO

1. **Abrir** AEGIS v5.0
2. **Seleccionar** fuente del día en la Biblioteca
3. **Generar** prompt NotebookLM → AudioClase de repaso
4. **Estudiar** 25 min (misión Pomodoro)
5. **Completar** fuente → automáticamente programa repasos SRS
6. **Escuchar** AudioClase durante descanso

Ver `flows/FLUJO_DIARIO_AUDIOCLASE_NOTEBOOKLM.md` para guía completa.

---

## 🛠️ CONFIGURACIÓN

### URLs de NotebookLM/Gemini
Si cambian tus URLs de notebook, actualízalas desde la consola del navegador (F12):

```javascript
updateConfigUrls(
  'https://gemini.google.com/notebook/TU-ID',
  'https://notebooklm.google.com/notebook/TU-ID'
);
```

---

## 📊 CARACTERÍSTICAS TÉCNICAS V5.0

- ✅ 69 fuentes organizadas en 10 categorías
- ✅ Sistema SRS (Spaced Repetition) integrado
- ✅ Timers persistentes (sobreviven a refresh)
- ✅ URLs configurables
- ✅ Error handling robusto en LocalStorage
- ✅ Memory leak protection

---

## 🆘 TROUBLESHOOTING

**Problema:** AEGIS no carga  
**Solución:** Limpiar localStorage → F12 → Application → Clear Storage

**Problema:** URLs de NotebookLM/Gemini no funcionan  
**Solución:** Actualizar con `updateConfigUrls()` o verificar en NotebookLM que el notebook existe

**Problema:** Pérdida de datos  
**Solución:** AEGIS automáticamente respalda estado corrupto en `aegis_v5_state_backup_*`

---

**Versión:** 5.0  
**Última actualización:** Mayo 2026
