# 🅿️ EasyPark — Frontend

> **Sistema de Gestión de Parqueaderos** — SPA construida con React 19, Vite 6 y Tailwind CSS. Desplegada en Vercel.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)

---

## 📑 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura del cliente](#arquitectura-del-cliente)
- [Requisitos previos](#requisitos-previos)
- [Configuración del entorno de desarrollo](#configuración-del-entorno-de-desarrollo)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades principales](#funcionalidades-principales)
- [Despliegue en Vercel](#despliegue-en-vercel)

---

## Descripción

EasyPark Frontend es la interfaz de usuario del sistema de gestión de parqueaderos. Permite a los conductores buscar parqueaderos disponibles en un mapa interactivo, hacer reservas, gestionar sus vehículos y consultar su historial. Consume la REST API del backend mediante llamadas HTTP autenticadas con JWT.

---

## Arquitectura del Cliente

```
┌──────────────────────────────────────────────┐
│           React 19 SPA (Vite 6)              │
│                                              │
│  React Router v7                             │
│  (rutas públicas + rutas protegidas)         │
│           ↓                                  │
│  Páginas / Componentes                       │
│  ├── Mapa (Leaflet + OpenStreetMap)          │
│  ├── Auth (Login / Registro)                 │
│  ├── Reservas                                │
│  └── Vehículos                               │
│           ↓                                  │
│  Axios (HTTP Client + JWT en headers)        │
└──────────────────┬───────────────────────────┘
                   │ REST API / JSON
         Backend ASP.NET Core 8
```

---

## Requisitos Previos

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| Node.js | 18.x LTS | https://nodejs.org/ |
| npm | 9+ (incluido con Node) | — |
| Git | cualquiera | https://git-scm.com/ |

> El backend de EasyPark debe estar corriendo para que el frontend funcione correctamente. Ver [EasyPark Backend](https://github.com/mafevg18/EASYPARK).

---

## Configuración del Entorno de Desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/mafevg18/EasyPark-Frontend.git
cd EasyPark-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL base del backend (sin barra final)
VITE_API_URL=http://localhost:5000
```

> En desarrollo apunta a tu backend local. En producción apunta a la URL de Railway.  
> ⚠️ `.env` está en `.gitignore`. **No subas credenciales ni URLs privadas al repositorio.**

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en **`http://localhost:5173`** con Hot Module Replacement (HMR) activado.

### 5. Verificar la conexión con el backend

Al abrir la app, intenta registrarte o iniciar sesión. Si ves errores de red, confirma que:
- El backend está corriendo en `http://localhost:5000`
- El valor de `VITE_API_URL` en `.env` es correcto
- CORS está habilitado en el backend para `http://localhost:5173`

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la REST API del backend | `https://easypark-api.up.railway.app` |

> Todas las variables de Vite deben comenzar con `VITE_` para ser accesibles en el código del cliente.

**Uso en código:**
```js
const API_URL = import.meta.env.VITE_API_URL;
```

---

## Scripts Disponibles

```bash
# Servidor de desarrollo con HMR
npm run dev

# Build de producción (salida en /dist)
npm run build

# Vista previa del build de producción en local
npm run preview

# Lint del código
npm run lint
```

---

## Estructura del Proyecto

```
EasyPark-Frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   ├── components/          # Componentes reutilizables
│   │   ├── Map/             # Leaflet + react-leaflet
│   │   ├── Navbar/
│   │   └── ProtectedRoute/  # HOC para rutas protegidas
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx         # Mapa principal con parqueaderos
│   │   ├── Reservations.jsx
│   │   └── Vehicles.jsx
│   ├── services/
│   │   └── api.js           # Instancia de Axios + interceptores JWT
│   ├── context/             # React Context para auth state
│   ├── App.jsx              # Rutas con react-router-dom v7
│   └── main.jsx             # Punto de entrada
├── .env                     ← no versionado
├── .env.example             ← plantilla de variables de entorno
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Funcionalidades Principales

| Módulo | Descripción |
|---|---|
| **Autenticación** | Registro e inicio de sesión con JWT. Token almacenado en `localStorage` y enviado en cada petición via Axios interceptors. |
| **Mapa interactivo** | Visualización de parqueaderos disponibles sobre OpenStreetMap usando Leaflet 1.9 + react-leaflet 5. Marcadores con estado en tiempo real. |
| **Reservas** | Crear, consultar y cancelar reservas de parqueaderos directamente desde el mapa o el listado. |
| **Vehículos** | Registrar y eliminar vehículos del perfil del conductor. |
| **Rutas protegidas** | Las páginas de usuario requieren sesión activa; los usuarios no autenticados son redirigidos al login. |
| **Notificaciones** | Feedback visual de acciones usando `react-hot-toast`. |
| **PWA-ready** | Compatible con instalación en iOS y Android como Progressive Web App. |

---

## Dependencias Principales

| Paquete | Versión | Uso |
|---|---|---|
| `react` | 19 | Framework UI |
| `vite` | 6 | Build tool y servidor de desarrollo |
| `tailwindcss` | 3 | Estilos utilitarios |
| `react-router-dom` | v7 | Routing cliente + rutas protegidas |
| `leaflet` | 1.9 | Mapas interactivos |
| `react-leaflet` | 5.0 | Integración React para Leaflet |
| `axios` | 1.15 | Cliente HTTP |
| `lucide-react` | latest | Iconos |
| `react-hot-toast` | latest | Notificaciones toast |

---

## Despliegue en Vercel

### Opción A — Deploy automático desde GitHub (recomendado)

1. Importar el repositorio en [vercel.com/new](https://vercel.com/new).
2. Vercel detecta Vite automáticamente. Confirmar:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. En la sección **Environment Variables** de Vercel, agregar:
   ```
   VITE_API_URL = https://tu-backend.up.railway.app
   ```
4. Hacer clic en **Deploy**. Cada push a `main` disparará un deploy automático.

### Opción B — Deploy manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la raíz del proyecto
vercel

# Para producción
vercel --prod
```

---

## Backend

La API REST que consume este frontend se encuentra en:  
👉 [github.com/mafevg18/EASYPARK](https://github.com/mafevg18/EASYPARK)

---

*EasyPark — Mayo 2026*
