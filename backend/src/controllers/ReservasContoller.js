import Reservas from "../models/Reservas.js"

const crearReserva = async (req, res) => {
    const { codigo ,auditorios, conferencistas} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Llenar todo los campos" })
    const reservaExiste = await Reservas.findOne({ codigo })
    if (reservaExiste) return res.status(400).json({ msg: "Código ya existente" })
    try {
        const nuevaReserva = new Reservas({ ...req.body, usuario: req.usuarioBDD })
        await nuevaReserva.save()
        return res.status(201).json({ msg: "Creado correctamente la Reserva" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor de Reserva" })
    }
}

const visualizarReservas = async (req, res) => {
    try {
        const reservas = await Reservas.find()
            .populate("auditorios", "-createdAt -updatedAt -__v -usuario")
            .populate("Conferencistas", "-createdAt -updatedAt -__v -usuario");

        return res.status(200).json({ reservas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error en el servidor de Reservas" });
    }
};


const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, auditorios, Conferencistas } = req.body;

    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({ msg: "ID no válido" });

    try {
        const reserva = await Reservas.findById(id);
        if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });

        const existe = await Reservas.findOne({ codigo, _id: { $ne: id } });
        if (existe)
            return res.status(400).json({ msg: "Ya existe una reserva con ese código" });

        reserva.codigo = codigo ?? reserva.codigo;
        reserva.descripcion = descripcion ?? reserva.descripcion;
        reserva.auditorios = auditorios ?? reserva.auditorios;
        reserva.Conferencistas = Conferencistas ?? reserva.Conferencistas;

        await reserva.save();

        return res.status(200).json({ msg: "Reserva actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error en el servidor de Reservas" });
    }
};


const eliminarReserva = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({ msg: "ID no válido" });

    const reserva = await Reservas.findById(id);
    if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });
    try {

        await Reservas.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Reserva eliminada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error en el servidor de Reservas" });
    }
};


export{
    crearReserva,
    visualizarReservas,
    actualizarReserva,
    eliminarReserva
}