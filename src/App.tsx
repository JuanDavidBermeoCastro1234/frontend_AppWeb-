import React, { useEffect, useMemo, useState } from 'react'
import { TaskBoard } from './components/TaskBoard'
import { TaskFormModal } from './components/TaskFormModal'
import { Filters } from './components/Filters'
import { TaskAPI, Task } from './services/api'
import { ALL_STATUSES, STATUSES } from './utils/status'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [query, setQuery] = useState('')

  async function fetchTasks() {
    try {
      setLoading(true); setError(null)
      const data = await TaskAPI.list(statusFilter ? { status: statusFilter } : {})
      const list: Task[] = Array.isArray(data) ? data : (data.tasks || [])
      setTasks(list)
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error cargando tareas')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchTasks() }, [statusFilter])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(t =>
      t.titulo?.toLowerCase().includes(q) ||
      t.descripcion?.toLowerCase().includes(q) ||
      t.responsable?.toLowerCase().includes(q)
    )
  }, [tasks, query])

  const groups = useMemo(() => ({
    [STATUSES.PENDING]: filtered.filter(t => t.status === STATUSES.PENDING),
    [STATUSES.IN_PROGRESS]: filtered.filter(t => t.status === STATUSES.IN_PROGRESS),
    [STATUSES.DONE]: filtered.filter(t => t.status === STATUSES.DONE),
  }), [filtered])

  function openCreate() { setEditing(null); setShowModal(true) }
  function openEdit(task: Task) { setEditing(task); setShowModal(true) }

  async function onCreateOrUpdate(form: Partial<Task>) {
    try {
      if (editing) {
        await TaskAPI.update((editing as any)._id || editing.id!, form)
      } else {
        await TaskAPI.create(form)
      }
      setShowModal(false); setEditing(null)
      await fetchTasks()
    } catch (e: any) { alert(e?.response?.data?.message || 'No se pudo guardar') }
  }

  async function onDelete(task: Task) {
    if (!confirm('¿Eliminar esta tarea?')) return
    try {
      await TaskAPI.remove((task as any)._id || task.id!)
      await fetchTasks()
    } catch { alert('No se pudo eliminar') }
  }

  async function onMove(task: Task, nextStatus: string) {
    try {
      await TaskAPI.setStatus((task as any)._id || task.id!, nextStatus)
      await fetchTasks()
    } catch { alert('No se pudo cambiar el estado') }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gestión de Tareas</h1>
        <div className="toolbar">
          <input className="input" placeholder="Buscar por título, desc. o responsable" value={query} onChange={e=>setQuery(e.target.value)} />
          <Filters value={statusFilter} onChange={setStatusFilter} />
          <button className="btn" onClick={openCreate}>Nueva tarea</button>
        </div>
      </div>

      {error && <div className="card" style={{borderColor:'var(--danger)'}}>{error}</div>}
      {loading ? (
        <div className="card">Cargando…</div>
      ) : (
        <TaskBoard groups={groups} onMove={onMove} onEdit={openEdit} onDelete={onDelete} />
      )}

      {showModal && (
        <TaskFormModal onClose={()=>{setShowModal(false); setEditing(null);}} onSubmit={onCreateOrUpdate} initial={editing || undefined} />
      )}
    </div>
  )
}
