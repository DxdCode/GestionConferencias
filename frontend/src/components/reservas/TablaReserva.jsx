import React, { useState } from "react";
import { Edit, Trash, X } from "lucide-react";

function TablaReserva({ reservas = [], loading = false, handleEdit, handleDelete, campos = [] }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [auditoriosModal, setAuditoriosModal] = useState([]);

  const abrirModal = (auditorios) => {
    setAuditoriosModal(auditorios);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAuditoriosModal([]);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-[100px_1fr_100px_0.8fr_300px] grid-cols-1 gap-4 bg-white rounded-xl shadow-md px-6 py-4 border border-gray-100 animate-pulse"
          >
            {campos.map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))
      ) : reservas.length === 0 ? (
        <p className="text-center text-gray-500 text-sm pt-4">
          No hay reservas para mostrar.
        </p>
      ) : (
        [...reservas].reverse().map((reserva) => (
          <div
            key={reserva._id}
            className="grid sm:grid-cols-[100px_minmax(150px,1fr)_100px_0.8fr_300px] grid-cols-1 gap-4 bg-card rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 px-6 py-4 border border-gray-100 text-sec text-sm overflow-hidden"
          >
            {campos.map((campo) => (
              <div key={campo.value} className="text-main">
                <span className="sm:hidden block text-xs text-gray-400">
                  {campo.label}:{" "}
                </span>

                <div className="truncate overflow-hidden whitespace-nowrap text-left sm:text-center">
                  {campo.value === "auditorios" ? (
                    <>
                      <span className="truncate">
                        {reserva.auditorios
                          .slice(0, 1)
                          .map((a) => a.nombre)
                          .join(" ")}
                      </span>
                      {reserva.auditorios.length > 1 && (
                        <button
                          onClick={() => abrirModal(reserva.auditorios)}
                          className="text-xs text-sec ml-1 cursor-pointer truncate"
                        >
                          +{reserva.auditorios.length - 1} más
                        </button>
                      )}
                    </>
                  ) : campo.render ? (
                    <span className="truncate">
                      {campo.render(reserva[campo.value])}
                    </span>
                  ) : (
                    <span className="truncate">{reserva[campo.value]}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(reserva)}
                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(reserva._id)}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))
      )}

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 p-1 rounded hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Auditorios</h3>
            <ul className="list-disc pl-5">
              {auditoriosModal.map((a) => (
                <li key={a._id} className="mb-2 truncate">
                  {a.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaReserva;
