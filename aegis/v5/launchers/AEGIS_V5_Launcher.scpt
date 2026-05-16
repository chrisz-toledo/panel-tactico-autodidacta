-- AEGIS v5.0 Launcher (AppleScript)
-- Guardar como Aplicación para tener ícono en el escritorio
-- 
-- Instrucciones para crear la app:
-- 1. Abrir "Script Editor" (buscar en Spotlight)
-- 2. Copiar este código
-- 3. File > Save
-- 4. File Format: Application
-- 5. Check: "Show startup screen" (opcional)
-- 6. Check: "Stay open after run handler" (opcional)
-- 7. Guardar en Desktop con nombre "AEGIS v5"

-- ═══════════════════════════════════════════════════════════
-- CONFIGURACIÓN
-- ═══════════════════════════════════════════════════════════
set aegisPath to "/Users/christiantoledo/Desarrollo/00-Learning/aegis/aegis-v5-BIBLIOTECA.html"
set aegisDir to "/Users/christiantoledo/Desarrollo/00-Learning/aegis"

-- ═══════════════════════════════════════════════════════════
-- FUNCIONES
-- ═══════════════════════════════════════════════════════════

-- Verificar si archivo existe
on checkFileExists(filePath)
    try
        set fileAlias to POSIX file filePath as alias
        return true
    on error
        return false
    end try
end checkFileExists

-- Iniciar servidor Python simple
on startPythonServer()
    tell application "Terminal"
        activate
        set serverCommand to "cd " & quoted form of aegisDir & " && python3 -m http.server 8080"
        do script serverCommand
        delay 1
    end tell
end startPythonServer

-- Abrir Chrome con el archivo
on openInChrome()
    tell application "Google Chrome"
        activate
        set urlToOpen to "http://localhost:8080/aegis-v5-BIBLIOTECA.html"
        
        -- Verificar si ya hay una ventana abierta
        if (count of windows) is 0 then
            make new window
        end if
        
        -- Abrir o recargar
        tell front window
            set newTab to make new tab with properties {URL:urlToOpen}
        end tell
    end tell
end openInChrome

-- Abrir Safari como alternativa
on openInSafari()
    tell application "Safari"
        activate
        set docURL to "http://localhost:8080/aegis-v5-BIBLIOTECA.html"
        
        -- Crear nueva ventana si no hay ninguna
        if (count of windows) is 0 then
            make new document
        end if
        
        tell front document
            set URL to docURL
        end tell
    end tell
end openInSafari

-- ═══════════════════════════════════════════════════════════
-- MAIN
-- ═══════════════════════════════════════════════════════════

-- Verificar archivo
if not checkFileExists(aegisPath) then
    display dialog "❌ No se encontró AEGIS v5:\n" & aegisPath buttons {"OK"} default button "OK" with icon stop
    return
end if

-- Mensaje de inicio
display notification "Iniciando servidor local en puerto 8080..." with title "🛡️ AEGIS v5.0"

-- Iniciar servidor
startPythonServer()

-- Esperar a que servidor esté listo
delay 2

-- Intentar abrir en Chrome, si no existe usar Safari
try
    openInChrome()
    display notification "AEGIS v5.0 abierto en Chrome\nServidor: http://localhost:8080" with title "✅ Listo"
on error
    try
        openInSafari()
        display notification "AEGIS v5.0 abierto en Safari\nServidor: http://localhost:8080" with title "✅ Listo"
    on error
        display dialog "⚠️ No se pudo abrir el navegador automáticamente.\n\nAbre manualmente:\nhttp://localhost:8080/aegis-v5-BIBLIOTECA.html" buttons {"OK"} default button "OK"
    end try
end try

-- Instrucciones finales
display dialog "🛡️ AEGIS v5.0 está corriendo!

📡 Servidor: http://localhost:8080
📂 Archivo: aegis-v5-BIBLIOTECA.html

📝 Para actualizar cambios:
   1. Modifica el archivo en VS Code
   2. Guarda (Cmd+S)
   3. Presiona F5 en el navegador

⛔ Para detener:
   Cierra la ventana de Terminal

💡 Auto-reload avanzado:
   Instala la extensión \"Live Server\" en VS Code" buttons {"OK"} default button "OK" with icon note
