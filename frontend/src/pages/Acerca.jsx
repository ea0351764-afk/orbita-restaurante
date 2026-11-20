import { usePantalla } from '../hooks/usePantalla'

export default function Acerca() {
  const esMovil = usePantalla()

  return (
    <div style={{padding: esMovil ? '2rem 1rem' : '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{color: '#2266bb', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.3'}}>Acerca de ÓRBITA</h1>
      <div style={{background: '#f0f7fc', padding: '2rem', borderRadius: '16px'}}>
        <p style={{color: '#557799', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.2rem'}}>
          ÓRBITA nació de la idea de dar visibilidad al arte que día a día vemos en la calle, música, dibujos, obras, teatro, etc. Somos un proyecto con raíces en URUGUAY, un país pequeño en tamaño pero con un sentir enorme y lleno de arte por donde mires.
        </p>
        <p style={{color: '#557799', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.2rem'}}>
          Nuestra misión es ser ese puente que conecta a los artistas con las personas, empresas y organizaciones que desean disfrutar, promover y contactar propuestas artísticas.
        </p>
        <p style={{color: '#557799', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.2rem'}}>
          Buscamos crear una red de oportunidades que permita a los artistas dar a conocer su talento, acceder a nuevas oportunidades laborales y compartir su arte con diferentes públicos. Al mismo tiempo, queremos facilitar a empresas, particulares y organizadores de eventos el acceso a servicios y espectáculos artísticos para todo tipo de celebraciones, fiestas y eventos.
        </p>
        <p style={{color: '#557799', fontSize: '1.05rem', lineHeight: '1.6'}}>
          Creemos que el arte tiene el poder de conectar personas, generar emociones y transformar espacios. Por eso, trabajamos para acercar el talento a quienes desean descubrirlo, disfrutarlo y hacerlo parte de sus proyectos y eventos.
        </p>
      </div>
    </div>
  )
}