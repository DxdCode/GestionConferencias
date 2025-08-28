import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useConferencistas() {
    const { fetchDataBackend } = useFetch();
    const [conferencistas, setConferencistas] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Cargar todos los conferencistas
    const cargarConferencistas = async () => {
        if (!token) {
            toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
            setConferencistas([]);
            return;
        }
        setLoading(true);
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista`, {
                method: "GET",
                config: { headers },
            });
            // Asegura que siempre sea un array
            setConferencistas(Array.isArray(response.conferencista) ? response.conferencista : []);
        } catch (error) {
            console.error("Error en cargarConferencistas:", error.response?.data || error);
            toast.error(error.response?.data?.msg || "Error al cargar conferencistas");
            setConferencistas([]);
        } finally {
            setLoading(false);
        }
    };

    // Crear un conferencista
    const crearConferencistas = async (data, callback) => {
        if (!token) return toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        setLoading(true);
        try {
            // Validaciones básicas
            const requiredFields = ["nombre","apellido","cedula","genero","ciudad","direccion","fecha_nacimiento","telefono","email","empresa"];
            const missing = requiredFields.filter(f => !data[f] || (typeof data[f] === "string" && data[f].trim() === ""));
            if (missing.length > 0) throw new Error(`Faltan los campos: ${missing.join(", ")}`);

            if (!["masculino","femenino","otro"].includes(data.genero.toLowerCase())) throw new Error("Género inválido");
            if (isNaN(Date.parse(data.fecha_nacimiento))) throw new Error("Fecha de nacimiento inválida");

            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista`, {
                method: "POST",
                body: { ...data, fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString() },
                config: { headers },
            });

            await cargarConferencistas();
            if (callback) callback();
        } catch (error) {
            console.error("Error en crearConferencista:", error.response?.data || error);
            toast.error(error.response?.data?.msg || error.message || "Error al crear conferencista");
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un conferencista
    const actualizarConferencista = async (id, data) => {
        if (!token) return toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        setLoading(true);
        try {
            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista/${id}`, {
                method: "PUT",
                body: { ...data, fecha_nacimiento: data.fecha_nacimiento ? new Date(data.fecha_nacimiento).toISOString() : undefined },
                config: { headers },
            });
            await cargarConferencistas();
        } catch (error) {
            console.error("Error en actualizarConferencista:", error.response?.data || error);
            toast.error(error.response?.data?.msg || "Error al actualizar conferencista");
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un conferencista
    const eliminarConferencista = async (id) => {
        if (!token) return toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        if (!confirm("¿Seguro que deseas eliminar este conferencista?")) return;
        setLoading(true);
        try {
            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            await cargarConferencistas();
        } catch (error) {
            console.error("Error en eliminarConferencista:", error.response?.data || error);
            toast.error(error.response?.data?.msg || "Error al eliminar conferencista");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (token) cargarConferencistas(); }, []);

    return {
        conferencistas,
        loading,
        cargarConferencistas,
        crearConferencistas,
        actualizarConferencista,
        eliminarConferencista
    };
}
