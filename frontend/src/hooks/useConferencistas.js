import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useConferencistas() {
    const { fetchDataBackend } = useFetch();
    const [conferencistas, setConferencistas] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = JSON.parese(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener Conferencistas
    const cargarConferencistas = async () => {
        setLoading(true);
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista`, {
                method: "GET",
                config: { headers },
            });
            setConferencistas(response);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Crear Conferencista
    const crearConferencistas = async (data, callback) => {
        setLoading(true);
        try {
            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista`, {
                method: "POST",
                body: data,
                config: { headers },
            });

            cargarConferencistas();

            if (callback) callback();

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    };

    //Eliminar Conferencista
    const eliminarConferencistas = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este conferencista?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            cargarConferencistas();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }
    };

    // Actualizar Conferencista
    const actualizarConferencistas = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/conferencista/${id}`, {
                method: "PUT",
                body: data,
                config: { headers },
            });
            cargarConferencistas();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }


        useEffect(() => {
            cargarConferencistas();
        }, []);

        return { conferencistas, loading, cargarConferencistas, crearConferencistas, eliminarConferencistas, actualizarConferencistas };
    };

}

