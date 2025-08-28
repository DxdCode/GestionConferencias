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
    { label: "Código", name: "codigo", type: "text", placeholder: "Ingresa un código" },
    { label: "Ubicacion", name: "ubicacion", type: "text", placeholder: "Ingresa una descripción" },
    { label: "Capacidad", name: "capacidad", type: "text", placeholder: "Ingresa la capacidad" },
    { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción" },
  ].map(f => ({ ...f, 
    register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }), 
    error: errors[f.name]?.message }));

  const onSubmit = handleSubmit((data) => {
    crearAuditorio(data, () => {
      reset();
      setTimeout(() => navigate("/dashboard/auditorio/gestionar"), 2000);
    });
  });

  return <FormularioRegistro titulo="Crear Auditorio" fields={fields} onSubmit={onSubmit} loading={loading} />;
}
export default CrearAuditorio;
