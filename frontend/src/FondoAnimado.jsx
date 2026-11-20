import { useEffect, useRef } from 'react'

export default function FondoAnimado() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Elementos del fondo
    const estrellas = []
    const particulasArte = []
    const ingredientes = []
    
    // Crear estrellas
    for (let i = 0; i < 150; i++) {
      estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tamaño: Math.random() * 2 + 0.5,
        velocidad: Math.random() * 0.3 + 0.05,
        brillo: Math.random()
      })
    }

    // Partículas de arte (pinceladas suaves)
    const coloresArte = ['#d49838', '#8b5a2b', '#cd853f', '#daa520', '#b8860b']
    for (let i = 0; i < 15; i++) {
      particulasArte.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tamaño: Math.random() * 60 + 30,
        color: coloresArte[Math.floor(Math.random() * coloresArte.length)],
        velocidadX: (Math.random() - 0.5) * 0.15,
        velocidadY: (Math.random() - 0.5) * 0.15,
        rotacion: Math.random() * Math.PI * 2,
        velocidadRot: (Math.random() - 0.5) * 0.005
      })
    }

    // Ingredientes orbitando como planetas pequeños
    const iconosComida = ['☕', '🍪', '🌿', '🍫', '🫒', '🍯', '🥐']
    for (let i = 0; i < 12; i++) {
      ingredientes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        icono: iconosComida[Math.floor(Math.random() * iconosComida.length)],
        tamaño: Math.random() * 14 + 12,
        velocidad: Math.random() * 0.08 + 0.02,
        radio: Math.random() * 250 + 80,
        angulo: Math.random() * Math.PI * 2,
        centroX: Math.random() * canvas.width,
        centroY: Math.random() * canvas.height
      })
    }

    let animacionId
    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Degradado de fondo espacial
      const gradiente = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      gradiente.addColorStop(0, '#1a1a2e')
      gradiente.addColorStop(0.5, '#16213e')
      gradiente.addColorStop(1, '#0f0f23')
      ctx.fillStyle = gradiente
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar pinceladas de arte
      particulasArte.forEach(p => {
        p.x += p.velocidadX
        p.y += p.velocidadY
        p.rotacion += p.velocidadRot
        
        if (p.x < -p.tamaño) p.x = canvas.width + p.tamaño
        if (p.x > canvas.width + p.tamaño) p.x = -p.tamaño
        if (p.y < -p.tamaño) p.y = canvas.height + p.tamaño
        if (p.y > canvas.height + p.tamaño) p.y = -p.tamaño

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotacion)
        ctx.globalAlpha = 0.07
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.tamaño, p.tamaño * 0.4, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Dibujar estrellas parpadeantes
      estrellas.forEach(e => {
        e.brillo += e.velocidad * 0.02
        const alfa = 0.3 + Math.abs(Math.sin(e.brillo)) * 0.7
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.tamaño, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alfa})`
        ctx.fill()
      })

      // Dibujar ingredientes orbitando
      ingredientes.forEach(ing => {
        ing.angulo += ing.velocidad
        ing.x = ing.centroX + Math.cos(ing.angulo) * ing.radio
        ing.y = ing.centroY + Math.sin(ing.angulo) * ing.radio
        
        ctx.font = `${ing.tamaño}px serif`
        ctx.globalAlpha = 0.45
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(ing.icono, ing.x, ing.y)
        ctx.globalAlpha = 1
      })

      animacionId = requestAnimationFrame(animar)
    }

    animar()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animacionId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}