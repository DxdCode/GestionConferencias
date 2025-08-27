import React from "react";
import { X } from "lucide-react";

export default function ModalGestionar({
  title = "Editar",
  editId,
  setEditId,
  formData,
  handleChange,
  handleSubmit,
}) {
  if (!editId) return null;

  const campos = Object.keys(formData)
    .filter((key) => key !== "_id")
    .map((key) => ({
      name: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      type: key.includes("fecha") ? "date" : "text",
    }));

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-lg w-full max-w-lg p-4 relative overflow-hidden">
        {/* Botón cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setEditId(null)}
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-sec">{title}</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {campos.map((field) => (
            <div key={field.name} className="flex flex-col overflow-hidden">
              <label className="text-sm text-sec font-medium mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={
                  field.type === "date"
                    ? formatDate(formData[field.name])
                    : formData[field.name] || ""
                }
                onChange={handleChange}
                placeholder={field.label}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-sec text-sec"
              />
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-xl hover:opacity-85 hover:duration-300"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditId(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
