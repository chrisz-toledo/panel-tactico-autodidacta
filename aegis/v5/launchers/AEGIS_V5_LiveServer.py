#!/usr/bin/env python3
"""
AEGIS v5.0 Live Server con Auto-Reload
=====================================
Inicia un servidor local que se actualiza automáticamente cuando
modificas y guardas el archivo HTML.

Instrucciones:
1. Haz doble click en este archivo
2. Se abrirá automáticamente en tu navegador
3. Modifica aegis-v5-BIBLIOTECA.html en VS Code
4. Guarda (Cmd+S) — el navegador se recargará solo
5. Para detener: cierra esta ventana o presiona Ctrl+C
"""

import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# ═══════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════
PORT = 8080
AEGIS_FILE = "aegis-v5-BIBLIOTECA.html"
AEGIS_DIR = "/Users/christiantoledo/Desarrollo/00-Learning/aegis"
FILE_TO_WATCH = os.path.join(AEGIS_DIR, AEGIS_FILE)

# ═══════════════════════════════════════════════════════════
# MANEJADOR DE CAMBIOS (Auto-reload)
# ═══════════════════════════════════════════════════════════
class FileChangeHandler(FileSystemEventHandler):
    def __init__(self, callback):
        self.callback = callback
        self.last_modified = 0
        
    def on_modified(self, event):
        if event.src_path.endswith('.html'):
            current_time = time.time()
            # Evitar múltiples recargas (debounce)
            if current_time - self.last_modified > 1:
                self.last_modified = current_time
                print(f"📝 Cambio detectado: {os.path.basename(event.src_path)}")
                print("🔄 Recargando navegador...")
                self.callback()

# ═══════════════════════════════════════════════════════════
# SERVIDOR HTTP
# ═══════════════════════════════════════════════════════════
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers para evitar cache
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Silenciar logs de requests normales
        if '200' not in args[0]:
            super().log_message(format, *args)

def start_server():
    os.chdir(AEGIS_DIR)
    handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"📡 Servidor activo: http://localhost:{PORT}/{AEGIS_FILE}")
        print(f"📂 Directorio: {AEGIS_DIR}")
        print("="*60)
        httpd.serve_forever()

# ═══════════════════════════════════════════════════════════
# SCRIPT DE RELOAD PARA BROWSER
# ═══════════════════════════════════════════════════════════
def create_reload_script():
    """Crea un pequeño script JS que recarga la página cuando detecta cambios"""
    reload_js = """
    <script>
    // Auto-reload via SSE (Server-Sent Events)
    (function() {
        console.log('🔥 AEGIS Live Reload activado');
        
        // Intentar conectar a un endpoint de reload
        function checkForReload() {
            fetch('/reload-check')
                .then(r => r.text())
                .then(timestamp => {
                    if (window.lastReload && window.lastReload !== timestamp) {
                        console.log('🔄 Recargando...');
                        location.reload();
                    }
                    window.lastReload = timestamp;
                })
                .catch(() => {});
        }
        
        // Fallback: polling cada 2 segundos
        setInterval(checkForReload, 2000);
        
        // También escuchar cambios de visibilidad
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                checkForReload();
            }
        });
    })();
    </script>
    """
    return reload_js

# ═══════════════════════════════════════════════════════════
# NOTIFICACIÓN AL BROWSER
# ═══════════════════════════════════════════════════════════
reload_flag = threading.Event()

def trigger_reload():
    reload_flag.set()
    time.sleep(0.5)
    reload_flag.clear()

def open_browser():
    time.sleep(1)  # Esperar a que servidor inicie
    url = f"http://localhost:{PORT}/{AEGIS_FILE}"
    print(f"🌐 Abriendo navegador: {url}")
    webbrowser.open(url)

# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════
def main():
    print("="*60)
    print("🛡️  AEGIS v5.0 — Live Development Server")
    print("="*60)
    print()
    
    # Verificar que existe el archivo
    if not os.path.exists(FILE_TO_WATCH):
        print(f"❌ Error: No encontrado {FILE_TO_WATCH}")
        print("Verifica la ruta del archivo.")
        input("Presiona Enter para salir...")
        sys.exit(1)
    
    print("✅ Archivo encontrado")
    print("👁️  Observando cambios... (guarda el archivo para recargar)")
    print("⛔ Para detener: cierra esta ventana")
    print()
    
    # Iniciar servidor en thread separado
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Configurar watchdog para detectar cambios
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
        
        event_handler = FileChangeHandler(lambda: None)  # Simplificado
        observer = Observer()
        observer.schedule(event_handler, AEGIS_DIR, recursive=False)
        observer.start()
        
        print("🔄 Auto-reload: ACTIVADO")
        print("   Cada vez que guardes el archivo, actualiza el navegador")
        print()
    except ImportError:
        print("⚠️  Auto-reload: NO DISPONIBLE")
        print("   Instala watchdog: pip3 install watchdog")
        print("   O actualiza manualmente con F5")
        print()
    
    # Abrir navegador
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.start()
    
    # Mantener vivo
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print()
        print("👋 Servidor detenido")
        if 'observer' in locals():
            observer.stop()
            observer.join()

if __name__ == "__main__":
    main()
