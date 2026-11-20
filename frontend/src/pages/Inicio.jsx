import { Link } from 'react-router-dom'
import { usePantalla } from '../hooks/usePantalla'
import { useTema } from '../context/TemaContexto'
import orbitaImagen from '../assets/Orbita_2026.png'
import VotacionFlotante from '../components/VotacionFlotante'
 
export default function Inicio() {
  const { tema } = useTema()
  const esMovil = usePantalla()

  return (
    <div style={{
      padding: '2rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>

      {/* SECCIÓN TEMÁTICA DEL RESTAURANTE */}
      <section style={{
  padding: '2.5rem 1.5rem',
  borderRadius: '16px',
  marginBottom: '3rem',
  background: tema === 'oscuro' ? 'rgba(26, 26, 46, 0.75)' : 'rgba(255, 255, 255, 0.85)',
  boxShadow: '0 4px 16px #00000026',
  textAlign: 'center'
}}>
  

        <h1 style={{
          fontSize: '2.2rem',
          marginBottom: '1rem',
          color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c'
        }}>
          🍽️ Órbita Restaurante Cultural
        </h1>
        <h2 style={{
          fontSize: '1.6rem',
          marginBottom: '1rem',
          color: tema === 'oscuro' ? '#ffd090' : '#c25020'
        }}>
          🎭 Temática de hoy: Jovenes CreaTivos
        </h2>
        <p style={{
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
          color: tema === 'oscuro' ? '#f0d6c2' : '#553322'
        }}>
          Cada semana vivimos una historia distinta: ficción, literatura, fechas patrias uruguayas, celebraciones de todo el mundo.
          Un espacio abierto para artistas amateurs que quieran mostrar su arte.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>

          <Link to="/ReservaMesas" style={{ textDecoration: "none" }}>
       <button style={{
        
  padding: '1rem 1.8rem',
  border: 'none',
  borderRadius: '16px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #2266bb, #3388dd)',
  color: 'white',
  boxShadow: '0 6px 18px #2266bb44'
}}>
  
            Reservar mesa
          </button>
          </Link>

          <Link to="#menu-uruguayo" style={{textDecoration:"none",
      
          }}>
           
            <button onClick={() => {const seccion = document.getElementById('menu-uruguayo'); if (seccion) seccion.scrollIntoView({ behavior: 'smooth', }); }} style={{
              padding: '1rem 1.8rem',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #2266bb, #3388dd)',
              color: 'white',
              boxShadow: '0 6px 18px #2266bb44'
              }}>
          
            Menú de la Casa
            </button>
            </Link>
          
        </div>
      </section>

  <img src={orbitaImagen} alt="Imagen del restaurante" style={{
    margin: 0,
    padding: 0,
    display: 'block'
  }} />

      <div>
      {/* Sección de bienvenida original */}
      <div style={{ textAlign: 'center', padding: esMovil ? '2rem 1rem' : '3rem 2rem' }}>
        <h1 style={{ fontSize: esMovil ? '1.8rem' : '2.5rem', color: '#2266bb' }}>Bienvenidos a ÓRBITA</h1>
        <p style={{ fontSize: esMovil ? '1rem' : '1.2rem', color: '#557799', marginBottom: '2rem' }}>
          Culturas, diseños,arte y artistas. El color y el sabor de URUGUAY y EL MUNDO 💙
        </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
         <Link to="/PortafoliosPublicos" style={{textDecoration:"none"}}>
             <button style={{ padding: '0.8rem 1.6rem', border: '1px solid #2266bb', borderRadius: '8px', background: '#ffffff', color: '#2266bb', fontSize: '1rem' }}>
             Ver Portafolios
             </button>
         </Link>
  <Link to="/login" style={{textDecoration:"none"}}>
    <button style={{ padding: '0.8rem 1.6rem', border: 'none', borderRadius: '8px', background: '#2266bb', color: '#ffffff', fontSize: '1rem' }}>
      Crear mi Portafolio
    </button>
  </Link>
</div>

      <section>
 <h2 style={{ fontSize: esMovil ? '1.5rem' : '2rem', color: '#2266bb', marginBottom: '2rem' }}>¿Qué hacemos?</h2>

        <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <h3 style={{ color: '#3399bb' }}>Innovación</h3>
            <p style={{ color: '#557799' }}>Llevamos tus talentos a donde puedan ser vistos, conectando artistas con audiencias interesadas. Y al mismo tiempo llenamos de sabor tus días</p>
          </div>
          <div>
            <h3 style={{ color: '#3399bb' }}>Compromiso</h3>
            <p style={{ color: '#557799' }}>Trabajamos de cerca con las personas y sus proyectos, dedicando nuestro tiempo y esfuerzo para lograr resultados que superen las expectativas y satisfagan las necesidades de nuestros clientes.</p>
          </div>
          <div>
            <h3 style={{ color: '#3399bb' }}>Crecimiento</h3>
            <p style={{ color: '#557799' }}>Herramientas para impulsar tu imagen y tu arte en el mundo digital y real. Ofresemos un lugar donde tu talento pueda ser reconocido y florecer.</p>
          </div>
        </div>
      </section>

  {/* MENÚ PRINCIPAL DE LA CASA — VERSIÓN FUTURISTA */}
<section id="menu-uruguayo" style={{
  padding: '3rem 1.5rem',
  borderRadius: '24px',
  margin: '4rem 0',
  background: tema === 'oscuro' 
    ? 'linear-gradient(145deg, #3b1f1f, #251414)' 
    : 'linear-gradient(145deg, #fffdf8, #f3ebe0)',
  boxShadow: tema === 'oscuro' 
    ? '0 10px 30px #00000060, inset 0 1px 0 #ffffff20' 
    : '0 10px 30px #00000018, inset 0 1px 0 #ffffff',
  border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008',
  textAlign: 'center'
}}>
  <h2 style={{
    fontSize: '2.4rem',
    marginBottom: '2rem',
    color: tema === 'oscuro' ? '#ffd090' : '#992c2c',
    textShadow: tema === 'oscuro' ? '0 0 12px #ffaa6644' : '0 2px 8px #00000015'
  }}>
     Menú principal de la casa
  </h2>
  <p style={{
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto 2rem',
    color: tema === 'oscuro' ? '#f0d6c2' : '#553322'
  }}>
    Los sabores tradicionales de Uruguay, siempre presentes, sin importar la temática del día.
  </p>

  {/* 🍽️ PLATOS PRINCIPALES */}
  <h3 style={{
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c'
  }}>🍽️ Platos principales</h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto 3rem'
  }}>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🥩 Asado</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>El clásico plato nacional, con todas sus achuras y cortes.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🥟 Empanadas</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>De carne, jamón y queso, y todas las variedades tradicionales.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍲 Locro</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>El plato tradicional para las fechas patrias, siempre disponible.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🥪 Chivito al pan</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>El famoso sándwich uruguayo, con todos sus ingredientes clásicos.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍽️ Chivito al plato</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>La versión en plato, con papas fritas, huevo y ensalada.</p>
    </div>
  </div>

  {/* 🍰 POSTRES */}
  <h3 style={{
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c'
  }}>🍰 Postres</h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto 3rem'
  }}>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍮 Flan con dulce de leche</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>El postre casero más querido de la mesa uruguaya.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🥞 Alfajores de maicena</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>Rellenos de dulce de leche y bañados en coco rallado.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍯 Churros con dulce de leche</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>Crujientes, recién hechos, para cerrar con dulzura.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🎂 Chajá de Paysandú</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>El famoso postre uruguayo, con merengue, crema y durazno.</p>
    </div>
  </div>

  {/* 🥤 BEBIDAS */}
  <h3 style={{
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c'
  }}>🥤 Bebidas</h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto'
  }}>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>☕ Café con leche</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>Bebida caliente, ideal para acompañar cualquier postre.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍷 Vino tinto nacional</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>Ideal para acompañar el asado.</p>
    </div>
    <div style={{
      padding: '1.8rem',
      borderRadius: '24px',
      background: tema === 'oscuro' 
        ? 'linear-gradient(145deg, #301818, #200f0f)' 
        : 'linear-gradient(145deg, #ffffff, #f3ebe0)',
      boxShadow: tema === 'oscuro' 
        ? '0 8px 24px #00000060, inset 0 1px 0 #ffffff20' 
        : '0 8px 24px #00000018, inset 0 1px 0 #ffffff',
      border: tema === 'oscuro' ? '1px solid #ffffff15' : '1px solid #00000008'
    }}>
      <h4 style={{
        marginBottom:'0.8rem',
        color: tema === 'oscuro' ? '#ffb8b8' : '#992c2c',
        fontSize: '1.25rem',
        textShadow: tema === 'oscuro' ? '0 0 8px #ff777744' : 'none'
      }}>🍊 Jugo de naranja natural</h4>
      <p style={{
        color: tema === 'oscuro' ? '#e2c8b4' : '#442211',
        lineHeight: '1.6'
      }}>Refrescante, recién exprimido.</p>
    </div>
  </div>
