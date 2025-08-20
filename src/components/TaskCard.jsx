import React from 'react'
import dayjs from 'dayjs'
import { STATUSES, STATUS_LABEL } from '../utils/status.js'

export default function TaskCard({ task, onMove }){
  const estado = task.estado || STATUSES.PENDING
  const next = [
    { to: STATUSES.PENDING, label: '→ Pendiente' },
    { to: STATUSES.IN_PROGRESS, label: '→ En progreso' },
    { to: STATUSES.DONE, label: '→ Completada' },
  ].filter(o => o.to !== estado)

  const late = task.fechaLimite && dayjs(task.fechaLimite).isBefore(dayjs()) && estado !== STATUSES.DONE

  return (
    <div className="card">
      <h4>{task.titulo}</h4>
      <p>{task.descripcion}</p>
      <div className="row">
        <span className="badge">Resp: {task.responsable || '—'}</span>
        <span className="badge">Estado: {STATUS_LABEL[estado]}</span>
        {task.fechaLimite && (
          <span className="badge" style={{borderColor: late ? 'var(--danger)' : undefined}}>
            Límite: {dayjs(task.fechaLimite).format('YYYY-MM-DD')}
          </span>
        )}
      </div>
      <hr />
      <div className="row">
        {next.map(opt => (
          <button key={opt.to} className="btn secondary" onClick={()=>onMove(task, opt.to)}>{opt.label}</button>
        ))}
      </div>
    </div>
  )
}
