import jwt from 'jsonwebtoken';

const crearTokenJWT = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
const verificarTokenJWT = async(req,res,next) =>{
    const {authorization} = req.headers;
    const token = authorization?.split(' ')[1]
    if(!token) return res.status(401).json({msg:"No autorizado"});
    try {
        const {id} = jwt.verify(token,process.env.JWT_SECRET)
        req.usuarioBDD = id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg:"Token no valido"});
        
    }
}
export{
    crearTokenJWT,
    verificarTokenJWT
}