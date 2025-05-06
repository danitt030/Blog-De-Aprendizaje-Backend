import Comentario from "./comentarios.model.js";
import Publicacion from "../publicacion/publicacion.model.js";

export const agregarComentario = async (req, res) => {
    try {
        const { usuario, contenidoComentario } = req.body;

        const { uidPublic } = req.params;

        if (!uidPublic) {
            return res.status(400).json({
                success: false,
                message: "El ID de la publicación es obligatorio",
            });
        }

        if (!usuario) {
            return res.status(400).json({
                success: false,
                message: "El nombre del usuario es obligatorio",
            });
        }

        const publicacionExistente = await Publicacion.findById(uidPublic);

        if (!publicacionExistente) {
            return res.status(404).json({
                success: false,
                message: "La publicación especificada no existe",
            });
        }

        const nuevoComentario = new Comentario({
            usuario,
            contenidoComentario,
            publicacion: uidPublic,
        });

        await nuevoComentario.save();

        await Publicacion.findByIdAndUpdate(
            uidPublic,
            { $push: { comentarios: nuevoComentario._id } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Comentario agregado correctamente",
            comentario: nuevoComentario,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message,
        });
    }
};

export const editarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const { contenidoComentario } = req.body;

        if (!contenidoComentario) {
            return res.status(400).json({
                success: false,
                message: "El contenido del comentario es obligatorio",
            });
        }

        const comentarioActualizado = await Comentario.findByIdAndUpdate(
            comentarioId,
            { contenidoComentario },
            { new: true }
        );

        if (!comentarioActualizado) {
            return res.status(404).json({
                success: false,
                message: "El comentario especificado no existe",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario editado correctamente",
            comentario: comentarioActualizado,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al editar el comentario",
            error: err.message,
        });
    }
};

export const eliminarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;

        const comentarioEliminado = await Comentario.findByIdAndDelete(comentarioId);

        if (!comentarioEliminado) {
            return res.status(404).json({
                success: false,
                message: "El comentario especificado no existe",
            });
        }

        await Publicacion.findByIdAndUpdate(
            comentarioEliminado.publicacion,
            { $pull: { comentarios: comentarioId } }
        );

        res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente",
            comentario: comentarioEliminado,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message,
        });
    }
};

export const verComentariosDePublicacion = async (req, res) => {
    try {
        const { uidPublic } = req.params;

        const publicacion = await Publicacion.findById(uidPublic).populate({
            path: "comentarios",
            select: "contenidoComentario usuario _id createdAt updatedAt",
        });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "La publicación especificada no existe",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentarios de la publicación",
            comentarios: publicacion.comentarios,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios de la publicación",
            error: err.message,
        });
    }
};

