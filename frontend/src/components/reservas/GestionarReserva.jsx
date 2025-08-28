import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useReservas from "../../hooks/useReservas";
import { useForm } from "react-hook-form";
import FormularioRegistro from "../../dashboard/FormularioRegistro";

function GestionarReserva() {
  const { reservas, loading, eliminarReserva, actualizarReserva, cargarReservas } = useReservas();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [editando, setEditando] = useState(null);

  // Campos para el formulario
  const fields = [
    { label: "Código", name: "codigo", type: "text", placeholder: "Ingresa un código" },
    { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción" },
    { label: "Auditorio", name: "auditorios", type: "text", placeholder: "Ingresa el nombre del auditorio" },
    { label: "Conferencista", name: "Conferencistas", type: "text", placeholder: "Ingresa el nombre del conferencista" },
  ].map(f => ({
    ...f,
    register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }),
    error: errors[f.name]?.message
  }));

  // Editar reserva: llena el formulario con los datos existentes
  const handleEditar = (reserva) => {
    setEditando(reserva);
    setValue("codigo", reserva.codigo);
    setValue("descripcion", reserva.descripcion);
    setValue("auditorios", reserva.auditorios?.nombre || "");
    setValue("Conferencistas", reserva.Conferencistas?.nombre || "");
  };

  // Actualizar reserva
  const handleActualizar = handleSubmit(async (data) => {
    if (!editando) return;
    try {
      // Solo envía los IDs al backend
      await actualizarReserva(editando._id, {
        codigo: data.codigo,
        descripcion: data.descripcion,
        auditorios: editando.auditorios?._id || null,
        Conferencistas: editando.Conferencistas?._id || null
      });
      toast.success("Reserva actualizada correctamente");
      setEditando(null);
      reset();
    } catch (error) {
      toast.error("Error al actualizar la reserva");
    }
  });

  // Eliminar reserva
  const handleEliminar = async (id) => {
    console.log("Eliminando reserva con ID:", id);
    if (!id) return toast.error("ID de reserva inválido");
    try {
      await eliminarReserva(id);
      toast.success("Reserva eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      toast.error(error.response?.data?.msg || "Error al eliminar la reserva");
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestionar Reservas</h2>

      {loading && <p>Cargando reservas...</p>}
      {!loading && reservas.length === 0 && <p>No hay reservas disponibles</p>}

      {!loading && reservas.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Código</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Auditorio</th>
              <th className="border p-2">Conferencista</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva._id}>
                <td className="border p-2">{reserva.codigo}</td>
                <td className="border p-2">{reserva.descripcion}</td>
                <td className="border p-2">{reserva.auditorios?.nombre || "—"}</td>
                <td className="border p-2">{reserva.Conferencistas?.nombre || "—"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditar(reserva)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(reserva._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editando && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Editar Reserva</h3>
          <FormularioRegistro
            titulo="Actualizar Reserva"
            fields={fields}
            onSubmit={handleActualizar}
            loading={loading}
          />
          <button
            onClick={() => {
              setEditando(null);
              reset();
            }}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default GestionarReserva;
