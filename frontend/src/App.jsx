import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import Login from './auth/Login'
import Home from './components/home/Home'
import Dashboard from './dashboard/Dashboard'
import Layout from './components/home/Layout'
import CrearConferencista from './components/conferencistas/CrearConferencista'
import GestionarConferencista from './components/conferencistas/GestionarConferencista'
import CrearReserva from './components/reservas/CrearReserva'
import GestionarReserva from './components/reservas//GestionarReserva'
import CrearAuditorio from './components/auditorios/CrearAuditorio'
import GestionarAuditorio from './components/auditorios/GestionarAuditorio'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* CRUD DE CONFERENCISTAS */}
            <Route path="conferencistas/crear" element={<CrearConferencista />} />
            <Route path="conferencistas/gestionar" element={<GestionarConferencista />} />
            {/* CRUD DE AUDITORIOS */}
            <Route path="auditorios/crear" element={<CrearAuditorio />} />
            <Route path="auditorios/gestionar" element={<GestionarAuditorio/>} />
            {/* CRUD DE RESERVAS */}
            <Route path="reservas/crear" element={<CrearReserva />} />
            <Route path="reservas/gestionar" element={<GestionarReserva />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
