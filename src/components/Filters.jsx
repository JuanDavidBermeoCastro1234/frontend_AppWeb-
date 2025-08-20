import React from 'react'
import { ALL_STATUSES, STATUS_LABEL } from '../utils/status.js'

export default function Filters({ value, onChange }){
  return (
    <select className="select" value={value} onChange={e=>onChange(e.target.value)}>
      <option value="">Todos los estados</option>
      {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
    </select>
  )
}
