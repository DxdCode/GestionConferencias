import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useConferencistas from "../../hooks/useConferencistas";
import FormularioRegistro from "../../dashboard/FormularioRegistro";

function CrearConferencistas() {
  const { crearConferencistas, loading } = useConferencistas();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Apellido", name: "apellido", type: "text", placeholder: "Ingresa un apellido" },
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
    { label: "Genero", name: "genero", type: "text", placeholder: "Ingresa tu genero" },
    { label: "Ciudad", name: "ciudad", type: "text", placeholder: "Ingresa una ciudad" },
    { label: "Dirección", name: "direccion", type: "text", placeholder: "Ingresa una dirección" },
    { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date", placeholder: "" },
    { label: "Teléfono", name: "telefono", type: "text", placeholder: "Ingresa un teléfono" },
    { label: "Email", name: "email", type: "email", placeholder: "Ingresa un correo electrónico" },
    { label: "Empresa", name: "empresa", type: "text", placeholder: "Ingresa el nombre de la empresa" },
  ].map(f => ({ ...f, register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }), error: errors[f.name]?.message }));

  const onSubmit = handleSubmit((data) => {
    crearConferencistas(data, () => {
      reset();
      setTimeout(() => navigate("/dashboard/conferencistas/gestionar"), 2000);
    });
  });

  return <FormularioRegistro titulo="Crear Conferencista" fields={fields} onSubmit={onSubmit} loading={loading} />;
}

export default CrearConferencistas;
