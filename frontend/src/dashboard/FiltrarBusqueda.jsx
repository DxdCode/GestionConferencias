  import { Search, Filter } from "lucide-react";

  function FiltroBusqueda({ busqueda, setBusqueda, campoFiltro, setCampoFiltro, campos = [] }) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Buscar por ${campoFiltro || "campo"}`}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg shadow-sm text-sec focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="relative w-full sm:w-60">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={campoFiltro}
            onChange={(e) => setCampoFiltro(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg shadow-sm text-sec focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {campos.length > 0 ? (
              campos.map((campo) => (
                <option key={campo.value} value={campo.value}>
                  {campo.label}
                </option>
              ))
            ) : (
              <option value="">Sin campos</option>
            )}
          </select>
        </div>
      </div>
    );
  }

  export default FiltroBusqueda;