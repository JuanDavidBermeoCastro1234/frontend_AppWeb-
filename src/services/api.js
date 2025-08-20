const BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:5500/TareasYa';

export async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });

    const tipo = res.headers.get('content-type') || '';
    const body = tipo.includes('application/json') ? await res.json() : await res.text();

    if (!res.ok) {
      const errorData = (typeof body === 'object' && body) ? body : {};
      throw new Error(`Error ${res.status}: ${errorData.message || res.statusText}`);
    }
    return body;
  } catch (err) {
    console.error('❌ Error en apiFetch:', err.message);
    throw err;
  }
}

export const api = {
  get:  (p) => apiFetch(p),
  post: (p, data) => apiFetch(p, { method: 'POST', body: JSON.stringify(data) }),
  patch:(p, data) => apiFetch(p, { method: 'PATCH', body: JSON.stringify(data) }),
};

export const TareasAPI = {
  listarTodas: () => api.get('/getall'),
  listarPorEstado: (estado) => api.get(`/get/${encodeURIComponent(estado)}`),
  crear: ({ titulo, descripcion, fechaLimite, responsable }) => api.post('/postTarea', { titulo, descripcion, fechaLimite, responsable }),
  cambiarEstado: (titulo, nuevoEstado) => api.patch(`/patch/${encodeURIComponent(titulo)}`, { nuevoEstado }),
};
