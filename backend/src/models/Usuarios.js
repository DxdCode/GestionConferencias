import { model, Schema } from 'mongoose';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    apellido: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true
})

export default model("Usuarios", usuarioSchema)