import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import Login from './auth/Login'
import Home from './components/home/Home'
import Dashboard from './dashboard/Dashboard'
import Layout from './components/home/Layout'

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
