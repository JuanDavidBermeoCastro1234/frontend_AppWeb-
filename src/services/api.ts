import axios from 'axios'
import type { Status } from '../utils/status'

export type Task = {
  id?: string
  _id?: string
  titulo: string
  descripcion: string
  fechaLimite?: string
  responsable: string
  status: Status
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

export const TaskAPI = {
  async list(params: Record<string, any> = {}) { return (await api.get('/tasks', { params })).data },
  async create(payload: Partial<Task>) { return (await api.post('/tasks', payload)).data },
  async update(id: string, payload: Partial<Task>) { return (await api.put(`/tasks/${id}`, payload)).data },
  async remove(id: string) { return (await api.delete(`/tasks/${id}`)).data },
  async setStatus(id: string, status: Status) { return (await api.patch(`/tasks/${id}/status`, { status })).data },
}

export default api
