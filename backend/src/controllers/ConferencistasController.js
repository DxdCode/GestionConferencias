import mongoose from "mongoose"
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
        return res.status(201).json({ msg: "Creado correctamente el Conferencista" });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor de Conferencista" })
    }
}



const visualizarConferencista = async (req, res) => {
    try {
        const conferencista = await Conferencistas.find({ usuario: req.usuarioBDD }).select("-createdAt -updatedAt -__v -usuario")
        return res.status(200).json({ conferencista })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor de Conferencista" })
    }
}



const actualizarConferencista = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, cedula, genero, ciudad, direccion, fecha_nacimiento, telefono, email, empresa } = req.body

    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ msg: "ID no válido" });
    const conferencista = await Conferencistas.findById(id)
    if(!conferencista) return res.status(400).json({msg:"Conferencista no encontrado"})
    const existeValor = await Conferencistas.findOne({ _id: { $ne: id }, $or: [{ cedula }, { telefono }, { email }] })

    if (existeValor) {
        if (existeValor.cedula === cedula) return res.status(400).json({ msg: "Ya existe  esa cédula" })
        if (existeValor.telefono === telefono) return res.status(400).json({ msg: "Ya existe  esa teléfono" })
        if (existeValor.email === email) return res.status(400).json({ msg: "Ya existe  esa correo" })
    }
    const generos = genero?.toLowerCase();
    if (!['masculino', 'femenino', 'otro'].includes(generos))
        return res.status(400).json({ msg: "Género inválido" });

    try {
        conferencista.nombre = nombre ?? conferencista.nombre
        conferencista.apellido = apellido ?? conferencista.apellido
        conferencista.cedula = cedula ?? conferencista.cedula
        conferencista.genero = genero ?? conferencista.genero
        conferencista.ciudad = ciudad ?? conferencista.ciudad
        conferencista.direccion = direccion ?? conferencista.direccion
        conferencista.fecha_nacimiento = fecha_nacimiento ?? conferencista.fecha_nacimiento
        conferencista.telefono = telefono ?? conferencista.telefono
        conferencista.email = email ?? conferencista.email
        conferencista.empresa = empresa ?? conferencista.empresa

        await conferencista.save()
        return res.status(200).json({ msg: "Actualizado correctamente el Conferencista"});


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor de Conferencista" })
    }

}


const eliminarConferencista = async (req, res) => {
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ msg: "ID no válido" });

    const conferencista = await Conferencistas.findById(id)
    if(!conferencista) return res.status(400).json({msg:"Conferencista no encontrado"});

    try {
        await Conferencistas.findByIdAndDelete(id);
        return res.status(200).json({msg:"Eliminado correctamente el Conferencista"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error con el servidor de Conferencista" });
    }

}

export {
    crearConferencista,
    visualizarConferencista,
    actualizarConferencista,
    eliminarConferencista
}