import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena
    })

    if (error) return alert('❌ ' + error.message)
    
    alert('✅ ¡Bienvenido de nuevo a ÓRBITA!')
    navigate('/mi-portafolio')
  }

  return (
    <div className="tarjeta" style={{maxWidth: '450px', margin: '3rem auto'}}>
      <h2 style={{textAlign: 'center', color: 'var(--color-dorado)'}}>Iniciar Sesión</h2>
      <p style={{textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '2rem'}}>Bienvenido de vuelta</p>
      
      <form onSubmit={handleLogin}>
        <div className="grupo-campo">
          <label>Correo Electrónico</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div className="grupo-campo">
          <label>Contraseña</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </div>
        <button type="submit" className="button-dorado" style={{width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem'}}>
          Iniciar Sesión
        </button>
      </form>
      
      <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--texto-secundario)'}}>
        ¿No tienes cuenta? <a href="/registro" style={{color: 'var(--color-dorado)'}}>Crear cuenta</a>
      </p>
    </div>
  )
}