import { Schema, model } from 'mongoose';

const ComentariosSchema = Schema({
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        maxlength: [100, "El usuario no debe superar los 100 caracteres"],
    },
    contenidoComentario: {
        type: String,
        required: [true, 'El contenido del comentario es obligatorio'],
        maxlength: [500, "El contenido no debe superar los 500 caracteres"],
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    fechaComentario: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Comentario", ComentariosSchema);