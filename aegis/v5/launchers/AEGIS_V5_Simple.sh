#!/bin/bash

# ═══════════════════════════════════════════════════════════
# AEGIS v5.0 Launcher - Versión Simple
# ═══════════════════════════════════════════════════════════

cd "/Users/christiantoledo/Desarrollo/00-Learning/aegis"

# Iniciar servidor
python3 -m http.server 8080 &
PID=$!

# Esperar
sleep 1

# Abrir navegador
open "http://localhost:8080/aegis-v5-BIBLIOTECA.html"

# Mostrar instrucciones
echo "✅ AEGIS v5.0 corriendo en http://localhost:8080"
echo ""
echo "📝 Para ver cambios: Guarda en VS Code → F5 en navegador"
echo "⛔ Para detener: Ejecuta: kill $PID"
echo ""
read -p "Presiona Enter para detener..."

kill $PID 2>/dev/null
