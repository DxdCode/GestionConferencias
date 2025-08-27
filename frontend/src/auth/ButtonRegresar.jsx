import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ButtonRegresar() {
  const location = useLocation();

  // Definir colores segun la pagina
  const styles = {
    '/login': 'bg-blue-600 hover:bg-blue-700 text-white',
  };

  const buttonStyle = styles[location.pathname] || 'bg-gray-200 text-main';

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold hover:opacity-90  z-20 hover:scale-105 transition ${buttonStyle}`}
      style={{ marginBottom: '1rem' }}
    >
      <ArrowLeft size={20} />
      Regresar
    </Link>
  );
}

export default ButtonRegresar;
