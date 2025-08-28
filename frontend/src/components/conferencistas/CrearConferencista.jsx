import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useConferencistas from "../../hooks/useConferencistas";
import FormularioRegistro from "../../dashboard/FormularioRegistro";
import { toast } from "react-toastify";

function CrearConferencistas() {
  const { crearConferencistas, loading } = useConferencistas();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Definición de campos con validación
  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Apellido", name: "apellido", type: "text", placeholder: "Ingresa un apellido" },
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
    { label: "Género", name: "genero", type: "text", placeholder: "masculino / femenino / otro" },
    { label: "Ciudad", name: "ciudad", type: "text", placeholder: "Ingresa una ciudad" },
    { label: "Dirección", name: "direccion", type: "text", placeholder: "Ingresa una dirección" },
    { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date", placeholder: "" },
    { label: "Teléfono", name: "telefono", type: "text", placeholder: "Ingresa un teléfono" },
    { label: "Email", name: "email", type: "email", placeholder: "Ingresa un correo electrónico" },
    { label: "Empresa", name: "empresa", type: "text", placeholder: "Ingresa el nombre de la empresa" },
  ].map(f => ({
    ...f,
    register: register(f.name, {
      required: `Debe ingresar ${f.label.toLowerCase()}`,
      validate: f.name === "genero"
        ? value => ["masculino", "femenino", "otro"].includes(value.toLowerCase()) || "Género inválido"
        : f.name === "email"
        ? value => /\S+@\S+\.\S+/.test(value) || "Email inválido"
        : f.name === "telefono"
        ? value => /^[0-9]{7,15}$/.test(value) || "Teléfono inválido"
        : undefined
    }),
    error: errors[f.name]?.message
  }));

  const onSubmit = handleSubmit(async (data) => {
    try {
      await crearConferencistas(data, () => {
        reset();
        setTimeout(() => navigate("/dashboard/conferencistas/gestionar"), 1000);
      });
    } catch (error) {
      // Manejar errores del backend de forma amigable
      const msg = error.response?.data?.msg || error.message || "Error al crear conferencista";
      toast.error(msg);
    }
  });

  return (
    <FormularioRegistro
      titulo="Crear Conferencista"
      fields={fields}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

export default CrearConferencistas;
