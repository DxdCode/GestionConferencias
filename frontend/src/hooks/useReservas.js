import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useReservas() {
    const [loading, setLoading] = useState(false);
    const [reservas, setReservas] = useState([]);
    const { fetchDataBackend } = useFetch();

    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Validar ObjectId de Mongo
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    // Cargar reservas
    const cargarReservas = async () => {
        if (!token) return setReservas([]);
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/reserva`;
            const response = await fetchDataBackend(url, { method: "GET", config: { headers } });
            setReservas(Array.isArray(response.reservas) ? response.reservas : []);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al cargar reservas");
            setReservas([]);
        } finally {
            setLoading(false);
        }
    };

    // Crear reserva
    const crearReserva = async (data, callback) => {
        setLoading(true);
        try {
            // Validar campos
            const requiredFields = ["auditorios", "Conferencistas", "fecha", "horaInicio", "horaFin", "descripcion"];
            const missingFields = requiredFields.filter(field => {
                if (field === "fecha") return !data[field] || isNaN(Date.parse(data[field]));
                if (field === "auditorios" || field === "Conferencistas") return !isValidObjectId(data[field]);
                return !data[field] || data[field].toString().trim() === "";
            });

            if (missingFields.length > 0) throw new Error(`Faltan o son inválidos los siguientes campos: ${missingFields.join(", ")}`);

            // Convertir fecha a ISO
            const payload = { ...data, fecha: new Date(data.fecha).toISOString() };

            const url = `${import.meta.env.VITE_URL_BACKEND}/reserva`;
            await fetchDataBackend(url, { method: "POST", body: payload, config: { headers } });

            await cargarReservas();
            if (callback) callback();
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message || "Error al crear reserva");
            console.error("Error en crearReserva:", error);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar reserva
    const eliminarReserva = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta reserva?")) return;
        try {
            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/reserva/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            await cargarReservas();
        } catch (error) {
            console.error("Error en eliminarReserva:", error.response?.data || error);
            throw error; // Re-lanzamos para que el componente lo capture
        }
    };

    // Actualizar reserva
    const actualizarReserva = async (id, data) => {
        if (!isValidObjectId(id)) return toast.error("ID de reserva no válido");
        try {
            const payload = { ...data, fecha: data.fecha ? new Date(data.fecha).toISOString() : undefined };
            await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/reserva/${id}`, { method: "PUT", body: payload, config: { headers } });
            await cargarReservas();
            toast.success("Reserva actualizada correctamente");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al actualizar reserva");
        }
    };

    useEffect(() => { if (token) cargarReservas(); }, []);

    return { reservas, loading, cargarReservas, crearReserva, eliminarReserva, actualizarReserva };
}
