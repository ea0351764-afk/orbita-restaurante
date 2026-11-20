import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function MiPerfil() {
  const [archivoSubido, setArchivoSubido] = useState(null)
  const [urlArchivo, setUrlArchivo] = useState('')
  const [tipoArchivo, setTipoArchivo] = useState('imagen')
  const [usuario, setUsuario] = useState(null)
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [biografia, setBiografia] = useState('')
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState(null)
  const [portafolios, setPortafolios] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  const [esPublico, setEsPublico] = useState(false)
  const navigate = useNavigate()

  const subirArchivo = async (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    setArchivoSubido(archivo)

    // Detectar si es imagen o video
    if (archivo.type.startsWith('image/')) {
      setTipoArchivo('imagen')
    } else if (archivo.type.startsWith('video/')) {
      setTipoArchivo('video')
    }

    // Nombre único para el archivo
    const nombreUnico = `${Date.now()}-${archivo.name}`

    // Subir a Supabase
    const { error } = await supabase
      .storage
      .from('archivos')
      .upload(`public/${nombreUnico}`, archivo, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error al subir:', error)
      alert('No se pudo subir el archivo')
      return
    }

    // Obtener la URL pública
    const { data: { publicUrl } } = supabase
      .storage
      .from('archivos')
      .getPublicUrl(`public/${nombreUnico}`)

    setUrlArchivo(publicUrl)
    console.log('✅ Archivo subido:', publicUrl)
  }
  
  // Cargar datos del usuario
  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      setUsuario(user)
      
      // Cargar datos adicionales
      const { data } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (data) {
        setNombreUsuario(data.nombre_usuario || '')
        setBiografia(data.biografia || '')
      }
      
      cargarPortafolios()
    }
    obtenerUsuario()
  }, [navigate])

  // Cargar portafolios del usuario
  const cargarPortafolios = async () => {
    const { data } = await supabase
      .from('portafolios')
      .select('*')
      .order('creado_en', { ascending: false })
    
    if (data) setPortafolios(data)
  }

  // Subir imagen de perfil
  const handleImagenPerfil = (e) => {
    const archivo = e.target.files[0]
    if (archivo) {
      setImagenPerfil(archivo)
      setVistaPrevia(URL.createObjectURL(archivo))
    }
  }

  // Crear nuevo portafolio
  const handleCrearPortafolio = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from('portafolios').insert([{
      usuario_id: usuario.id,
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion,
      imagen_url: urlArchivo,
      tipo_archivo: tipoArchivo,
      es_publico: esPublico
    }])

    if (error) return alert('❌ ' + error.message)
    
    alert('✅ ¡Portafolio publicado!')
    setNuevoTitulo('')
    setNuevaDescripcion('')
    setUrlArchivo('')
    setArchivoSubido(null)
    setEsPublico(false)
    setMostrarFormulario(false)
    cargarPortafolios()
  }

  // Eliminar portafolio
  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este portafolio?')) return
    
    const { error } = await supabase.from('portafolios').delete().eq('id', id)
    if (error) return alert('❌ ' + error.message)
    
    alert('✅ Eliminado')
    cargarPortafolios()
  }

  if (!usuario) return <p style={{textAlign: 'center', padding: '3rem'}}>Cargando...</p>

  return (
    <div style={{
      padding: '2rem 1rem',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {/* 📸 SECCIÓN DE PERFIL */}
      <div className="tarjeta" style={{marginBottom: '3rem'}}>
        <h2 style={{color: 'var(--color-dorado)', textAlign: 'center', marginBottom: '2rem'}}>Mi Perfil</h2>
        
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid var(--color-dorado)',
            overflow: 'hidden',
            margin: '0 auto 1rem'
          }}>
            {vistaPrevia ? (
              <img src={vistaPrevia} alt="Perfil" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                background: 'var(--bg-tarjeta)'
              }}>👤</div>
            )}
          </div>
          <label style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'var(--color-dorado)',
            color: '#000',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            📷 Subir foto
            <input type="file" accept="image/*" onChange={handleImagenPerfil} style={{display: 'none'}} />
          </label>
        </div>

        <div className="grupo-campo">
          <label>Nombre de Usuario</label>
          <input 
            type="text" 
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="grupo-campo">
          <label>Biografía</label>
          <textarea 
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            rows="4"
          />
        </div>
        <button className="button-dorado" style={{width: '100%', marginTop: '1rem'}}>
          💾 Guardar Cambios
        </button>
      </div>

      {/* 🎨 MIS PORTAFOLIOS */}
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2 style={{color: 'var(--color-dorado)'}}>Mis Portafolios</h2>
          <button 
            className="button-dorado"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            + Nuevo Portafolio
          </button>
        </div>

        {/* FORMULARIO NUEVO PORTAFOLIO */}
        {mostrarFormulario && (
          <div className="tarjeta" style={{marginBottom: '2rem'}}>
            <h3 style={{marginBottom: '1rem'}}>Crear Nuevo Portafolio</h3>
            <form onSubmit={handleCrearPortafolio}>
              <div className="grupo-campo">
                <label>Título *</label>
                <input 
                  type="text" 
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="grupo-campo">
                <label>Descripción</label>
                <textarea 
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="grupo-campo">
                <label>📁 Imagen o video del trabajo:</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={subirArchivo}
                />
                <p style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.25rem' }}>
                  Formatos: JPG, PNG, MP4
                </p>
              </div>

              {/* Vista previa del archivo */}
              {urlArchivo && (
                <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(212, 152, 56, 0.1)', borderRadius: '8px', border: '1px solid rgba(212, 152, 56, 0.3)' }}>
                  <p style={{ color: '#d49838', marginBottom: '0.5rem', fontWeight: 'bold' }}>✅ Archivo listo:</p>
                  {tipoArchivo === 'imagen' ? (
                    <img src={urlArchivo} alt="Vista previa" style={{ maxWidth: '300px', borderRadius: '4px' }} />
                  ) : (
                    <video src={urlArchivo} controls style={{ maxWidth: '300px', borderRadius: '4px' }}>
                      Tu navegador no soporta videos
                    </video>
                  )}
                </div>
              )}

              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                <input 
                  type="checkbox" 
                  id="publico"
                  checked={esPublico}
                  onChange={(e) => setEsPublico(e.target.checked)}
                />
                <label htmlFor="publico" style={{marginBottom: 0}}>🌐 Público (aparece en Portafolios Públicos)</label>
              </div>
              <button type="submit" className="button-dorado" style={{width: '100%'}}>
                🚀 Publicar Portafolio
              </button>
            </form>
          </div>
        )}

        {/* LISTA DE PORTAFOLIOS */}
        {portafolios.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--texto-secundario)', padding: '2rem'}}>
            Todavía no tienes portafolios. ¡Crea el primero! ✨
          </p>
        ) : (
          <div style={{display: 'grid', gap: '1.5rem'}}>
            {portafolios.map(p => (
              <div key={p.id} className="tarjeta" style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
                {p.imagen_url && p.tipo_archivo === 'video' ? (
                  <video 
                    src={p.imagen_url} 
                    controls
                    style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px'}}
                  >
                    Tu navegador no soporta videos
                  </video>
                ) : p.imagen_url ? (
                  <img 
                    src={p.imagen_url} 
                    alt={p.titulo}
                    style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px'}}
                  />
                ) : (
                  <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '8px',
                    background: 'var(--bg-tarjeta)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>🎨</div>
                )}
                <div style={{flex: 1, minWidth: '250px'}}>
                  <h3 style={{marginBottom: '0.5rem'}}>{p.titulo}</h3>
                  <p style={{color: 'var(--texto-secundario)', marginBottom: '0.75rem'}}>{p.descripcion}</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    background: p.es_publico ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                    color: p.es_publico ? '#22c55e' : '#94a3b8'
                  }}>
                    {p.es_publico ? '🌐 Público' : '🔒 Privado'}
                  </span>
                </div>
                <button 
                  onClick={() => handleEliminar(p.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    alignSelf: 'flex-start'
                  }}
                  title="Eliminar"
                >🗑️</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}}
