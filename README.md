# Frontend React (JS) para TareasYa

Conecta con tu backend Express (rutas bajo `/TareasYa`).

## Endpoints usados
- `GET    /TareasYa/getall`
- `GET    /TareasYa/get/:estado`
- `POST   /TareasYa/postTarea` (body: `{ titulo, descripcion, fechaLimite, responsable }`)
- `PATCH  /TareasYa/patch/:nombreTarea` (body: `{ nuevoEstado }`)

## Configuración
Crea `.env`:
```
VITE_API_BASE_URL=http://localhost:5500/TareasYa
```

## Iniciar
```bash
npm install
npm run dev
```
Abre `http://localhost:5173`.
