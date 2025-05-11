import { Router } from "express";
import { agregarPublicacion, listarPublicaciones, listarPublicacionesID, filtrarPorCurso, filtrarPorTitulo, filtrarPorFechas } from "./publicacion.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Agregar una nueva publicación
 *     description: Permite a un usuario autenticado agregar una publicación.
 *     tags:
 *       - Publicaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *               curso:
 *                 type: string
 *                 description: Curso relacionado
 *             required:
 *               - titulo
 *               - contenido
 *               - curso
 *           example:
 *             titulo: "Mi publicación"
 *             contenido: "Este es el contenido de la publicación."
 *             curso: "Matemáticas"
 *     responses:
 *       201:
 *         description: Publicación agregada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado. Se requiere autenticación
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 */
router.post("/agregarPublicacion", agregarPublicacion);

/**
 * @swagger
 * /listarPublicaciones:
 *   get:
 *     summary: Listar todas las publicaciones
 *     description: Obtiene una lista de todas las publicaciones disponibles.
 *     tags:
 *       - Publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *       401:
 *         description: No autorizado
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get("/listarPublicaciones", listarPublicaciones);

/**
 * @swagger
 * /listarPublicaciones/{id}:
 *   get:
 *     summary: Obtener publicación por ID
 *     description: Obtiene una publicación específica por su ID.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación encontrada exitosamente
 *       404:
 *         description: Publicación no encontrada
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get("/listarPublicaciones/:id", listarPublicacionesID);

/**
 * @swagger
 * /filtrarPorCurso:
 *   get:
 *     summary: Filtrar publicaciones por curso
 *     description: Obtiene publicaciones filtradas por el nombre del curso.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: curso
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del curso
 *     responses:
 *       200:
 *         description: Publicaciones filtradas por curso obtenidas exitosamente
 *       400:
 *         description: Parámetro de curso faltante o inválido
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get('/filtrarPorCurso', filtrarPorCurso);

/**
 * @swagger
 * /filtrarPorTitulo:
 *   get:
 *     summary: Filtrar publicaciones por título
 *     description: Obtiene publicaciones filtradas por el título.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la publicación
 *     responses:
 *       200:
 *         description: Publicaciones filtradas por título obtenidas exitosamente
 *       400:
 *         description: Parámetro de título faltante o inválido
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get("/filtrarPorTitulo", filtrarPorTitulo);

/**
 * @swagger
 * /filtrarPorFechas:
 *   get:
 *     summary: Filtrar publicaciones por fechas
 *     description: Obtiene publicaciones filtradas por un rango de fechas.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio (YYYY-MM-DD)
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Publicaciones filtradas por fechas obtenidas exitosamente
 *       400:
 *         description: Parámetros de fechas faltantes o inválidos
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get("/filtrarPorFechas", filtrarPorFechas);

export default router;