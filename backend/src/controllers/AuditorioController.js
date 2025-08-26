import Auditorios from "../models/Auditorios"

const crearAuditorio = async (req,res) =>{
    const {cedula} = req.body

    const auditorioBDD = await Auditorios.findOne({cedula})
    if(auditorioBDD) return res.status(400).json({msg:"Cédula ya existente"})
}


const visualizarAuditorio = async (req,res) =>{
    
}


const actualizarAuditorio = async (req,res) =>{
    
}

const eliminarAuditorio = async (req,res) =>{

}