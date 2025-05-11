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
        const publicaciones = await Publicacion.find().populate("comentarios");

        return res.status(200).json({
            success: true,
            message: "Publicaciones obtenidas correctamente",
            publicaciones,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message,
        });
    }
};

export const listarPublicacionesID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "El ID de la publicación es obligatorio",
            });
        }

        const publicacion = await Publicacion.findById(id).populate("comentarios");

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "No se encontró la publicación con el ID proporcionado",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Publicación obtenida correctamente",
            publicacion,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
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

        const publicaciones = await Publicacion.find({ cursoPublicacion: curso }).populate("comentarios");

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
                message: "No se encontró el título",
            });
        }

        const publicaciones = await Publicacion.find({ tituloPublicacion: { $regex: titulo, $options: "i" } })
            .populate("comentarios");

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
        }).populate("comentarios");

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