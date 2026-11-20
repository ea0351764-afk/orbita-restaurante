import { Link } from 'react-router-dom'
import { usePantalla } from '../hooks/usePantalla'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Navbar() {
  const esMovil = usePantalla()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [usuario, setUsuario] = useState(null)

  // Verificar estado de sesión
  useEffect(() => {
    const verificarUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUsuario(user)
    }
    verificarUsuario()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUsuario(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Cerrar sesión
  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // Todos los enlaces
  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Acerca de', ruta: '/acerca' },
    { nombre: 'Servicios', ruta: '/Servicios' },
    { nombre: 'Portafolios Públicos', ruta: '/PortafoliosPublicos' },
    { nombre: 'Reservar Mesa', ruta: '/ReservaMesas' },
    // Solo visibles cuando NO hay sesión
    { nombre: 'Iniciar Sesión', ruta: '/Login', soloSiNoLogueado: true },
    { nombre: 'Crear Perfil', ruta: '/Registro', soloSiNoLogueado: true },
    // Solo visibles cuando SÍ hay sesión
    { nombre: 'Mi Perfil', ruta: '/MiPerfil', soloSiLogueado: true },
    { nombre: 'Cerrar Sesión', accion: 'cerrar', soloSiLogueado: true }
  ]

  // Filtrar enlaces según sesión
  const enlacesVisibles = enlaces.filter(enlace => {
    if (enlace.soloSiLogueado && !usuario) return false
    if (enlace.soloSiNoLogueado && usuario) return false
    return true
  })

  if (esMovil) {
    return (
      <nav style={{ background: 'var(--bg-tarjeta)', padding: '1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dorado)', textDecoration: 'none' }}>ÓRBITA</Link>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--texto-principal)' }}
            >
              {menuAbierto ? '✕' : '☰'}
            </button>
          </div>

          {menuAbierto && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {enlacesVisibles.map((enlace, index) => (
                enlace.accion === 'cerrar' ? (
                  <button
                    key={index}
                    onClick={cerrarSesion}
                    style={{
                      textAlign: 'left',
                      padding: '0.5rem 0',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    🚪 {enlace.nombre}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={enlace.ruta}
                    onClick={() => setMenuAbierto(false)}
                    style={{
                      padding: '0.5rem 0',
                      color: 'var(--texto-principal)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {enlace.nombre}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </nav>
    )
  }

  return (
    <nav style={{ background: 'var(--bg-tarjeta)', padding: '1rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-dorado)', textDecoration: 'none' }}>ÓRBITA</Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {enlacesVisibles.map((enlace, index) => (
            enlace.accion === 'cerrar' ? (
              <button
                key={index}
                onClick={cerrarSesion}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                🚪 {enlace.nombre}
              </button>
            ) : (
              <Link
                key={index}
                to={enlace.ruta}
                style={{
                  color: 'var(--texto-principal)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--color-dorado)'}
                onMouseOut={(e) => e.target.style.color = 'var(--texto-principal)'}
              >
                {enlace.nombre}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  )
}