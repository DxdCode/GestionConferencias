import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuditorios from "../../hooks/useAuditorios";
import FormularioRegistro from "../../dashboard/FormularioRegistro";

function GestionarAuditorio() {
  const { auditorios, loading, eliminarAuditorio, actualizarAuditorio } = useAuditorios();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [editando, setEditando] = useState(null);

  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
    { label: "Ubicación", name: "ubicacion", type: "text", placeholder: "Ingresa una ubicación" },
    { label: "Capacidad", name: "capacidad", type: "number", placeholder: "Ingresa la capacidad" },
    { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción" },
  ].map(f => ({
    ...f,
    register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }),
    error: errors[f.name]?.message,
  }));

  const handleEditar = (auditorio) => {
    setEditando(auditorio);
    setValue("nombre", auditorio.nombre);
    setValue("cedula", auditorio.cedula);
    setValue("ubicacion", auditorio.ubicacion);
    setValue("capacidad", auditorio.capacidad);
    setValue("descripcion", auditorio.descripcion);
  };

  const handleActualizar = handleSubmit(async (data) => {
    await actualizarAuditorio(editando._id, { ...data, capacidad: Number(data.capacidad) });
    setEditando(null);
    reset();
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestionar Auditorios</h2>
      {loading && <p>Cargando auditorios...</p>}
      {!loading && auditorios.length === 0 && <p>No hay auditorios disponibles</p>}
      {!loading && auditorios.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Cédula</th>
              <th className="border p-2">Ubicación</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {auditorios.map(a => (
              <tr key={a._id}>
                <td className="border p-2">{a.nombre}</td>
                <td className="border p-2">{a.cedula}</td>
                <td className="border p-2">{a.ubicacion}</td>
                <td className="border p-2">
                  <button onClick={() => handleEditar(a)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                  <button onClick={() => eliminarAuditorio(a._id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editando && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Editar Auditorio</h3>
          <FormularioRegistro titulo="Actualizar Auditorio" fields={fields} onSubmit={handleActualizar} loading={loading} />
          <button onClick={() => { setEditando(null); reset(); }} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default GestionarAuditorio;
