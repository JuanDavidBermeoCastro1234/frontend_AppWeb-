import React, { useEffect, useState } from 'react'
import { STATUSES, type Status } from '../utils/status'
import type { Task } from '../services/api'

type Props = {
  initial?: Task
  onClose: ()=>void
  onSubmit: (payload: Partial<Task>)=>void
}

export const TaskFormModal: React.FC<Props> = ({ initial, onClose, onSubmit }) => {
  const [form, setForm] = useState<Partial<Task>>({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    responsable: '',
    status: STATUSES.PENDING as Status,
  })

  useEffect(() => {
    if (initial) {
      setForm({
        titulo: initial.titulo || '',
        descripcion: initial.descripcion || '',
        fechaLimite: (initial.fechaLimite || '').slice(0,10),
        responsable: initial.responsable || '',
        status: (initial.status || STATUSES.PENDING) as Status,
      })
    }
  }, [initial])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo?.trim() || !form.descripcion?.trim() || !form.responsable?.trim()) {
      alert('Título, descripción y responsable son obligatorios')
      return
    }
    const payload = { ...form }
    if (payload.fechaLimite === '') delete (payload as any).fechaLimite
    onSubmit(payload)
  }

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>{initial ? 'Editar tarea' : 'Nueva tarea'}</h3>
        <form onSubmit={handleSubmit}>
          <label className="label">Título</label>
          <input className="input" name="titulo" value={form.titulo || ''} onChange={handleChange} />

          <label className="label">Descripción</label>
          <textarea className="textarea" rows={4} name="descripcion" value={form.descripcion || ''} onChange={handleChange} />

          <div className="row" style={{gap:12}}>
            <div style={{flex:1}}>
              <label className="label">Fecha límite</label>
              <input className="input" type="date" name="fechaLimite" value={form.fechaLimite || ''} onChange={handleChange} />
            </div>
            <div style={{flex:1}}>
              <label className="label">Responsable</label>
              <input className="input" name="responsable" value={form.responsable || ''} onChange={handleChange} />
            </div>
          </div>

          <label className="label">Estado</label>
          <select className="select" name="status" value={(form.status as string) || STATUSES.PENDING} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>

          <hr />
          <div className="row">
            <button type="button" className="btn secondary" onClick={onClose}>Cancelar</button>
            <span className="spacer" />
            <button type="submit" className="btn">{initial ? 'Guardar cambios' : 'Crear tarea'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
