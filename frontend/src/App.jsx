import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Acerca from './pages/Acerca'
import Servicios from './pages/Servicios'
import PortafoliosPublicos from './pages/PortafoliosPublicos'
import ReservaMesas from './pages/ReservaMesas'
import Login from './pages/Login'
import Registro from './pages/Registro'
import SplashOrbita from './components/SplashOrbita'
import FondoAnimado from './FondoAnimado'
import MiPerfil from './pages/MiPerfil'

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true)

  return (
    <Router>
      <FondoAnimado />
      
      {mostrarSplash ? (
        <SplashOrbita onTerminar={() => setMostrarSplash(false)} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/MiPerfil" element={<MiPerfil />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/ReservaMesas" element={<ReservaMesas />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Acerca" element={<Acerca />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/PortafoliosPublicos" element={<PortafoliosPublicos />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  )
}
