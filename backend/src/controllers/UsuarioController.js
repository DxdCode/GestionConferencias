import { crearTokenJWT } from "../middlewares/JWT.js";
import Usuarios from "../models/Usuarios.js";

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (Object.values(req.body).includes('')) return res.status(400).json({ msg: 'Todos los campos son obligatorios' })
        const usuarioBDD = await Usuarios.findOne({ email })
        if (!usuarioBDD) return res.status(400).json({ msg: "Correo no registrado" })

        const verificarPassword = await usuarioBDD.matchPassword(password)
        if (!verificarPassword) return res.status(400).json({ msg: "Contraseña es incorrecta" })

        const token = crearTokenJWT(usuarioBDD._id)

        res.status(200).json({ msg: "Login correcto", token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error con el servidor" })
    }

}
const crearUsuario = async (req, res) => {
    try {
        const {email,password} = req.body;
        const usuarioExistente = await Usuarios.findOne({email});
        if (usuarioExistente) return res.status(400).json({ msg: "El correo ya está registrado" });

        const nuevoUsuario = new Usuarios({...req.body});
        nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
        await nuevoUsuario.save();

        res.json({ msg: 'Usuario creado'});

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error con el servidor" })
    }
}

export{
    login,
    crearUsuario
}