import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function VotacionFlotante() {
  const [abierto, setAbierto] = useState(false)
  const [temas, setTemas] = useState([])
  const [votoRealizado, setVotoRealizado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // Obtener IP del usuario
  const obtenerIP = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      return data.ip || 'desconocido'
    } catch {
      return 'desconocido'
    }
  }

  // Cargar temas al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: temasData } = await supabase
        .from('temas_semanales')
        .select('*')
        .order('votos', { ascending: false })
      
      if (temasData) setTemas(temasData)

      // Verificar si ya votó hoy
      const ip = await obtenerIP()
      const hoy = new Date().toISOString().split('T')[0]
      
      const { data: votoData } = await supabase
        .from('votos_usuarios')
        .select('*')
        .or(`ip_usuario.eq.${ip}`)
        .eq('fecha_voto', hoy)
        .maybeSingle()
      
      if (votoData) setVotoRealizado(true)
    }
    cargarDatos()
  }, [])

  // Función para votar
  const handleVotar = async (temaId) => {
    if (votoRealizado) {
      setMensaje('✅ Ya votaste hoy. ¡Vuelve mañana!')
      return
    }

    setCargando(true)
    setMensaje('')

    const ip = await obtenerIP()
    const hoy = new Date().toISOString().split('T')[0]
    
    const { data: { user } } = await supabase.auth.getUser()
    const usuarioId = user?.id || null

    // Registrar voto
    const { error: errorVoto } = await supabase
      .from('votos_usuarios')
      .insert([{
        usuario_id: usuarioId,
        ip_usuario: ip,
        tema_id: temaId
      }])

    if (errorVoto) {
      if (errorVoto.code === '23505') {
        setMensaje('✅ Ya votaste hoy. ¡Gracias por participar!')
      } else {
        setMensaje('❌ Error al votar. Intenta de nuevo.')
      }
      setCargando(false)
      return
    }

    // Incrementar contador
    await supabase.rpc('incrementar_voto', { fila_id: temaId })

    setVotoRealizado(true)
    setMensaje('🎉 ¡Gracias por votar! Tu voto cuenta.')
    
    // Recargar temas actualizados
    const { data: nuevosTemas } = await supabase
      .from('temas_semanales')
      .select('*')
      .order('votos', { ascending: false })
    
    if (nuevosTemas) setTemas(nuevosTemas)
    setCargando(false)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-dorado), #b8860b)',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(212, 152, 56, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        🗳️
      </button>

      {/* Panel desplegable */}
      {abierto && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          left: '2rem',
          zIndex: 998,
          width: '320px',
          maxWidth: 'calc(100vw - 4rem)',
          background: 'rgba(26, 26, 46, 0.95)',
          border: '1px solid rgba(212, 152, 56, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            color: 'var(--color-dorado)',
            marginBottom: '0.25rem',
            fontSize: '1.1rem'
          }}>🗳️ Elige el tema de la semana</h3>
          <p style={{
            color: 'var(--texto-secundario)',
            fontSize: '0.85rem',
            marginBottom: '1rem'
          }}>Vota una vez por día. ¡Tu voz cuenta!</p>

          {mensaje && (
            <p style={{
              fontSize: '0.85rem',
              padding: '0.5rem',
              borderRadius: '6px',
              background: mensaje.includes('✅') || mensaje.includes('🎉') 
                ? 'rgba(34, 197, 94, 0.15)' 
                : 'rgba(239, 68, 68, 0.15)',
              color: mensaje.includes('❌') ? '#fca5a5' : '#86efac',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>{mensaje}</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {temas.map(tema => (
              <button
                key={tema.id}
                onClick={() => handleVotar(tema.id)}
                disabled={cargando || votoRealizado}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(44, 44, 62, 0.5)',
                  border: '1px solid rgba(212, 152, 56, 0.15)',
                  color: 'var(--texto-principal)',
                  cursor: cargando || votoRealizado ? 'default' : 'pointer',
                  opacity: cargando || votoRealizado ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!cargando && !votoRealizado) {
                    e.target.style.background = 'rgba(212, 152, 56, 0.15)'
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(44, 44, 62, 0.5)'
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{tema.nombre}</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-dorado)',
                  fontWeight: 600,
                  background: 'rgba(212, 152, 56, 0.15)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px'
                }}>{tema.votos} votos</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}