import { usePantalla } from '../hooks/usePantalla'

export default function Servicios() {
  const esMovil = usePantalla()

  return (
       <section style={{padding: esMovil ? '2rem 1rem' : '3rem 2rem', maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center', color: '#2266bb', marginBottom: '2rem'}}>SERVICIOS DE ÓRBITA</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🎤Show de artistas aficionados</h3>
              <p>El servicio principal: un escenario abierto para músicos, poetas, actores, comediantes y todo artista no reconocido que quiera mostrar su trabajo ante el publico del restaurante.</p>
            </div>
          </div>

          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🎨Exposiciones temporales de arte</h3>
              <p>Cada semana, con la tematica del dia, montar exposiciones de pintura, dibujo, fotografía, ilustración, escultura, hechas por artistas amateurs.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🥂Cenas temáticas</h3>
              <p>Cenas con menú especial adaptado a la temática del día: ficción, fechas patrias uruguayas, culturas de otros paíces, literatura, cine, etc.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🎂Reserva de espacios para eventos privados</h3>
              <p>Alquilar el local para cumpleaños, aniversarios, reuniones, presentaciones, donde los propios invitados pueden hacer su propio show.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>📖Talleres creativos</h3>
              <p>Talleres de escritura, dibujo, música, cocina, poesía, actuaccion, que se dicten en Órbita.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🎬Noches de cine y cortometrajes</h3>
              <p>Proyección de cortos hechos por creadores independientes, con debate posterior.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🤝Veladas de networking artistico</h3>
              <p>Espacios para que artistas se conozcan, intercambien ideas y hagan contactos.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🍽️Degustaciones especiales</h3>
              <p>Degustaciones de platos de distintas regiones del Uruguay y del mundo, acompañadas de la presentacion de artistas locales.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>✍️Recitales de poesía y spoken word</h3>
              <p>Un espacio dedicado a la palabra, para que la gente lea sus propios textos o escuche los de otros.</p>
            </div>
          </div>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{padding: '1rem'}}>
              <h3>🎵Sesiones de jam musical</h3>
              <p>Jams abiertas, donde cualquier musico  puede subir a tocar.</p>
            </div>
          </div>
        </div>
    </section>  
  )
}