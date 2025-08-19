import React from 'react'
import dayjs from 'dayjs'
import { STATUSES, STATUS_LABEL, type Status } from '../utils/status'
import type { Task } from '../services/api'

type Props = {
  task: Task
  onMove: (task: Task, nextStatus: Status)=>void
  onEdit: (task: Task)=>void
  onDelete: (task: Task)=>void
}

export const TaskCard: React.FC<Props> = ({ task, onMove, onEdit, onDelete }) => {
  const id = (task._id || task.id)!
  const nextOptions = [
    { to: STATUSES.PENDING, label: '→ Pendiente' },
    { to: STATUSES.IN_PROGRESS, label: '→ En progreso' },
    { to: STATUSES.DONE, label: '→ Completada' },
  ].filter(o => o.to !== task.status)

  const late = task.fechaLimite && dayjs(task.fechaLimite).isBefore(dayjs()) && task.status !== STATUSES.DONE

  return (
    <div className="card">
      <h4>{task.titulo}</h4>
      <p>{task.descripcion}</p>
      <div className="row">
        <span className="badge">Resp: {task.responsable || '—'}</span>
        <span className="badge">Estado: {STATUS_LABEL[task.status]}</span>
        {task.fechaLimite && (
          <span className="badge" style={{borderColor: late ? 'var(--danger)' : undefined}}>
            Limite: {dayjs(task.fechaLimite).format('YYYY-MM-DD')}
          </span>
        )}
      </div>
      <hr />
      <div className="row">
        {nextOptions.map(opt => (
          <button key={opt.to} className="btn secondary" onClick={()=>onMove(task, opt.to as Status)}>{opt.label}</button>
        ))}
        <span className="spacer" />
        <button className="btn secondary" onClick={()=>onEdit(task)}>Editar</button>
        <button className="btn danger" onClick={()=>onDelete(task)}>Eliminar</button>
      </div>
    </div>
  )
}
