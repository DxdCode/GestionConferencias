import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useReserva() {

    const [loading, setLoading] = useState(false)
    const [reserva, setReserva] = useState([])
    const { fetchDataBackend } = useFetch();


    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener Reservas
    const cargarReservas = async () => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/reserva`
            const response = await fetchDataBackend(url, {
                method: "GET",
                config: { headers }
            })
            setReserva(response)
            console.log(response)

        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    // Crear reserva
    const crearReserva = async (data, callback) => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/reserva`
            await fetchDataBackend(url, {
                method: "POST",
                body: data,
                config: { headers }
            })
            cargarReservas()

            if (callback) callback();

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar Reserva
    const eliminarReserva = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta reserva?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/reserva/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            cargarReservas();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }

    }
    // Actualizar Reservas

    const actualizarReserva = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/reserva/${id}`, {
                method: "PUT",
                body: data,
                config: { headers },
            });
            cargarReservas();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }
    }
    useEffect(() => {
        cargarReservas();
    }, []);

    return { reserva, loading, cargarReservas, crearReserva, eliminarReserva, actualizarReserva }
}
