import { Schema, model } from "mongoose";

const PublicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    texto: {
        type: String,
        required: [true, "El texto es obligatorio"],
        maxLength: [250, "El texto no debe exceder los 250 caracteres"]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "La categoria es obligatoria"]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El autor es obligatorio"]
    },
    comentarios:[ {
        type: Schema.Types.ObjectId,
        ref: "Comentario",
    }],
    
}, {
    versionKey: false,
    timestamps: true
});

export default model("Publicacion", PublicacionSchema);