# Frontend React (TypeScript) – Gestión de Tareas Colaborativas

Listo para consumir un backend en Node/Express/Mongo bajo `/api/tasks`.

## Variables de entorno
Crea `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Instalar y ejecutar
```bash
npm install
npm run dev
```

## Endpoints esperados (backend)
- `GET    /api/tasks` (opcional `?status=pendiente|en_progreso|completada`)
- `POST   /api/tasks`
- `PUT    /api/tasks/:id`
- `PATCH  /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

Configura CORS en tu backend:
```js
import cors from 'cors';
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
```
