import mongoose from "mongoose";
import Conferencistas from "../models/Conferencistas.js";
import Auditorios from "../models/Auditorios.js";
import Reservas from "../models/Reservas.js";

const crearReserva = async (req, res) => {
    const { codigo, descripcion, conferencista, auditorios } = req.body;

    // Validaciones
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!mongoose.isValidObjectId(conferencista)) {
        return res.status(400).json({ msg: "ID de conferencista no válido" });
    }

    if (!Array.isArray(auditorios) || auditorios.length === 0) {
        return res.status(400).json({ msg: "Debe agregar al menos un auditorio" });
    }

    // Verificar si el código ya existe
    const existeCodigo = await Reservas.findOne({ codigo });
    if (existeCodigo) {
        return res.status(400).json({ msg: "El código de la reserva ya está en uso" });
    }

    // Validar conferencista
    const conferencistaBDD = await Conferencistas.findById(conferencista);
    if (!conferencistaBDD) {
        return res.status(404).json({ msg: "Conferencista no encontrado" });
    }

    // Validar auditorios
    const auditoriosValidos = [];
    for (const auditorioID of auditorios) {
        if (!mongoose.isValidObjectId(auditorioID)) {
            return res.status(400).json({ msg: "ID de auditorio no válido" });
        }

        const auditorioBDD = await Auditorios.findById(auditorioID);
        if (!auditorioBDD) {
            return res.status(404).json({ msg: "Auditorio no encontrado" });
        }
        if (auditoriosValidos.includes(auditorioID)) {
            return res.status(400).json({ msg: "No puedes reservar el mismo auditorio" });

        }
        auditoriosValidos.push(auditorioID);

    }

    try {
        const nuevaReserva = new Reservas({
            codigo,
            descripcion,
            conferencista,
            auditorios: auditoriosValidos,
            usuario: req.usuarioBDD,
        });

        await nuevaReserva.save();
        return res.status(201).json({ msg: "Reserva creada correctamente", reserva: nuevaReserva });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor al crear la reserva" });
    }
};

const visualizarReservas = async (req, res) => {
    try {
        const reservas = await Reservas.find({ usuario: req.usuarioBDD })
            .populate("conferencista", "nombre cedula telefono")
            .populate("auditorios", "nombre capacidad ubicacion")
            .select("-__v -createdAt -updatedAt");

        return res.status(200).json(reservas);
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al obtener las reservas" });
    }
};

const visualizarUnaReserva = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de reserva no válido" });
    }


    try {
        const reserva = await Reservas.findById(id)
            .populate("conferencista", "nombre cedula telefono")
            .populate("auditorios", "nombre capacidad ubicacion")
            .select("-__v -createdAt -updatedAt");

        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }

        return res.status(200).json(reserva);
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al obtener la reserva" });
    }
}

const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, auditorios } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de reserva no válido" });
    }

    const reserva = await Reservas.findById(id);
    if (!reserva) {
        return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    if (reserva.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para editar esta reserva" });
    }

    // Verificar si el código ya existe
    const existeCodigo = await Reservas.findOne({ codigo, _id: { $ne: id } });
    if (existeCodigo) {
        return res.status(400).json({ msg: `El código ${codigo} ya está en uso` });
    }

    // Validar auditorios
    const auditoriosValidos = [];
    for (const auditorioID of auditorios) {
        if (!mongoose.isValidObjectId(auditorioID)) {
            return res.status(400).json({ msg: `ID de auditorio no válido: ${auditorioID}` });
        }

        const auditorioBDD = await Auditorios.findById(auditorioID);
        if (!auditorioBDD) {
            return res.status(404).json({ msg: `Auditorio no encontrado: ${auditorioID}` });
        }

        if (!auditoriosValidos.includes(auditorioID)) {
            auditoriosValidos.push(auditorioID);
        }
    }

    try {
        reserva.codigo = codigo ?? reserva.codigo;
        reserva.descripcion = descripcion ?? reserva.descripcion;
        reserva.auditorios = auditoriosValidos;

        await reserva.save();
        return res.status(200).json({ msg: "Reserva actualizada correctamente", reserva });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al actualizar la reserva" });
    }
};

const eliminarReserva = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de reserva no válido" });
    }

    const reserva = await Reservas.findById(id);
    if (!reserva) {
        return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    if (reserva.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para eliminar esta reserva" });
    }

    try {
        await Reservas.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Reserva eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al eliminar la reserva" });
    }
};

export {
    crearReserva,
    visualizarReservas,
    visualizarUnaReserva,
    actualizarReserva,
    eliminarReserva,
};
