import { Edit, Trash } from "lucide-react";

function TablaConferencista({ conferencistas = [], campos = [], loading = false, handleEdit, handleDelete }) {
  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(date);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] grid-cols-1 gap-2 bg-white rounded-xl shadow-md px-6 py-4 border border-gray-100 animate-pulse"
          >
            {campos.map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))
      ) : conferencistas.length === 0 ? (
        <p className="text-center text-gray-500">No hay conferencistas que coincidan con la búsqueda</p>
      ) : (
        [...conferencistas].reverse().map((est) => (
          <div
            key={est._id}
            className="grid sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] grid-cols-1 gap-2 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 px-6 py-4 border border-gray-100"
          >
            {campos.map((campo) => (
              <div key={campo.value} className="text-main">
                <span className="sm:hidden block text-xs text-gray-400">{campo.label}</span>
                <p className="text-gray-700 truncate">
                  {campo.value.includes("fecha") ? formatDate(est[campo.value]) : est[campo.value]}
                </p>
              </div>
            ))}
            <div className="flex gap-2">
              <button onClick={() => handleEdit(est)} className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(est._id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TablaConferencista;
