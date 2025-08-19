import React from 'react'
import { ALL_STATUSES, STATUS_LABEL, type Status } from '../utils/status'

type Props = { value: string; onChange: (v: string)=>void }
export const Filters: React.FC<Props> = ({ value, onChange }) => (
  <select className="select" value={value} onChange={e=>onChange(e.target.value)}>
    <option value="">Todos los estados</option>
    {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s as Status]}</option>)}
  </select>
)
