import Comentario from "./comentarios.model.js";
import Publicacion from "../publicacion/publicacion.model.js";

export const agregarComentario = async (req, res) => {
    try {
        const { usuario, contenidoComentario, publicacionId } = req.body;

        const nuevoComentario = new Comentario({
            usuario,
            contenidoComentario,
            publicacion: publicacionId,
        });

        await nuevoComentario.save();

        await Publicacion.findByIdAndUpdate(
            publicacionId,
            { $push: { comentarios: nuevoComentario._id } },
            { new: true }
        );

        const comentarioCompleto = await Comentario.findById(nuevoComentario._id)
            .populate('publicacion', 'tituloPublicacion');

        return res.status(201).json({
            success: true,
            message: "Comentario agregado correctamente",
            comentario: comentarioCompleto,
        });
    } catch (err) {
        return res.status(500).json({
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

export const editarPublicacion = async (req, res) => {
    try {
        const { publicacionId } = req.params;
        const { tituloPublicacion, contenidoPublicacion } = req.body;

        if (!tituloPublicacion || !contenidoPublicacion) {
            return res.status(400).json({
                success: false,
                message: "El título y el contenido de la publicación son obligatorios",
            });
        }

        const publicacionActualizada = await Publicacion.findByIdAndUpdate(
            publicacionId,
            { tituloPublicacion, contenidoPublicacion },
            { new: true }
        );

        if (!publicacionActualizada) {
            return res.status(404).json({
                success: false,
                message: "La publicación especificada no existe",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publicación editada correctamente",
            publicacion: publicacionActualizada,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al editar la publicación",
            error: err.message,
        });
    }
};

export const eliminarPublicacion = async (req, res) => {
    try {
        const { publicacionId } = req.params;

        const publicacionEliminada = await Publicacion.findByIdAndDelete(publicacionId);

        if (!publicacionEliminada) {
            return res.status(404).json({
                success: false,
                message: "La publicación especificada no existe",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente",
            publicacion: publicacionEliminada,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message,
        });
    }
};

export const verPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find().populate("comentarios", "contenidoComentario usuario _id");

        res.status(200).json({
            success: true,
            message: "Lista de publicaciones",
            publicaciones,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message,
        });
    }
};

