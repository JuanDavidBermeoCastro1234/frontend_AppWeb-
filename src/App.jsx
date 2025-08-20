import React, { useEffect, useMemo, useState } from 'react'
import TaskBoard from './components/TaskBoard.jsx'
import TaskFormModal from './components/TaskFormModal.jsx'
import Filters from './components/Filters.jsx'
import { TareasAPI } from './services/api.js'

export default function App(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [query, setQuery] = useState('')

  async function fetchTasks(){
    try{
      setLoading(true); setError(null)
      let data
      if(!statusFilter){
        data = await TareasAPI.listarTodas()
      } else {
        data = await TareasAPI.listarPorEstado(statusFilter)
      }
      const list = Array.isArray(data) ? data : (data.tareas || [])
      setTasks(list)
    }catch(e){ setError(e.message || 'Error cargando tareas') }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchTasks() }, [statusFilter])

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return tasks
    return tasks.filter(t =>
      (t.titulo||'').toLowerCase().includes(q) ||
      (t.descripcion||'').toLowerCase().includes(q) ||
      (t.responsable||'').toLowerCase().includes(q)
    )
  }, [tasks, query])

  async function onCreate(form){
    try{
      await TareasAPI.crear(form)
      setShowModal(false)
      await fetchTasks()
    }catch(e){ alert(e.message || 'No se pudo crear') }
  }

  async function onMove(task, nextStatus){
    try{
      await TareasAPI.cambiarEstado(task.titulo, nextStatus)
      await fetchTasks()
    }catch(e){ alert('No se pudo cambiar el estado') }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>TareasYa – Gestión de Tareas</h1>
        <div className="toolbar">
          <input className="input" placeholder="Buscar por título, desc. o responsable" value={query} onChange={e=>setQuery(e.target.value)} />
          <Filters value={statusFilter} onChange={setStatusFilter} />
          <button className="btn" onClick={()=>setShowModal(true)}>Nueva tarea</button>
        </div>
      </div>

      {error && <div className="card" style={{borderColor:'var(--danger)'}}>{error}</div>}
      {loading ? (
        <div className="card">Cargando…</div>
      ) : (
        <TaskBoard tasks={filtered} onMove={onMove} />
      )}

      {showModal && (
        <TaskFormModal onClose={()=>setShowModal(false)} onSubmit={onCreate} />
      )}
    </div>
  )
}
