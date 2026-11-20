export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'rgba(26, 26, 46, 0.85)',
      borderTop: '1px solid rgba(212, 152, 56, 0.3)',
      padding: '2rem 1rem',
      marginTop: '3rem',
      textAlign: 'center',
      color: '#cccccc'
    }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#d49838', marginBottom: '0.5rem' }}>ÓRBITA — Restaurante Cultural</p>
      <p style={{ fontSize: '0.9rem' }}>© 2026 ÓRBITA · Todos los derechos reservados</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Montevideo, Uruguay</p>
    </footer>
  )
}