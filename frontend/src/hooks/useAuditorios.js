import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useAuditorios() {
    const [loading, setLoading] = useState(false);
    const [auditorios, setAuditorios] = useState([]); // <-- array
    const { fetchDataBackend } = useFetch();

    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const cargarAuditorios = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`;
            const response = await fetchDataBackend(url, { method: "GET", config: { headers } });
            setAuditorios(Array.isArray(response.auditorio) ? response.auditorio : [response.auditorio]);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al cargar auditorios");
            setAuditorios([]);
        } finally {
            setLoading(false);
        }
    };

    const crearAuditorio = async (data, callback) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`;
            await fetchDataBackend(url, { method: "POST", body: data, config: { headers } });
            await cargarAuditorios();
            if (callback) callback();
            toast.success("Auditorio creado correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al crear auditorio");
        } finally {
            setLoading(false);
        }
    };

    const actualizarAuditorio = async (id, data) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`;
            await fetchDataBackend(url, { method: "PUT", body: data, config: { headers } });
            await cargarAuditorios();
            toast.success("Auditorio actualizado correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al actualizar auditorio");
        } finally {
            setLoading(false);
        }
    };

    const eliminarAuditorio = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este auditorio?")) return;
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`;
            await fetchDataBackend(url, { method: "DELETE", config: { headers } });
            await cargarAuditorios();
            toast.success("Auditorio eliminado correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar auditorio");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (token) cargarAuditorios(); }, []);

    return { auditorios, loading, cargarAuditorios, crearAuditorio, actualizarAuditorio, eliminarAuditorio };
}
