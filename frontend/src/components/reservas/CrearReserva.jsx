import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import useReservas from "../../hooks/useReservas";
import useAuditorios from "../../hooks/useAuditorios";
import useConferencistas from "../../hooks/useConferencistas";
import FormGenerico from "../../dashboard/FormularioRegistro";
import { toast } from "react-toastify";

function CrearReserva() {
  const { crearReserva, loading: reservasLoading } = useReservas();
  const { auditorios, loading: auditoriosLoading } = useAuditorios(); // <-- nombre en plural
  const { conferencistas, loading: conferencistasLoading } = useConferencistas();
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

  const isLoading = reservasLoading || auditoriosLoading || conferencistasLoading;

  // Campos del formulario
  const fields = [
    {
      label: "Auditorio",
      name: "auditorios",
      type: "select",
      placeholder: "Selecciona un auditorio",
      options: Array.isArray(auditorios)
        ? auditorios.map(a => ({ value: a._id, label: a.nombre }))
        : [],
      controller: {
        control,
        rules: { required: "Debes seleccionar un auditorio" },
      },
    },
    {
      label: "Conferencista",
      name: "Conferencistas",
      type: "select",
      placeholder: "Selecciona un conferencista",
      options: Array.isArray(conferencistas)
        ? conferencistas.map(c => ({ value: c._id, label: `${c.nombre} ${c.apellido}` }))
        : [],
      controller: {
        control,
        rules: { required: "Debes seleccionar un conferencista" },
      },
    },
    { label: "Fecha", name: "fecha", type: "date", placeholder: "Selecciona una fecha", register: register("fecha", { required: "Debes seleccionar una fecha" }), error: errors.fecha?.message },
    { label: "Hora Inicio", name: "horaInicio", type: "time", placeholder: "Ingresa hora de inicio", register: register("horaInicio", { required: "Debes ingresar hora de inicio" }), error: errors.horaInicio?.message },
    { label: "Hora Fin", name: "horaFin", type: "time", placeholder: "Ingresa hora de fin", register: register("horaFin", { required: "Debes ingresar hora de fin" }), error: errors.horaFin?.message },
    { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción", register: register("descripcion", { required: "Debes ingresar una descripción" }), error: errors.descripcion?.message },
  ];

  const onSubmit = handleSubmit((data) => {
    console.log("Datos del formulario en CrearReserva:", data);

    const payload = {
      codigo: "R-" + Date.now(), // Código único
      ...data,
      fecha: new Date(data.fecha).toISOString(),
    };

    crearReserva(payload, () => {
      reset();
      toast.success("Reserva creada correctamente");
      setTimeout(() => navigate("/dashboard/reservas/gestionar"), 2000);
    });
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl font-semibold text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  if (!Array.isArray(auditorios) || auditorios.length === 0 || !Array.isArray(conferencistas) || conferencistas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl font-semibold text-red-500">
          No hay auditorios o conferencistas disponibles. Por favor, crea algunos primero.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card rounded-xl shadow-lg mt-8">
      <FormGenerico
        titulo="Crear Reserva"
        fields={fields}
        onSubmit={onSubmit}
        loading={isLoading}
      />
    </div>
  );
}

export default CrearReserva;
