#!/bin/bash

# ═══════════════════════════════════════════════════════════
# AEGIS v5.0 Launcher — Inicia servidor local con auto-reload
# ═══════════════════════════════════════════════════════════

echo "🚀 Iniciando AEGIS v5.0 Biblioteca..."

# Ruta al archivo HTML
AEGIS_PATH="/Users/christiantoledo/Desarrollo/00-Learning/aegis/aegis-v5-BIBLIOTECA.html"
AEGIS_DIR="/Users/christiantoledo/Desarrollo/00-Learning/aegis"

# Verificar si existe browser-sync (para auto-reload)
if command -v npx &> /dev/null; then
    echo "📡 Iniciando servidor con auto-reload..."
    echo "   Cuando guardes cambios en el archivo, se recargará automáticamente"
    echo "   Presiona Ctrl+C para detener"
    echo ""
    
    cd "$AEGIS_DIR"
    npx browser-sync start --server --files "*.html" --startPath "aegis-v5-BIBLIOTECA.html" --no-notify --port 8080 &
    
    # Esperar un momento y abrir Chrome
    sleep 3
    open "http://localhost:8080/aegis-v5-BIBLIOTECA.html"
    
    # Mantener ventana abierta
    wait
else
    # Fallback: servidor Python simple
    echo "⚡ Modo simple (sin auto-reload):"
    echo "   Abre el archivo directamente en el navegador"
    echo "   Para actualizar: presiona F5 después de guardar cambios"
    echo ""
    
    open "$AEGIS_PATH"
    
    echo "✅ AEGIS v5.0 abierto en navegador predeterminado"
    echo "📝 Para auto-reload en el futuro, instala Node.js y ejecuta:"
    echo "   npx browser-sync start --server --files '*.html'"
    echo ""
    echo "Presiona Enter para cerrar esta ventana..."
    read
fi
