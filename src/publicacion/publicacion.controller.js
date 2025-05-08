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
                message: "No se encontró el curso",
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

export const filtrarPorTitulo = async (req, res) => {
    try {
        const { titulo } = req.query;

        if (!titulo) {
            return res.status(400).json({
                success: false,
                message: "No se encontro el titulo",
            });
        }

        const publicaciones = await Publicacion.find({ tituloPublicacion: { $regex: titulo, $options: "i" } });

        return res.status(200).json({
            success: true,
            total: publicaciones.length,
            publicaciones,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al filtrar las publicaciones por título",
            error: err.message,
        });
    }
};

export const filtrarPorFechas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({
                success: false,
                message: "Los parámetros 'fechaInicio' y 'fechaFin' son obligatorios",
            });
        }

        const fechaInicioObj = new Date(fechaInicio);
        fechaInicioObj.setHours(0, 0, 0, 0); 

        const fechaFinObj = new Date(fechaFin);
        fechaFinObj.setHours(23, 59, 59, 999); 

        const publicaciones = await Publicacion.find({
            fechaPublicacion: {
                $gte: fechaInicioObj,
                $lte: fechaFinObj,
            },
        });

        return res.status(200).json({
            success: true,
            total: publicaciones.length,
            publicaciones,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Error al filtrar las publicaciones por fechas",
            error: err.message,
        });
    }
};