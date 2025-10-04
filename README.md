# QA Companion

Aplicación cross-platform para analistas QA. Incluye una app web (React + Vite + Material UI), un backend Node.js/Express con SQLite y una app mobile Expo (React Native) para Android/iOS.

## Estructura del repositorio

```
qa-companion1/
├── backend/         # API REST con Express y SQLite
├── mobile/          # App React Native + Expo
├── web/             # App React (Vite) + Material UI
└── README.md        # Este archivo
```

## Requisitos previos

- Node.js >= 18
- npm o yarn
- Expo CLI (`npm install -g expo-cli`) para ejecutar la app mobile (opcional)

## Instalación y ejecución

### Backend (API)

```bash
cd backend
npm install
npm run dev
```

La API se inicia en `http://localhost:4000` con endpoints:
- `GET /api/test-cases`
- `POST /api/test-cases`
- `GET /api/bugs`
- `POST /api/bugs`

> La base `qa-companion.db` se genera automáticamente con datos de ejemplo. Extiende el esquema en `src/services/database.js` para más entidades.

### Web (React)

```bash
cd web
npm install
npm run dev
```

La aplicación se abre en `http://localhost:5173`. El login acepta cualquier usuario/contraseña (placeholder). Ajusta `AuthContext` para integrar autenticación real.

### Mobile (Expo)

```bash
cd mobile
npm install
npm run start
```

Desde Expo DevTools escanea el QR para Android/iOS o lanza el simulador (`npm run android` / `npm run ios`). La app comparte la lógica de módulos clave: Dashboard, Casos de Prueba, Bugs, Checklists, API Tester, SQL Client y Reportes.

> Asegúrate de que el backend esté activo en tu red para consumir datos reales. En producción configura variables de entorno y HTTPS.

## Extensibilidad

- **Autenticación real**: integrar JWT/OAuth y roles en `AuthContext` (web/mobile) y middleware en `backend/src`.
- **Sincronización**: agregar persistencia remota para mobile usando SQLite local + sincronización offline/online.
- **Reportes PDF**: conectar librerías como `pdfmake` o `expo-print` para generar documentos.
- **API Tester avanzado**: soportar métodos PUT/DELETE, colecciones y guardar presets.
- **SQL Client**: mover lógica a backend para evitar exponer credenciales en el cliente.

## Datos de ejemplo

Tanto web como mobile incluyen datasets precargados (`src/data`). El backend también seed-ea registros iniciales en SQLite para simular un entorno realista.

## Testing

Este es un MVP de referencia. Añade pruebas unitarias/e2e (Jest, React Testing Library, Detox) en iteraciones posteriores.
