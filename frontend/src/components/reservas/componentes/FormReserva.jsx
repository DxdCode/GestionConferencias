import { useForm } from "react-hook-form";

function FormReserva({ onSubmit, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <label className="flex flex-col text-sec">
        Código
        <input
          type="number"
          placeholder="Ingresa el código"
          className="mt-2 p-2 rounded-sm bg-card text-main"
          {...register("codigo", { required: "El código es obligatorio" })}
        />
        {errors.codigo && <span className="text-error text-sm">{errors.codigo.message}</span>}
      </label>

      <label className="flex flex-col text-sec">
        Descripción
        <input
          type="text"
          placeholder="Ingresa la descripción"
          className="mt-2 p-2 rounded-sm bg-card text-main"
          {...register("descripcion", { required: "La descripción es obligatoria" })}
        />
        {errors.descripcion && <span className="text-error text-sm">{errors.descripcion.message}</span>}
      </label>

      <button
        type="submit"
        className="mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-secondary text-terc font-semibold hover:bg-primary hover:text-card transition"
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}

export default FormReserva;
