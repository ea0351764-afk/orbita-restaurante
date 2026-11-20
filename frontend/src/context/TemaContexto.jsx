import { createContext, useContext, useState, useEffect } from 'react'

const ContextoTema = createContext()

export function ProveedorTema({ children }) {
  const [tema, setTema] = useState('claro')

  // Cargar el tema guardado al iniciar
  useEffect(() => {
    const temaGuardado = localStorage.getItem('temaOrbita')
    if (temaGuardado) setTema(temaGuardado)
  }, [])

  // Aplicar estilos al body de toda la aplicación
  useEffect(() => {
    const cuerpo = document.body
    if (tema === 'oscuro') {
      cuerpo.style.background = '#2b1414'
      cuerpo.style.color = '#f1d3d3'
    } else {
      cuerpo.style.background = '#ffffff'
      cuerpo.style.color = '#334455'
    }
    localStorage.setItem('temaOrbita', tema)
  }, [tema])

  return (
    <ContextoTema.Provider value={{ tema, setTema }}>
      {children}
    </ContextoTema.Provider>
  )
}

// Hook para usar el tema en cualquier página
export function useTema() {
  return useContext(ContextoTema)
}