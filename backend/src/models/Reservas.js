import { model, Schema } from 'mongoose'

const reservaSchema = new Schema({
    codigo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    auditorios: [
        {
            type: Schema.Types.ObjectId,
            ref: "Auditorios",
            required: true,
        }
    ],
    conferencista: {
        type: Schema.Types.ObjectId,
        ref: "Conferencistas",
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    }
}, {
    timestamps: true
})

export default model("Reservas", reservaSchema)
