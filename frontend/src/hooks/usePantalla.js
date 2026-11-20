import { useState, useEffect } from 'react'

export const usePantalla = () => {
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768)

  useEffect(() => {
    const cambiarTamaño = () => {
      setEsMovil(window.innerWidth < 768)
    }
    window.addEventListener('resize', cambiarTamaño)
    return () => window.removeEventListener('resize', cambiarTamaño)
  }, [])

  return esMovil
}