import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function PortafoliosPublicos() {
  const [portafolios, setPortafolios] = useState([])

  useEffect(() => {
    const cargarPublicos = async () => {
      const { data } = await supabase
        .from('portafolios')
        .select(`*, usuarios:usuario_id (nombre_usuario)`)
        .eq('es_publico', true)
        .order('creado_en', { ascending: false })
      
        if (error) {
          console.error('Error:', error)
          return
        }

      if (data) setPortafolios(data)
    }
    cargarPublicos()
  }, [])

  return (
    <div style={{
      padding: '2rem 1rem',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: 'var(--color-dorado)',
        marginBottom: '2rem',
        fontSize: '2rem'
      }}>🌌 Portafolios Públicos</h2>
      <p style={{textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '3rem'}}>
        Descubre el arte de nuestra comunidad
      </p>

      {portafolios.length === 0 ? (
        <div style={{textAlign: 'center', padding: '4rem 2rem'}}>
          <p style={{fontSize: '3rem', marginBottom: '1rem'}}>🎨</p>
          <p style={{color: 'var(--texto-secundario)'}}>Todavía no hay portafolios públicos. ¡Sé el primero en compartir tu obra!</p>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'}}>
          {portafolios.map(p => (
            <div key={p.id} className="tarjeta" style={{overflow: 'hidden', padding: 0}}>
              {p.imagen_url ? (
                <img 
                  src={p.imagen_url} 
                  alt={p.titulo}
                  style={{width: '100%', height: '200px', objectFit: 'cover'}}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'var(--bg-tarjeta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>🎨</div>
              )}
              <div style={{padding: '1.5rem'}}>
                <h3 style={{marginBottom: '0.5rem'}}>{p.titulo}</h3>
                <p style={{color: 'var(--texto-secundario)', fontSize: '0.9rem', marginBottom: '1rem'}}>
                  por {p.usuarios?.nombre_usuario || 'Artista Órbita'}
                </p>
                <p style={{fontSize: '0.95rem', lineHeight: '1.6'}}>{p.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}