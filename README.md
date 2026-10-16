# Sademy · Marketplace de Servicios y Oficios Verificados

Plataforma integral de contratación y gestión de servicios profesionales y oficios verificados con custodia segura de fondos (Escrow), validación facial biométrica 3D estilo Apple Face ID, emisión de facturas electrónicas oficiales y CRM profesional integrado.

## 🚀 Características Principales

- **Marketplace de Profesionales Verificados:** Directorio interactivo de electricistas, plomeros, cerrajeros, gasistas, aire acondicionado y más, con filtros avanzados y ordenamiento por reputación.
- **Validación Facial Biométrica Obligatoria (Sademy Face ID):** Sistema 3D hands-free que analiza encuadre, iluminación y simetría, capturando automáticamente la foto oficial del trabajador sin tocar la pantalla.
- **Sistema de Custodia Segura (Escrow):** Retención y liberación de honorarios protegida mediante código PIN de 4 dígitos tras confirmación de satisfacción del cliente.
- **Calificación y Acumulación Automática de Reseñas:** Cálculo matemático del promedio ponderado en tiempo real tras la finalización de cada servicio, sincronizado con el CRM del profesional.
- **Emisión y Descarga de Factura Electrónica:** Generador oficial con logo corporativo Sademy, letra de comprobante, desglose fiscal, QR y descarga en PDF/impresión.
- **CRM Profesional Integrado:** Panel de control para trabajadores con métricas de cobros, historial de trabajos realizados, clientes frecuentes y estados de presupuestos.
- **Diseño & Experiencia Cupertino / Apple Standard:** Microinteracciones de alta fidelidad, síntesis de audio espacial con Web Audio API, modo responsivo y PWA instalable.

## 🛠️ Tecnologías

- **Frontend:** Vanilla HTML5 semántico, CSS3 modular (variables, glassmorphism, responsive grid), JavaScript moderno (ES6+).
- **Audio & Biometría:** Web Audio API para efectos mecánicos y campanas de éxito, MediaDevices WebRTC para escaneo facial.
- **Despliegue:** Optimizado para Vercel con reglas de headers de seguridad, compresión y caché de activos estáticos en `vercel.json`.

## 📦 Despliegue en Vercel

El proyecto está configurado para desplegarse con 1 clic en Vercel como sitio estático sin requerir build steps:

1. Importar el repositorio `DIGITALL60/sademy` en Vercel.
2. Framework Preset: **Other** (Root directory `./`).
3. Hacer clic en **Deploy**.
