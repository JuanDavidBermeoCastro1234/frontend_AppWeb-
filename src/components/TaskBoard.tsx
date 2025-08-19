import React from 'react'
import { STATUSES, STATUS_LABEL, type Status } from '../utils/status'
import { TaskCard } from './TaskCard'
import type { Task } from '../services/api'

type Props = {
  groups: Record<string, Task[]>
  onMove: (task: Task, nextStatus: Status)=>void
  onEdit: (task: Task)=>void
  onDelete: (task: Task)=>void
}

export const TaskBoard: React.FC<Props> = ({ groups, onMove, onEdit, onDelete }) => {
  return (
    <div className="grid">
      {[STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.DONE].map(col => (
        <div className="col" key={col}>
          <h3>{STATUS_LABEL[col as Status]}</h3>
          {groups[col].length === 0 && <div className="small">Sin tareas</div>}
          {groups[col].map(task => (
            <TaskCard key={(task._id || task.id)!} task={task} onMove={onMove} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      ))}
    </div>
  )
}
