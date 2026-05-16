# 🛡️ Guía de Cumplimiento Sentinel (v4.0)
**Estándar de Seguridad para Vibe Coding y Aprendizaje Autónomo**

El módulo **Sentinel** es el encargado de asegurar que la velocidad proporcionada por la IA no comprometa la integridad de tus proyectos ni tu aprendizaje.

## 🛡️ Principios de Operación
1.  **Auditoría Pre-Commit:** Ningún código generado por IA entra al repositorio sin ser analizado por Sentinel.
2.  **Desconfianza por Diseño:** Trata el output de la IA como el código de un pasante que no conoce los riesgos de seguridad.
3.  **Contexto es Rey:** La IA a menudo ignora las variables de entorno y el contexto de red local.

## 🚫 Las "Líneas Rojas" (Alertas Críticas)
Sentinel marcará como **Vulnerable** cualquier sesión que contenga:
-   `password`, `api_key`, `token` en texto plano.
-   Uso de funciones peligrosas: `eval()`, `exec()`, `input()` sin sanitizar.
-   Configuraciones de red abiertas: `0.0.0.0` en servidores locales.
-   Permisos excesivos: `chmod 777`.

## 🛠️ Flujo de Trabajo Seguro
1.  **Promptear:** Pide a la IA que genere la solución.
2.  **Auditar (Manual):** Revisa el código buscando inyecciones SQL o XSS.
3.  **Refinar con Sentinel:** Pregunta a la IA: *"¿Cuáles son los 3 riesgos de seguridad más críticos de este código?"*
4.  **Registrar:** Al guardar en el Dashboard, Sentinel realizará un último escaneo automático.

## 🌊 Rising Water y Seguridad
A medida que el "agua sube" (tu progreso aumenta), las exigencias de Sentinel serán más estrictas. En la Fase 3 (CyberSec), no solo se buscarán errores obvios, sino fallos en la lógica de negocio y debilidades arquitectónicas.

---
*Módulo de Seguridad UNI-AUTO v4.0*
