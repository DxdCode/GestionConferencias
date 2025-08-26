import { model, Schema } from 'mongoose';

const auditorioSchema = new Schema({
    cedula: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    ubicacion: {
        type: String,
        trim: true,
        required: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required:true
    }

})

export default model("Auditorios", auditorioSchema)
