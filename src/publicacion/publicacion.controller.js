import Publicacion from './publicacion.model.js';

export const agregarPublicacion = async (req, res) => {
    try {
        const datos = req.body;
        const publicacion = await Publicacion.create(datos);
        res.status(200).json({
            message: "La publicación se ha agregado correctamente",
            publicacion,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar la publicación",
            error: err.message,
        });
    }
}

export const listarPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find()
            .populate({
                path: "comentarios",
                select: "contenidoComentario usuario _id",
            });

        res.status(200).json({
            message: "Lista de publicaciones",
            publicaciones,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las publicaciones",
            error: err.message,
        });
    }
};

export const filtrarPorCurso = async (req, res) => {
    try {
        const { curso } = req.query;

        if (!curso) {
            return res.status(400).json({
                success: false,
                message: "El parámetro 'curso' es obligatorio",
            });
        }

        const publicaciones = await Publicacion.find({ cursoPublicacion: curso });

        return res.status(200).json({
            success: true,
            total: publicaciones.length,
            publicaciones,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al filtrar las publicaciones por curso",
            error: err.message,
        });
    }
};

