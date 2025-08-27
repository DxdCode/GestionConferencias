import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Link } from "react-router-dom";
import imagenHome from '../../assets/imagen.png'
import Card from './CardHome'

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenedor principal mitad y mitad */}
      <div className="flex flex-1 flex-row">
        {/* Mitad izquierda: imagen (oculta en móviles) */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center hidden md:flex">
          <img
            src={imagenHome}
            alt="Imagen de Inicio"
            className="w-1/2 h-auto object-contain"
          />
        </div>

        {/* Contenido */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Bienvenido
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Gestión de tus conferencias, reserva y auditorias de manera rápida.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={'/login'} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition transform hover:scale-105">
              Iniciar Sesión
            </Link>

            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold transition transform hover:scale-105"
              onClick={toggleModal}
            >
              Más Informacion
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={toggleModal}
        >
          <div className="bg-white rounded-lg w-full max-w-6xl h-auto overflow-auto shadow-lg" onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full relative flex flex-col justify-center">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={toggleModal}><X size={24} />
              </button>
              <Card />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-100 text-gray-600 py-4 text-center">
        © 2025 Gestión de Conferencias. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Home
