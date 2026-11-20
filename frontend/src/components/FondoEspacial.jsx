import { useEffect, useRef } from 'react'

export default function FondoEspacial() {
  const contenedorRef = useRef(null)

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return

    contenedor.innerHTML = ''

    for (let i = 0; i < 120; i++) {
      const estrella = document.createElement('div')
      estrella.classList.add('estrella')
      estrella.style.left = `${Math.random() * 100}%`
      estrella.style.width = `${Math.random() * 3 + 1}px`
      estrella.style.height = estrella.style.width
      estrella.style.animationDuration = `${Math.random() * 15 + 5}s`
      estrella.style.animationDelay = `${Math.random() * 20}s`
      contenedor.appendChild(estrella)
    }

    return () => {
      contenedor.innerHTML = ''
    }
  }, [])

  return <div ref={contenedorRef} className="fondo-espacial" aria-hidden="true" />
}