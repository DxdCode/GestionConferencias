import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

function FormGenerico({ titulo, fields, onSubmit, loading }) {
    return (
        <section className="px-2">
            <ToastContainer />
            <h2 className="text-3xl font-bold mb-2 text-sec">{titulo}</h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {fields.map((field) => (
                    <label key={field.name} className="flex flex-col text-sec">
                        {field.label}

                        {/* Si el campo tiene controller, lo renderizamos */}
                        {field.controller ? (
                            <Controller
                                control={field.controller.control}
                                name={field.name}
                                rules={field.controller.rules}
                                render={({ field: controllerField }) => (
                                    <select
                                        {...controllerField}
                                        className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                                        disabled={loading}
                                    >
                                        <option value="">{field.placeholder || "Selecciona una opción"}</option>
                                        {field.options?.map(opt => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        ) : field.type === "select" ? (
                            <select
                                {...field.register}
                                className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                                disabled={loading}
                            >
                                <option value="" disabled>{field.placeholder || "Selecciona una opción"}</option>
                                {field.options?.length > 0 ? (
                                    field.options.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No hay opciones disponibles</option>
                                )}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                                {...field.register}
                                disabled={loading}
                            />
                        )}

                        {field.error && <span className="text-sm text-error mt-1">{field.error}</span>}
                    </label>
                ))}

                <button
                    type="submit"
                    className="mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-secondary text-terc font-semibold hover:bg-primary hover:text-card transition transform hover:scale-105 shadow-md"
                    disabled={loading}
                >
                    <Plus size={20} />
                    {loading ? "Agregando..." : "Agregar"}
                </button>
            </form>
        </section>
    );
}

FormGenerico.propTypes = {
    titulo: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                })
            ),
            register: PropTypes.object,  // Ahora puede ser opcional si usamos controller
            controller: PropTypes.shape({
                control: PropTypes.object.isRequired,
                rules: PropTypes.object,
            }),
            error: PropTypes.string,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default FormGenerico;
