import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useConferencistas from "../../hooks/useConferencistas";
import FormularioRegistro from "../../dashboard/FormularioRegistro";

function GestionarConferencista() {
    const { 
        conferencistas, 
        loading, 
        crearConferencista, 
        actualizarConferencista, 
        eliminarConferencista 
    } = useConferencistas();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [editando, setEditando] = useState(null);

    const fields = [
        { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingrese nombre" },
        { label: "Apellido", name: "apellido", type: "text", placeholder: "Ingrese apellido" },
        { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingrese cédula" },
        { label: "Género", name: "genero", type: "text", placeholder: "masculino / femenino / otro" },
        { label: "Ciudad", name: "ciudad", type: "text", placeholder: "Ingrese ciudad" },
        { label: "Dirección", name: "direccion", type: "text", placeholder: "Ingrese dirección" },
        { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date" },
        { label: "Teléfono", name: "telefono", type: "text", placeholder: "Ingrese teléfono" },
        { label: "Email", name: "email", type: "email", placeholder: "Ingrese email" },
        { label: "Empresa", name: "empresa", type: "text", placeholder: "Ingrese empresa" },
    ].map(f => ({
        ...f,
        register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }),
        error: errors[f.name]?.message
    }));

    const handleEditar = (conferencista) => {
        setEditando(conferencista);
        for (const field of fields) {
            setValue(field.name, conferencista[field.name]);
        }
    };

    const handleActualizar = handleSubmit(async (data) => {
        try {
            await actualizarConferencista(editando._id, data);
            setEditando(null);
            reset();
            toast.success("Conferencista actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar conferencista");
        }
    });

    const handleEliminar = async (id) => {
        try {
            await eliminarConferencista(id);
            toast.success("Conferencista eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar conferencista");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Gestionar Conferencistas</h2>

            {loading && <p>Cargando conferencistas...</p>}

            {!loading && (!conferencistas || conferencistas.length === 0) && (
                <p>No hay conferencistas disponibles</p>
            )}

            {!loading && conferencistas && conferencistas.length > 0 && (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Apellido</th>
                            <th className="border p-2">Cédula</th>
                            <th className="border p-2">Teléfono</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferencistas.map((c) => (
                            <tr key={c._id}>
                                <td className="border p-2">{c.nombre}</td>
                                <td className="border p-2">{c.apellido}</td>
                                <td className="border p-2">{c.cedula}</td>
                                <td className="border p-2">{c.telefono}</td>
                                <td className="border p-2">{c.email}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEditar(c)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(c._id)}
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
                    <h3 className="text-xl font-bold mb-2">Editar Conferencista</h3>
                    <FormularioRegistro
                        titulo="Actualizar Conferencista"
                        fields={fields}
                        onSubmit={handleActualizar}
                        loading={loading}
                    />
                    <button
                        onClick={() => { setEditando(null); reset(); }}
                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}

export default GestionarConferencista;
