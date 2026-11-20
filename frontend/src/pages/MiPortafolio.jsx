import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePantalla } from '../hooks/usePantalla'
import { useTema } from '../context/TemaContexto'

const guardarProyecto = () => {
  const proyectoConVotos = {
    ...nuevoProyecto,
    estrellas: 0,
    votos: []
  }
  const listaActualizada = [...proyectos, proyectoConVotos]
  setProyectos(listaActualizada)
  localStorage.setItem('proyectosUsuario', JSON.stringify(listaActualizada))
  setAbrirFormularioProyecto(false)
  setNuevoProyecto({titulo: '', descripcion: '', imagen: '', publico: true, id: Date.now()})
}

export default function MiPortafolio() {
  const esMovil = usePantalla()
  const { tema, setTema } = useTema()
  const [usuario, setUsuario] = useState(null)
  const [abrirModalEditar, setAbrirModalEditar] = useState(false)
  const [formEdicion, setFormEdicion] = useState({
    nombreUsuario: '',
    biografia: '',
    fotoPerfil: ''
  })

  const [proyectos, setProyectos] = useState(JSON.parse(localStorage.getItem('proyectosUsuario')) || [])
  const [abrirFormularioProyecto, setAbrirFormularioProyecto] = useState(false)
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    publico: true,
    estrellas: 0,
    id: Date.now()
  })

  const actualizarCampoEdicion = (e) => {
    const { name, value } = e.target
    setFormEdicion((prev) => ({ ...prev, [name]: value }))
  }

  const actualizarProyectoForm = (e) => {
    const { name, value, type, checked } = e.target
    setNuevoProyecto((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const guardarProyecto = () => {
    if (!nuevoProyecto.titulo.trim()) return

    const proyectoAguardar = {
      ...nuevoProyecto,
      titulo: nuevoProyecto.titulo.trim(),
      descripcion: nuevoProyecto.descripcion.trim(),
      id: Date.now()
    }

    const listaActualizada = [...proyectos, proyectoAguardar]
    setProyectos(listaActualizada)
    localStorage.setItem('proyectosUsuario', JSON.stringify(listaActualizada))
    setAbrirFormularioProyecto(false)
    setNuevoProyecto({ titulo: '', descripcion: '', imagen: '', publico: true, estrellas: 0, id: Date.now() })
  }

  const eliminarProyecto = (idProyecto) => {
    const listaFiltrada = proyectos.filter((proyecto) => proyecto.id !== idProyecto)
    setProyectos(listaFiltrada)
    localStorage.setItem('proyectosUsuario', JSON.stringify(listaFiltrada))
  }

  const manejarImagenProyecto = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = (eLectura) => setNuevoProyecto((prev) => ({ ...prev, imagen: eLectura.target.result }))
    lector.readAsDataURL(archivo)
  }

  const manejarSeleccionImagen = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = (eventoLectura) => {
      setFormEdicion((prev) => ({ ...prev, fotoPerfil: eventoLectura.target.result }))
    }
    lector.readAsDataURL(archivo)
  }

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem('usuarioOrbita'))
    if (datosUsuario) {
      setUsuario(datosUsuario)
      setFormEdicion({
        nombreUsuario: datosUsuario.nombreUsuario,
        biografia: datosUsuario.biografia,
        fotoPerfil: datosUsuario.fotoPerfil || ''
      })
    }
  }, [])

  const guardarCambiosPerfil = () => {
    const usuarioActualizado = {
      ...usuario,
      nombreUsuario: formEdicion.nombreUsuario,
      biografia: formEdicion.biografia,
      fotoPerfil: formEdicion.fotoPerfil
    }
    setUsuario(usuarioActualizado)
    localStorage.setItem('usuarioOrbita', JSON.stringify(usuarioActualizado))
    setAbrirModalEditar(false)
  }

  if (!usuario) {
    return (
      <div style={{
        padding: esMovil ? '3rem 1.2rem' : '4rem 2rem',
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb',
          marginBottom: '1.2rem',
          lineHeight: '1.3',
          wordWrap: 'break-word'
        }}>

            {abrirFormularioProyecto && (
  <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'grid', placeItems:'center', padding:'1rem', zIndex:12}}>
    <div style={{width:'100%', maxWidth:'520px', background: tema === 'oscuro' ? '#3a1919' : '#fff', padding:'2rem', borderRadius:'16px'}}>
      <h2 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', marginBottom:'1.5rem'}}>Nuevo proyecto</h2>
      <div style={{display:'grid', gap:'1.2rem'}}>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Título</label>
          <input type="text" value={nuevoProyecto.titulo} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, titulo:e.target.value})} style={{width:'100%', padding:'0.75rem'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Descripción</label>
          <textarea value={nuevoProyecto.descripcion} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, descripcion:e.target.value})} style={{width:'100%', padding:'0.75rem'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Imagen del proyecto</label>
          <input type="file" accept="image/*" onChange={manejarImagenProyecto} style={{width:'100%'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Visibilidad</label>
          <select value={nuevoProyecto.publico} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, publico:e.target.value === 'true'})} style={{width:'100%', padding:'0.75rem'}}>
            <option value="true">Público (aparece en portafolios públicos)</option>
            <option value="false">Privado (solo tú lo ves)</option>
          </select>
        </div>
      </div>
      <div style={{display:'flex', gap:'1rem', justifyContent:'end', marginTop:'2rem'}}>
        <button onClick={()=>setAbrirFormularioProyecto(false)}>Cancelar</button>
        <button onClick={guardarProyecto} style={{background: tema === 'oscuro' ? '#992c2c' : '#2266bb', color:'white', padding:'0.7rem 1.2rem', border:'none', borderRadius:'8px'}}>Publicar proyecto</button>
      </div>
    </div>
  </div>
)}
        
        
  Aún no tienes tu perfil de ÓRBITA
        </h1>
        <p style={{
          color: tema === 'oscuro' ? '#e7aaaa' : '#557799',
          marginBottom: '2rem',
          fontSize: '1.05rem',
          lineHeight: '1.5'
        }}>


  Crea tu cuenta para armar tu portafolio personal y compartir tus proyectos artísticos.
        </p>
        <Link to="/registro">
          <button style={{
            padding: '0.9rem 1.8rem',
            background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Crear perfil
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{padding: esMovil ? '2rem 1rem' : '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <div style={{
        display: esMovil ? 'block' : 'flex',
        gap: '2rem',
        alignItems: 'center',
        background: tema === 'oscuro' ? '#401c1c' : '#f0f7fc',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '3rem',
        boxShadow: tema === 'oscuro' ? '0 4px 18px #100707' : 'none'
      }}>
        <div style={{
          width: esMovil ? '120px' : '160px',
          height: esMovil ? '120px' : '160px',
          borderRadius: '50%',
          background: formEdicion.fotoPerfil ? `url(${formEdicion.fotoPerfil}) center / cover` : '#2266bb',
          margin: esMovil ? '0 auto 1.5rem auto' : '0'
        }}></div>
        <div style={{textAlign: esMovil ? 'center' : 'left'}}>
          <h1 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', margin: '0 0 0.8rem 0'}}>{usuario.nombreUsuario}</h1>
          <p style={{color: tema === 'oscuro' ? '#e7aaaa' : '#557799', marginBottom: '1rem'}}>Artista creativo | Uruguay</p>
          <p style={{color: tema === 'oscuro' ? '#e7aaaa' : '#557799', maxWidth: '600px'}}>
            {usuario.biografia || 'Biografía personal, aquí puedes describir tu trabajo, tus técnicas y los proyectos que realizas en Órbita.'}
          </p>
          <button
            onClick={() => setAbrirModalEditar(true)}
            style={{
              marginTop: '1.2rem',
              padding: '0.7rem 1.4rem',
              background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Editar perfil
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
       
       <button
  onClick={() => setAbrirFormularioProyecto(true)}
  style={{
    marginBottom: '2rem',
    padding: '0.8rem 1.5rem',
    background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }}
>
  Crear nuevo proyecto
</button>

        <h2 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', margin: 0}}>Mis proyectos</h2>
        <button
          onClick={() => setAbrirFormularioProyecto(true)}
          style={{
            padding: '0.75rem 1.2rem',
            background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >


 + Añadir proyecto
        </button>
      </div>

      {proyectos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          borderRadius: '16px',
          background: tema === 'oscuro' ? '#401c1c' : '#f0f7fc',
          color: tema === 'oscuro' ? '#e7aaaa' : '#557799'
        }}>


 Aún no agregaste proyectos. Publica tu primera obra para comenzar tu portafolio.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} style={{
              boxShadow: tema === 'oscuro' ? '0 3px 12px #180a0a' : '0 3px 10px #00000022',
              borderRadius: '12px',
              overflow: 'hidden',
              background: tema === 'oscuro' ? '#401c1c' : '#ffffff',
              border: tema === 'oscuro' ? '1px solid #6b2e2e' : '1px solid #ebf3fb'
            }}>
              <div style={{
                height: '180px',
                background: proyecto.imagen ? `url(${proyecto.imagen}) center / cover` : (tema === 'oscuro' ? '#6b2e2e' : '#b4d0e8')
              }} />
              <div style={{padding: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem'}}>
                  <h3 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', margin: '0 0 0.6rem 0'}}>{proyecto.titulo}</h3>
                  <button
                    onClick={() => eliminarProyecto(proyecto.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >



Eliminar
                  </button>
                </div>
                <p style={{color: tema === 'oscuro' ? '#e7aaaa' : '#557799', margin: '0 0 0.8rem 0', lineHeight: 1.5}}>
                  {proyecto.descripcion || 'Sin descripción aún.'}
                </p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb', fontSize: '0.85rem'}}>
                    {proyecto.publico ? 'Público' : 'Privado'}
                  </span>
                  <span style={{color: '#f4b942'}} aria-label={`Calificación ${proyecto.estrellas} de 5`}>
                    {'★'.repeat(proyecto.estrellas)}{'☆'.repeat(5 - proyecto.estrellas)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {abrirFormularioProyecto && (
  <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'grid', placeItems:'center', padding:'1rem', zIndex:12}}>
    <div style={{width:'100%', maxWidth:'520px', background: tema === 'oscuro' ? '#3a1919' : '#fff', padding:'2rem', borderRadius:'16px'}}>
      <h2 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', marginBottom:'1.5rem'}}>Nuevo proyecto</h2>
      <div style={{display:'grid', gap:'1.2rem'}}>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Título</label>
          <input type="text" value={nuevoProyecto.titulo} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, titulo:e.target.value})} style={{width:'100%', padding:'0.75rem'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Descripción</label>
          <textarea value={nuevoProyecto.descripcion} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, descripcion:e.target.value})} style={{width:'100%', padding:'0.75rem'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Imagen del proyecto</label>
          <input type="file" accept="image/*" onChange={manejarImagenProyecto} style={{width:'100%'}}/>
        </div>
        <div>
          <label style={{display:'block', marginBottom:'0.4rem'}}>Visibilidad</label>
          <select value={nuevoProyecto.publico} onChange={(e)=>setNuevoProyecto({...nuevoProyecto, publico:e.target.value === 'true'})} style={{width:'100%', padding:'0.75rem'}}>
            <option value="true">Público (aparece en portafolios públicos)</option>
            <option value="false">Privado (solo tú lo ves)</option>
          </select>
        </div>
      </div>
      <div style={{display:'flex', gap:'1rem', justifyContent:'end', marginTop:'2rem'}}>
        <button onClick={()=>setAbrirFormularioProyecto(false)}>Cancelar</button>
        <button onClick={guardarProyecto} style={{background: tema === 'oscuro' ? '#992c2c' : '#2266bb', color:'white', padding:'0.7rem 1.2rem', border:'none', borderRadius:'8px'}}>Publicar proyecto</button>
      </div>
    </div>
  </div>
)}

      {abrirFormularioProyecto && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'grid',
          placeItems: 'center',
          padding: '1rem',
          zIndex: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: tema === 'oscuro' ? '#3a1919' : '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 5px 20px #00000044'
          }}>
            <h2 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', marginBottom: '1.5rem'}}>Nuevo proyecto</h2>
            <div style={{display: 'grid', gap: '1.2rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={nuevoProyecto.titulo}
                  onChange={actualizarProyectoForm}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Descripción</label>
                <textarea
                  name="descripcion"
                  value={nuevoProyecto.descripcion}
                  onChange={actualizarProyectoForm}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Imagen del proyecto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarImagenProyecto}
                  style={{width: '100%', padding: '0.75rem'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Enlace de imagen</label>
                <input
                  type="text"
                  name="imagen"
                  value={nuevoProyecto.imagen}
                  onChange={actualizarProyectoForm}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <label style={{color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Público</label>
                <input
                  type="checkbox"
                  name="publico"
                  checked={nuevoProyecto.publico}
                  onChange={actualizarProyectoForm}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Estrellas</label>
                <div style={{display: 'flex', gap: '0.5rem', fontSize: '1.4rem', color: '#f4b942'}}>
                  {[1,2,3,4,5].map((estrella) => (
                    <button
                      key={estrella}
                      type="button"
                      onClick={() => setNuevoProyecto((prev) => ({ ...prev, estrellas: estrella }))}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: estrella <= nuevoProyecto.estrellas ? '#f4b942' : '#c8d5e0'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'end', marginTop: '2rem'}}>
              <button
                onClick={() => setAbrirFormularioProyecto(false)}
                style={{padding: '0.7rem 1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
              >



Cancelar
              </button>
              <button
                onClick={guardarProyecto}
                style={{
                  padding: '0.7rem 1.2rem',
                  background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >



Guardar proyecto
              </button>
            </div>
          </div>
        </div>
      )}

      {abrirModalEditar && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'grid',
          placeItems: 'center',
          padding: '1rem',
          zIndex: 10
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: tema === 'oscuro' ? '#3a1919' : '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 5px 20px #00000044'
          }}>
            
            <h2 style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', marginBottom: '1.5rem'}}>Ajustes del perfil</h2>
            <div style={{display: 'grid', gap: '1.2rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Nombre de usuario</label>
                <input
                  type="text"
                  name="nombreUsuario"
                  value={formEdicion.nombreUsuario}
                  onChange={actualizarCampoEdicion}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Imagen de perfil (selecciona archivo local)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarSeleccionImagen}
                  style={{width: '100%', padding: '0.75rem'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Biografía</label>
                <textarea
                  name="biografia"
                  value={formEdicion.biografia}
                  onChange={actualizarCampoEdicion}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Enlace de imagen de perfil</label>
                <input
                  type="text"
                  name="fotoPerfil"
                  value={formEdicion.fotoPerfil}
                  onChange={actualizarCampoEdicion}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', color: tema === 'oscuro' ? '#ffd0d0' : '#2266bb'}}>Tema de la página</label>
                <select
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  style={{width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #b4d0e8'}}
                >
                  <option value="claro">Tema Claro (original Órbita)</option>
                  <option value="oscuro">Tema Oscuro rojizo</option>
                </select>
              </div>
            </div>

            
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'end', marginTop: '2rem'}}>
              <button
                onClick={() => setAbrirModalEditar(false)}
                style={{padding: '0.7rem 1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
              >



Cancelar
              </button>
              <button
                onClick={guardarCambiosPerfil}
                style={{
                  padding: '0.7rem 1.2rem',
                  background: tema === 'oscuro' ? '#992c2c' : '#2266bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >


Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}