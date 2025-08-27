import { LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CardHome from './CardHome'
function Home() {
  return (
    <section className='min-h-screen bg-base flex flex-col items-center px-4 sm:justify-center justify-start text-center relative'>

      {/* Contenedor de círculos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hidden sm:block absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-purple-200 rounded-full sm:w-92 sm:h-92"></div>
        <div className="hidden sm:block absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-sky-300 rounded-full sm:w-72 sm:h-72"></div>
        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-48 h-48 bg-blue-200 rounded-full sm:w-80 sm:h-80"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-48 h-48 bg-purple-300 rounded-full sm:w-80 sm:h-80"></div>
      </div>

      {/* Contenedor*/}
      <div className="w-full max-w-4xl z-10 relative">
        {/* Titulo con iconos */}
        <div className="text-center flex flex-1 flex-col pt-4">
          <h1 className="text-4xl py-5 font-bold text-main sm:text-[3em]">
            Bienvenido 👋 <br />
            <span className="text-sec">Gestión de Conferencias</span>
          </h1>
          <p className="md:text-lg text-sec text-[1em]">
          </p>
        </div>

        {/* Cards */}
        <div className="w-full py-10 flex justify-center">
          <CardHome/>
        </div>

        {/* Botones con iconos */}
        <div className="flex flex-col px-6 py-6 sm:px-12 sm:flex-row justify-center sm:justify-evenly gap-4 pt-6">
          <Link to={"/login"} className="cursor-pointer bg-primary text-terc py-3 text-base px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition transform shadow-md sm:text-lg">
            <LogIn size={20} />
            Iniciar Sesión
          </Link>
          <Link to={"/register"} className="cursor-pointer bg-secondary text-terc py-3 px-6 text-base rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition transform shadow-md sm:text-lg">
            <UserPlus size={20} />
            Registrarse
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
