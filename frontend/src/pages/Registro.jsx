import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Registro() {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [biografia, setBiografia] = useState('')
  const navigate = useNavigate()

  async function handleRegistro(e) {
    e.preventDefault()
    
    // 1. Crear usuario en autenticación
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correo,
      password: contrasena
    })

    if (authError) return alert(authError.message)

    // 2. Guardar datos adicionales en la tabla
    const { error: dbError } = await supabase.from('usuarios').insert([
      {
        id: authData.user.id,
        nombre_usuario: nombreUsuario,
        correo: correo,
        contrasena: contrasena,
        biografia: biografia
      }
    ])

    if (dbError) return alert(dbError.message)
    
    alert('✅ ¡Cuenta creada con éxito!')
    navigate('/mi-portafolio')
  }

  return (
    <div className="tarjeta" style={{maxWidth: '450px', margin: '3rem auto'}}>
      <h2 style={{textAlign: 'center', color: 'var(--color-dorado)'}}>Crear tu cuenta en ÓRBITA</h2>
      <p style={{textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '2rem'}}>Regístrate para crear tu portafolio</p>
      
      <form onSubmit={handleRegistro}>
        <div className="grupo-campo">
          <label>Nombre de Usuario</label>
          <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
        </div>
        <div className="grupo-campo">
          <label>Correo Electrónico</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div className="grupo-campo">
          <label>Contraseña</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </div>
        <div className="grupo-campo">
          <label>Biografía (opcional)</label>
          <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} rows="3" />
        </div>
        <button type="submit" className="button-dorado" style={{width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem'}}>
          Crear mi Cuenta
        </button>
      </form>
      
      <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--texto-secundario)'}}>
        ¿Ya tienes cuenta? <a href="/login" style={{color: 'var(--color-dorado)'}}>Iniciar sesión</a>
      </p>
    </div>
  )
}