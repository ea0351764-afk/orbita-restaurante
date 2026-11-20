import { useState, useEffect } from 'react'
import { useTema } from '../context/TemaContexto'

export default function ReservaMesas() {
  const { tema } = useTema()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [fechaSeleccionada, setFechaSeleccionada] = useState('')
  const [horario, setHorario] = useState('')
  const [personas, setPersonas] = useState(1)
  const [comentarios, setComentarios] = useState('')
  const [fechasOcupadas, setFechasOcupadas] = useState([])

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('fechasReservadas')) || []
    setFechasOcupadas(guardadas)
  }, [])

  const guardarReserva = (e) => {
    e.preventDefault()
    if (!fechaSeleccionada || !horario) return

    const nuevasFechas = [...fechasOcupadas, fechaSeleccionada]
    setFechasOcupadas(nuevasFechas)
    localStorage.setItem('fechasReservadas', JSON.stringify(nuevasFechas))

    alert('✅ Reserva guardada correctamente!')
    setNombre('')
    setTelefono('')
    setCorreo('')
    setFechaSeleccionada('')
    setHorario('')
    setPersonas(1)
    setComentarios('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '4rem 1rem',
      background: '#1a1a1a',
      color: '#f0f0f0'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.4rem',
          marginBottom: '0.6rem',
          color: '#ffffff'
        }}>RESERVA TU MESA</h1>
        <p style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#bbbbbb'
        }}>Completa tus datos para reservar en Órbita</p>

        <form onSubmit={guardarReserva}>
          
            <div className="fila-doble">
            <div className="grupo-campo">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>Nombre completo *</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2c2c2c',
                  color: '#ffffff'
                }}
              />
            </div>
            <div className="grupo-campo">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>Teléfono *</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2c2c2c',
                  color: '#ffffff'
                }}
              />
            </div>
          </div>
        

          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>Correo electrónico *</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '6px',
                border: 'none',
                background: '#2c2c2c',
                color: '#ffffff'
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.4rem',
            marginBottom: '1.4rem'
          }}>
            <div className="fila-doble">
            <div className="grupo-campo">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>📅 Fecha de reserva *</label>
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => {
                  const valor = e.target.value
                  if (fechasOcupadas.includes(valor)) {
                    alert('❌ Esta fecha ya está reservada, elegí otra')
                  } else {
                    setFechaSeleccionada(valor)
                  }
                }}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2c2c2c',
                  color: '#ffffff'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>⏰ Horario aproximado *</label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2c2c2c',
                  color: '#ffffff'
                }}
              >
                <option value="">Seleccioná un horario</option>
                <option value="12:00 - 14:00">12:00 – 14:00</option>
                <option value="14:00 - 16:00">14:00 – 16:00</option>
                <option value="19:00 - 21:00">19:00 – 21:00</option>
                <option value="21:00 - 23:00">21:00 – 23:00</option>
              </select>
            </div>
          </div>
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>Cantidad de personas *</label>
            <input
              type="number"
              min="1"
              max="20"
              value={personas}
              onChange={(e) => setPersonas(Number(e.target.value))}
              required
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '6px',
                border: 'none',
                background: '#2c2c2c',
                color: '#ffffff'
              }}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#dddddd' }}>Comentarios o peticiones especiales</label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '6px',
                border: 'none',
                background: '#2c2c2c',
                color: '#ffffff'
              }}
            />
          </div>

          <button type="submit" style={{
            display: 'block',
            margin: '0 auto',
            padding: '1.1rem 2.5rem',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: '600',
            background: '#d49838',
            color: '#111111',
            cursor: 'pointer'
          }}>
            CONFIRMAR RESERVA
          </button>
        </form>
      </div>
    </div>
  )
}