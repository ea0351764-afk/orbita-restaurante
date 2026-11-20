import { useEffect } from 'react'
import orbitaLogo from '../assets/Orbita_2026.png'

export default function SplashOrbita({ onTerminar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      onTerminar()
    }, 2500)
    return () => clearTimeout(temporizador)
  }, [onTerminar])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <img
        src={orbitaLogo}
        alt="Órbita animada"
        style={{
          width: '260px',
          animation: 'girar 2.5s ease-in-out'
        }}
      />
      <style>{`
        @keyframes girar {
          0% {
            transform: scale(0.6) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.15) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}