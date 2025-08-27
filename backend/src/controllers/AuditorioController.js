import mongoose from "mongoose";
import Auditorios from "../models/Auditorios.js";

// Crear auditorio
const crearAuditorio = async (req, res) => {
    const { cedula, capacidad } = req.body;

    if (Object.values(req.body).includes("")) 
        return res.status(400).json({ msg: "Completar todos los campos" });

    const auditorioBDD = await Auditorios.findOne({ cedula });
    if (auditorioBDD) return res.status(400).json({ msg: "Cédula ya existente" });

    if (Number(capacidad) <= 0) 
        return res.status(400).json({ msg: "Capacidad inválida" });

    try {
        const nuevoAuditorio = new Auditorios({
            ...req.body,
            usuario: req.usuarioBDD
        });

        await nuevoAuditorio.save();
        return res.status(200).json({ msg: "Creado correctamente el Auditorio", auditorio: nuevoAuditorio });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error con el servidor de Auditorio" });
    }
};

// Visualizar auditorio
const visualizarAuditorio = async (req, res) => {
    try {
        const auditorio = await Auditorios.findOne({ usuario: req.usuarioBDD })
            .select("-__v -createdAt -updatedAt -usuario");

        if (!auditorio) 
            return res.status(404).json({ msg: "No se encontraron auditorios para este usuario" });

        return res.status(200).json({ auditorio });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error con el servidor de Auditorio" });
    }
};

// Actualizar auditorio
const actualizarAuditorio = async (req, res) => {
    const { cedula, nombre, ubicacion, capacidad, descripcion } = req.body;
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) 
        return res.status(400).json({ msg: "ID no válido" });

    const auditorio = await Auditorios.findById(id);
    if (!auditorio) 
        return res.status(404).json({ msg: "Auditorio no encontrado" });

    // Verificar que el auditorio pertenece al usuario
    if (auditorio.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para actualizar este auditorio" });
    }

    // Verificar duplicado de cédula
    if (cedula) {
        const existeCedula = await Auditorios.findOne({ cedula, _id: { $ne: id } });
        if (existeCedula) return res.status(400).json({ msg: "Cédula ya se encuentra registrada" });
    }

    if (capacidad && Number(capacidad) <= 0) 
        return res.status(400).json({ msg: "Capacidad inválida" });

    try {
        // Actualización parcial
        auditorio.cedula = cedula ?? auditorio.cedula;
        auditorio.nombre = nombre ?? auditorio.nombre;
        auditorio.ubicacion = ubicacion ?? auditorio.ubicacion;
        auditorio.capacidad = capacidad ? Number(capacidad) : auditorio.capacidad;
        auditorio.descripcion = descripcion ?? auditorio.descripcion;

        await auditorio.save();
        return res.status(200).json({ msg: "Actualizado correctamente el Auditorio"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error con el servidor de Auditorio" });
    }
};

// Eliminar auditorio
const eliminarAuditorio = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) 
        return res.status(400).json({ msg: "ID no válido" });

    const auditorio = await Auditorios.findById(id);
    if (!auditorio) 
        return res.status(404).json({ msg: "Auditorio no encontrado" });

    // Verificar que el auditorio pertenece al usuario
    if (auditorio.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para eliminar este auditorio" });
    }

    try {
        await Auditorios.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Eliminado correctamente el Auditorio" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error con el servidor de Auditorio" });
    }
};

export {
    crearAuditorio,
    visualizarAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
};
