import Conferencistas from "../models/Conferencistas"
import Conferencistas from "../models/Conferencistas"
import Conferencistas from "../models/Conferencistas"

const crearConferencista = async (req, res) => {
    const { cedula, genero, telefono, email } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Llenar todo los campos" })
    const conferencista = await Conferencistas.findOne({ $or: [{ cedula }, { telefono }, { email }] })
    if (conferencista) {
        if (conferencista.cedula === cedula) return res.status(400).json({ msg: "Cédula ya registrada" })
        if (conferencista.telefono === telefono) return res.status(400).json({ msg: "Telefono ya registrada" })
        if (conferencista.email === email) return res.status(400).json({ msg: "Email ya registrada" })

    }
    const generos = genero?.toLowerCase();
    if (!['masculino', 'femenino', 'otro'].includes(generos))
        return res.status(400).json({ msg: "Género inválido" });

    try {
        const nuevoConferencista = new Conferencistas({ ...req.body, usuario: req.usuarioBDD })
        await nuevoConferencista.save()
        return res.status(200).json({ msg: "Conferencista creado correctamente"});


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor de Conferencista" })
    }
}



const visualizarConferencista = async (req, res) => {
    const Conferencistas = await Conferencistas.create()
}



const actualizarConferencista = async (req, res) => {

}


const eliminarConferencista = async (req, res) => {

}

export {
    crearConferencista,
    visualizarConferencista,
    actualizarConferencista,
    eliminarConferencista
}