import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connection = async() =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Conectado a la base de datos: ${connection.name}`)
    } catch (error) {
        console.log("Error al conectar",error)
        process.exit(1)
    }
}

export default connection