import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useAuditorios() {
    const [loading, setLoading] = useState(false);
    const [auditorio, setAuditorio] = useState(null); // Cambiado a null para reflejar un solo objeto
    const { fetchDataBackend } = useFetch();

    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener Auditorio
    const cargarAuditorios = async () => {
        if (!token) {
            toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
            return;
        }
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`;
            const response = await fetchDataBackend(url, {
                method: "GET",
                config: { headers },
            });
            console.log("Respuesta del backend:", response); // Depuración
            setAuditorio(response.auditorio || null);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al cargar auditorio");
            console.error("Error en cargarAuditorios:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    // Crear Auditorio
    const crearAuditorio = async (data, callback) => {
        if (!token) {
            toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
            return;
        }
        setLoading(true);
        try {
            const requiredFields = ["cedula", "nombre", "ubicacion", "capacidad", "descripcion"];
            const missingFields = requiredFields.filter((field) => {
                if (field === "capacidad") {
                    return data[field] === undefined || data[field] === null || isNaN(data[field]) || data[field] <= 0;
                }
                return !data[field] || (typeof data[field] === "string" && data[field].trim() === "");
            });
            if (missingFields.length > 0) {
                throw new Error(`Faltan o son inválidos los siguientes campos: ${missingFields.join(", ")}`);
            }
            console.log("Datos enviados en crearAuditorio:", data); // Depuración
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`;
            await fetchDataBackend(url, {
                method: "POST",
                body: {
                    ...data,
                    capacidad: Number(data.capacidad), // Asegura que sea número
                },
                config: { headers },
            });
            await cargarAuditorios();
            if (callback) callback();
        } catch (error) {
            console.error("Error en crearAuditorio:", error.response?.data || error);
            toast.error(error.response?.data?.msg || error.message || "Error al crear auditorio");
        } finally {
            setLoading(false);
        }
    };

    // Eliminar Auditorio
    const eliminarAuditorio = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este auditorio?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            await cargarAuditorios();
            toast.success(response.data?.msg || "Auditorio eliminado correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar auditorio");
            console.error("Error en eliminarAuditorio:", error.response?.data || error);
        }
    };

    // Actualizar Auditorio
    const actualizarAuditorio = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`, {
                method: "PUT",
                body: {
                    ...data,
                    capacidad: Number(data.capacidad), // Asegura que sea número
                },
                config: { headers },
            });
            await cargarAuditorios();
            toast.success(response.data?.msg || "Auditorio actualizado correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al actualizar auditorio");
            console.error("Error en actualizarAuditorio:", error.response?.data || error);
        }
    };

    useEffect(() => {
        if (token) cargarAuditorios();
    }, []);

    return { auditorio, loading, cargarAuditorios, crearAuditorio, eliminarAuditorio, actualizarAuditorio };
}