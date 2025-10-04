# QA Companion

Proyecto monorepo que incluye las bases de la aplicación QA Companion para Web (React), Mobile (React Native + Expo) y un backend Node.js con Express + SQLite.

## Estructura

```
qa-companion1/
├── web/        # Aplicación web (React + Vite + Tailwind)
├── mobile/     # Aplicación mobile (Expo)
└── backend/    # API REST en Express + SQLite
```

## Requisitos previos

- Node.js >= 18
- npm o yarn
- Expo CLI (`npm install -g expo-cli`) para ejecutar la app mobile

## Scripts principales

### Web

```bash
cd web
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`. Configura la variable `VITE_API_URL` en un archivo `.env` para apuntar al backend.

### Backend

```bash
cd backend
npm install
npm run dev
```

El backend levanta en `http://localhost:4000`. Incluye endpoints para `/api/test-cases` y `/api/bugs` que utilizan SQLite como persistencia ligera.

### Mobile (Expo)

```bash
cd mobile
npm install
npm start
```

Sigue las instrucciones en la terminal para abrir el proyecto en Android, iOS o web. El módulo `app/services/storage.js` crea tablas SQLite locales y seeding básico.

## Extender el proyecto

- **Autenticación**: Integra un servicio OAuth/JWT compartido entre web y mobile. Añade middleware en Express para proteger rutas.
- **Sincronización**: Implementa sincronización offline/online usando SQLite local y colas de sincronización con el backend.
- **Gestión de archivos**: Habilita uploads en web (por ejemplo con S3) y en mobile usando `expo-file-system`/`expo-image-picker`.
- **Reportes avanzados**: Añade generación de PDF mediante `pdfmake` o `jsPDF`, y endpoints para exportar CSV consolidado.
- **Pruebas**: Configura Jest/React Testing Library para web y mobile, y Supertest para backend.

## Datos iniciales

Tanto la app web como el backend incluyen datos precargados de test cases y bugs para facilitar el prototipado rápido.
