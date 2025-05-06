import {Schema, model} from 'mongoose';

const PublicacionSchema = Schema({
    tituloPublicacion: {
        type: String,
        required: [true, 'El titulo de la publicacion es obligatorio'],
        maxlength: [100, "El titulo no debe superar los 100 caracteres"],
    },
    descripcionPublicacion: {
        type: String,
        required: [true, 'La descripcion de la publicacion es obligatoria'],
        maxlength: [500, "La descripcion no debe superar los 500 caracteres"],
    },
    cursoPublicacion: {
        type: String,
        required: [true, 'El curso de la publicacion es obligatorio'],
        enum: ['Practica-Supervisada', 'Tecnologia III', 'Taller III'],
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
    versionKey: false,
})

export default model('Publicacion', PublicacionSchema);