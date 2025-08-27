import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useAuditorio() {

    const [loading, setLoading] = useState(false)
    const [auditorio, setAuditorio] = useState([])
    const { fetchDataBackend } = useFetch();


    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener Adutorios
    const cargarAuditorios = async () => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`
            const response = await fetchDataBackend(url, {
                method: "GET",
                config: { headers }
            })
            setAuditorio(response)
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    // Crear Auditorio
    const crearAuditorio = async (data, callback) => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/auditorio`
            await fetchDataBackend(url, {
                method: "POST",
                body: data,
                config: { headers }
            })
            cargarAuditorios()

            if (callback) callback();

        } catch (error) {
            toast.error(error?.response?.data?.msg );
        } finally {
            setLoading(false);
        }
    };

    // Eliminar Auditorios
    const eliminarAuditorio = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este auditorio?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            cargarAuditorios();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }

    }
    // Actualizar Auditorio
    const actualizarAuditorio = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/auditorio/${id}`, {
                method: "PUT",
                body: data,
                config: { headers },
            });
            cargarAuditorios();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }
    }
    useEffect(() => {
        cargarAuditorios();
    }, []);

    return { auditorio, loading, cargarAuditorios, crearAuditorio, eliminarAuditorio, actualizarAuditorio }
}
