import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function PortafoliosPublicos() {
  const [portafolios, setPortafolios] = useState([])

  useEffect(() => {
    const cargarPublicos = async () => {
      console.log('🔄 Cargando portafolios públicos...')
      
      // Primero probamos SIN la relación de usuarios para ver si trae los datos
      const { data, error } = await supabase
        .from('portafolios')
        .select('*')
        .eq('es_publico', true)
        .order('creado_en', { ascending: false })

      console.log('📋 Datos recibidos:', data)
      console.log('❌ Error:', error)

      if (error) {
        console.error('Error al cargar:', error)
        return
      }

      if (data) setPortafolios(data)
    }

    cargarPublicos()
  }, [])

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--color-dorado)', marginBottom: '2rem', fontSize: '2rem' }}>
        Portafolios Públicos
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '3rem' }}>
        Descubre el arte de nuestra comunidad
      </p>

      {portafolios.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--texto-secundario)', fontSize: '1.125rem' }}>
          Todavía no hay portafolios públicos. ¡Sé el primero en compartir tu obra! 🎨
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {portafolios.map((p, i) => (
            <div key={i} style={{ 
              background: 'var(--bg-tarjeta)', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              border: '1px solid rgba(212, 152, 56, 0.2)' 
            }}>
              <h3 style={{ color: 'var(--color-dorado)', marginBottom: '0.5rem' }}>
                {p.titulo || 'Sin título'}
              </h3>
              <p style={{ color: 'var(--texto-principal)', marginBottom: '0.5rem' }}>
                {p.descripcion || ''}
              </p>
              {p.imagen_url && (
                <img 
                  src={p.imagen_url} 
                  alt={p.titulo} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    marginTop: '0.5rem'
                  }} 
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
