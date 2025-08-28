import { X } from "lucide-react";

export default function ModalGestionarReserva({
  editId,
  setEditId,
  formData,
  setFormData,
  reservasDisponibles = [],
  handleSubmit,
}) {
  if (!editId) return null;

  const handleChangeReserva = (reservaId) => {
    if (formData.reserva.includes(reservaId)) {
      setFormData({
        ...formData,
        reserva: formData.reserva.filter((id) => id !== reservaId),
      });
    } else {
      setFormData({
        ...formData,
        reserva: [...formData.reserva, reservaId],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[80vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setEditId(null)}
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-sec">Editar Reserva</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Código */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-sec mb-1">Código</label>
            <input
              name="codigo"
              type="text"
              value={formData.codigo || ""}
              onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-sec mb-1">Descripción</label>
            <input
              name="descripcion"
              type="text"
              value={formData.descripcion || ""}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Reservas */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-sec mb-1">Reservas</label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {reservasDisponibles.map((m) => {
                const selected = formData.reserva.includes(m._id);
                return (
                  <div
                    key={m._id}
                    onClick={() => handleChangeReserva(m._id)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm border transition-all ${
                      selected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {m.nombre}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-xl hover:opacity-85 transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditId(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
