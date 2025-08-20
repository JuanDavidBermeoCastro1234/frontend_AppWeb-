import React from 'react'
import TaskCard from './TaskCard.jsx'
import { STATUSES } from '../utils/status.js'

export default function TaskBoard({ tasks, onMove }){
  const groups = { [STATUSES.PENDING]: [], [STATUSES.IN_PROGRESS]: [], [STATUSES.DONE]: [] }
  tasks.forEach(t => { const st = t.estado || STATUSES.PENDING; if(groups[st]) groups[st].push(t) })

  return (
    <div className="grid">
      {[STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.DONE].map(col => (
        <div className="col" key={col}>
          <h3>{col === 'pendiente' ? 'Pendiente' : col === 'en_progreso' ? 'En progreso' : 'Completada'}</h3>
          {groups[col].length === 0 && <div className="small">Sin tareas</div>}
          {groups[col].map(task => <TaskCard key={task._id || task.titulo} task={task} onMove={onMove} />)}
        </div>
      ))}
    </div>
  )
}
