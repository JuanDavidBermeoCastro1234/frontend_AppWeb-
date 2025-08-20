import React, { useState } from 'react'

export default function TaskFormModal({ onClose, onSubmit }){
  const [form, setForm] = useState({ titulo:'', descripcion:'', fechaLimite:'', responsable:'' })
  const onChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}))
  const submit = e => { e.preventDefault(); if(!form.titulo.trim()||!form.descripcion.trim()||!form.responsable.trim()||!form.fechaLimite){ alert('Título, descripción, responsable y fecha límite obligatorios'); return;} onSubmit(form) }

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Nueva tarea</h3>
        <form onSubmit={submit}>
          <label className="label">Título</label>
          <input className="input" name="titulo" value={form.titulo} onChange={onChange} />

          <label className="label">Descripción</label>
          <textarea className="textarea" rows={4} name="descripcion" value={form.descripcion} onChange={onChange} />

          <div className="row" style={{gap:12}}>
            <div style={{flex:1}}>
              <label className="label">Fecha límite</label>
              <input className="input" type="date" name="fechaLimite" value={form.fechaLimite} onChange={onChange} />
            </div>
            <div style={{flex:1}}>
              <label className="label">Responsable</label>
              <input className="input" name="responsable" value={form.responsable} onChange={onChange} />
            </div>
          </div>

          <hr />
          <div className="row">
            <button type="button" className="btn secondary" onClick={onClose}>Cancelar</button>
            <span className="spacer" />
            <button type="submit" className="btn">Crear tarea</button>
          </div>
        </form>
      </div>
    </div>
  )
}
