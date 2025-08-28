import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuditorios from "../../hooks/useAuditorios";
import FormularioRegistro from "../../dashboard/FormularioRegistro";

function CrearAuditorio() {
    const { crearAuditorio, loading } = useAuditorios();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const fields = [
        { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
        { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
        { label: "Ubicación", name: "ubicacion", type: "text", placeholder: "Ingresa una ubicación" },
        { label: "Capacidad", name: "capacidad", type: "number", placeholder: "Ingresa la capacidad" },
        { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción" },
    ].map(f => ({
        ...f,
        register: register(f.name, {
            required: `Debe ingresar ${f.label.toLowerCase()}`,
            validate: f.name === "capacidad" ? value => Number(value) > 0 || "La capacidad debe ser mayor a 0" : undefined,
        }),
        error: errors[f.name]?.message,
    }));

    const onSubmit = handleSubmit((data) => {
        console.log("Datos del formulario:", data); // Depuración
        const dataToSend = {
            ...data,
            capacidad: Number(data.capacidad), // Asegura que sea número
        };
        crearAuditorio(dataToSend, () => {
            reset();
            setTimeout(() => navigate("/dashboard/auditorios/gestionar"), 2000);
        });
    });

    return <FormularioRegistro titulo="Crear Auditorio" fields={fields} onSubmit={onSubmit} loading={loading} />;
}

export default CrearAuditorio;