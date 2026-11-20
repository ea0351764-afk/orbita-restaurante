import { Link } from 'react-router-dom'
import { useTema } from '../context/TemaContexto'

export default function PiePagina() {
  const { tema } = useTema()
  return (
    <footer style={{
      marginTop: '4rem',
      padding: '2rem 1rem',
      textAlign: 'center',
      color: tema === 'oscuro' ? '#e7aaaa' : '#557799'
    }}>
      <p style={{marginBottom: '1.5rem', fontSize: '1.1rem'}}>
        ©2026 ÓRBITA - Todos los derechos reservados
      </p>
      <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
        <Link to="/acerca" style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', textDecoration: 'none', fontSize: '1.1rem'}}>Acerca</Link>
        <Link to="/servicios" style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', textDecoration: 'none', fontSize: '1.1rem'}}>Servicios</Link>
        <Link to="/contacto" style={{color: tema === 'oscuro' ? '#ffb3b3' : '#2266bb', textDecoration: 'none', fontSize: '1.1rem'}}>Contacto</Link>
      </div>
    </footer>
  )
}