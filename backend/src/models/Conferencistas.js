import { model, Schema } from 'mongoose';

const conferencistaSchema = new Schema({
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
    cedula: {
        type: String,
        trim: true,
        required: true,
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        required: true,
    },
    ciudad: {
        type: String,
        trim: true,
        required: true,
    },
    direccion: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    telefono: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    empresa: {
        type: String,
        trim: true,
        required: true,
    }
},{
    timestamps: true
})

export default model("Conferencistas", conferencistaSchema)