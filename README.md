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

El backend levanta en `http://localhost:4000`. Expone endpoints para autenticación (`/api/auth/*`), tableros de tareas (`/api/tasks`) y los recursos existentes de `/api/test-cases` y `/api/bugs`, todos persistidos en SQLite.

### Mobile (Expo)

```bash
cd mobile
npm install
npm start
```

Sigue las instrucciones en la terminal para abrir el proyecto en Android, iOS o web. El módulo `app/services/storage.js` crea tablas SQLite locales y seeding básico.

## Funcionalidades destacadas

- **Autenticación moderna**: pantalla de acceso con login/registro mediante correo y contraseña, acceso rápido con cuentas Gmail y opción "Mantener sesión". La preferencia de idioma del usuario se guarda en la base de datos.
- **Internacionalización (i18n)**: la interfaz web puede alternarse entre español, inglés, portugués y francés desde Settings → Idioma de la interfaz. Las preferencias se recuerdan por usuario.
- **Integraciones rápidas**: sección "Mis herramientas" en el dashboard con atajos a Slack, Confluence, GitHub, documentación Git y VS Code web.
- **Task board propio**: tablero kanban totalmente interno con edición, etiquetas, vista lista y sincronización con el backend `/api/tasks`.
- **Favicon e identidad**: se añadió un favicon y los headers principales lucen el emblema de QA Companion para una experiencia más pulida.

## Extender el proyecto

- **Autenticación avanzada**: incorporar JWT, refresco de tokens y middlewares de autorización granular.
- **Sincronización offline/online**: añadir colas y reintentos para mantener al día el tablero de tareas en condiciones sin conexión.
- **Gestión de evidencias**: habilitar subida de archivos en web (S3, Supabase) y mobile (`expo-file-system`, `expo-image-picker`).
- **Reportes avanzados**: generar dashboards adicionales y automatizar reportes PDF/CSV enriquecidos.
- **Pruebas**: integrar Jest/React Testing Library en web, Detox/React Native Testing Library en mobile y Supertest para el backend.

## Datos iniciales

Tanto la app web como el backend incluyen datos precargados de test cases y bugs para facilitar el prototipado rápido.
