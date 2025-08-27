import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";

function FormGenerico({ titulo, fields, onSubmit, loading }) {
  return (
    <section className="px-2">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-2 text-sec">{titulo}</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col text-sec">
            {field.label}
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              {...field.register}
            />
            {field.error && <span className="text-sm text-error mt-1">{field.error}</span>}
          </label>
        ))}

        <button
          type="submit"
          className="mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-secondary text-terc font-semibold hover:bg-primary hover:text-card transition transform hover:scale-105 shadow-md"
        >
          <Plus size={20} />
          {loading ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </section>
  );
}

export default FormGenerico;
