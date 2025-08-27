import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import Login from './auth/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
      
          <Route path="/login" element={<Login />} />

        {/* RUTAS PRIVADAS */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