</section>

      {/* Sección azul de convocatorias que faltaba */}
      <section style={{
        background: '#56a7d9',
        color: 'white',
        padding: esMovil ? '2rem 1rem' : '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{textAlign: 'center'}}>
          <h2>Conecta artistas, empresas y proyectos creativos</h2>
          <p style={{margin: '1rem 0'}}>
            Descubre convocatorias, comparte tu portafolio y participa en actividades artísticas únicas
          </p>
          <Link to="https://www.instagram.com/orbi.ta2026?utm_source=qr&lqvp=cnVmMGY2bzdhbjl4" style={{ textDecoration: "none" }}>
          <button style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '20px',
            border: 'none',
            background: '#f06c86',
            color: 'white',
            fontSize: '1rem'
          }}>
            Ver actividades disponibles
          </button>
          </Link>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600"
            alt="Material artístico"
            style={{width: '100%', borderRadius: '12px'}}
          />
        </div>
      </section>

      {/* Tarjetas de actividades destacadas */}
      <section style={{padding: esMovil ? '2rem 1rem' : '3rem 2rem', maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center', color: '#2266bb', marginBottom: '2rem'}}>Actividades y convocatorias destacadas</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: esMovil ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
              alt="Convocatoria ilustración"
              style={{width: '100%', height: '180px', objectFit: 'cover'}}
            />
            <div style={{padding: '1rem'}}>
              <h3>Convocatoria de ilustración</h3>
              <p>Empresa busca ilustradores para proyecto editorial</p>
            </div>
          </div>

          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400"
              alt="Presentación artística"
              style={{width: '100%', height: '180px', objectFit: 'cover'}}
            />
            <div style={{padding: '1rem'}}>
              <h3>Presentación artística en evento cultural</h3>
              <p>Espacio cultural contrata artistas para show en vivo</p>
            </div>
          </div>

          <div style={{boxShadow: '0 3px 10px #00000022', borderRadius: '12px', overflow: 'hidden'}}>
            <img
              src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400"
              alt="Taller creativo"
              style={{width: '100%', height: '180px', objectFit: 'cover'}}
            />
            <div style={{padding: '1rem'}}>
              <h3>Taller comunitario de arte</h3>
              <p>Actividad abierta para creadores de todas las edades</p>
            </div>
          </div>
        </div>
      </section>
    </div>
        </div>

      <VotacionFlotante />
    </div>
  )
}
