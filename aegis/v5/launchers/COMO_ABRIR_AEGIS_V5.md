# 🛡️ Cómo Abrir AEGIS v5.0 — Guía Rápida

## 🚀 Opción 1: Doble Click (Más Fácil)

### Para Mac:
1. **Haz doble click en:** `ABRIR_AEGIS_V5.command`
2. Se abrirá Terminal + Navegador automáticamente
3. Si pide permisos: Click derecho → Abrir

**¿Qué hace?**
- Inicia servidor local en `http://localhost:8080`
- Abre automáticamente AEGIS v5 en tu navegador
- Cuando modificas el archivo, solo presiona F5 para actualizar

---

## 🐍 Opción 2: Python (Sin instalar nada más)

### Para Mac/Linux:
```bash
cd ~/Desktop
./AEGIS_V5_Simple.sh
```

O directamente en Terminal:
```bash
cd "/Users/christiantoledo/Desarrollo/00-Learning/aegis"
python3 -m http.server 8080
```

Luego abre: `http://localhost:8080/aegis-v5-BIBLIOTECA.html`

---

## 🔄 Opción 3: Auto-Reload Real (Recomendado para desarrollo)

### Paso 1: Instalar Node.js
```bash
# Con Homebrew (si lo tienes)
brew install node

# O descargar de nodejs.org
```

### Paso 2: Instalar browser-sync
```bash
npm install -g browser-sync
```

### Paso 3: Ejecutar
```bash
cd "/Users/christiantoledo/Desarrollo/00-Learning/aegis"
browser-sync start --server --files "*.html" --startPath "aegis-v5-BIBLIOTECA.html"
```

**✨ Resultado:** Cada vez que guardes el archivo (Cmd+S), el navegador se recarga SOLO.

---

## 🆚 Opción 4: VS Code Extension (La Mejor para Desarrollo)

### Instalar:
1. Abre VS Code
2. Ve a Extensions (Cmd+Shift+X)
3. Busca: `Live Server` de Ritwick Dey
4. Click en Install

### Usar:
1. Abre `aegis-v5-BIBLIOTECA.html` en VS Code
2. Click derecho en el archivo
3. Selecciona: `Open with Live Server`
4. ¡Listo! Se abrirá en tu navegador

**✨ Resultado:** Auto-reload instantáneo + servidor integrado.

---

## 📋 Resumen de Opciones

| Opción | Auto-Reload | Esfuerzo | Ideal para |
|--------|-------------|----------|------------|
| **Doble click .command** | ❌ Manual (F5) | ⭐ Ninguno | Usuario final |
| **Python http.server** | ❌ Manual (F5) | ⭐ Bajo | Sin instalar nada |
| **browser-sync** | ✅ Automático | ⭐⭐⭐ Medio | Desarrollo activo |
| **VS Code Live Server** | ✅ Automático | ⭐⭐ Bajo | Mejor experiencia |

---

## 🔧 Hacer Ejecutables (Primera vez)

Si los scripts no abren con doble click:

```bash
# Abre Terminal y ejecuta:
chmod +x ~/Desktop/ABRIR_AEGIS_V5.command
chmod +x ~/Desktop/AEGIS_V5_Simple.sh
chmod +x ~/Desktop/AEGIS_V5_LiveServer.py
```

---

## 🌐 URLs para Guardar en Favoritos

Una vez que el servidor está corriendo, guarda este enlace en tu navegador:

```
http://localhost:8080/aegis-v5-BIBLIOTECA.html
```

**Nota:** El servidor debe estar corriendo para que funcione.

---

## ❓ Solución de Problemas

### "No se puede abrir porque proviene de un desarrollador no identificado"
- Click derecho en el archivo → "Abrir"
- O: System Preferences → Security & Privacy → Abrir de todos modos

### "Puerto 8080 en uso"
- Cambia el puerto: `python3 -m http.server 9090`
- O: `lsof -ti:8080 | xargs kill` (mata el proceso usando el puerto)

### "No se encuentra el archivo"
- Verifica que existe: `ls -la ~/Desarrollo/00-Learning/aegis/aegis-v5-BIBLIOTECA.html`
- Si está en otra ubicación, modifica la ruta en el script

---

## 🎯 Mi Recomendación

**Para empezar ahora:**
1. Haz doble click en `ABRIR_AEGIS_V5.command`
2. Si te gusta modificar el código a menudo, instala VS Code + Live Server

**Para desarrollo activo:**
1. Instala VS Code
2. Instala extensión Live Server
3. Abre el archivo con "Open with Live Server"

---

## 📁 Archivos en tu Escritorio

- `ABRIR_AEGIS_V5.command` ← Doble click (recomendado)
- `AEGIS_V5_Simple.sh` ← Script simple
- `AEGIS_V5_LiveServer.py` ← Python con auto-reload
- `AEGIS_V5_Launcher.scpt` ← AppleScript (abrir con Script Editor)
- `COMO_ABRIR_AEGIS_V5.md` ← Esta guía

---

*¿Preguntas? Abre Terminal y ejecuta cualquiera de los scripts.*
