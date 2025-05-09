import { Router } from "express";
import { agregarPublicacion, listarPublicaciones, filtrarPorCurso, filtrarPorTitulo, filtrarPorFechas } from "./publicacion.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Agregar una nueva publicación
 *     description: Permite agregar una nueva publicación al sistema. Solo usuarios con rol de administrador pueden usar este endpoint.
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
 *                 description: Curso relacionado con la publicación
 *             required:
 *               - titulo
 *               - contenido
 *               - curso
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       403:
 *         description: No autorizado
 */
router.post("/agregarPublicacion", agregarPublicacion);

/**
 * @swagger
 * /listarPublicaciones:
 *   get:
 *     summary: Listar todas las publicaciones
 *     description: Devuelve una lista de todas las publicaciones disponibles.
 *     tags:
 *       - Publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/listarPublicaciones", listarPublicaciones);

/**
 * @swagger
 * /filtrarPorCurso:
 *   get:
 *     summary: Filtrar publicaciones por curso
 *     description: Devuelve las publicaciones relacionadas con un curso específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: curso
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del curso para filtrar
 *     responses:
 *       200:
 *         description: Publicaciones filtradas exitosamente
 *       400:
 *         description: Parámetro de curso faltante o inválido
 */
router.get("/filtrarPorCurso", filtrarPorCurso);

/**
 * @swagger
 * /filtrarPorTitulo:
 *   get:
 *     summary: Filtrar publicaciones por título
 *     description: Devuelve las publicaciones que coinciden con un título específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *         description: Título para filtrar
 *     responses:
 *       200:
 *         description: Publicaciones filtradas exitosamente
 *       400:
 *         description: Parámetro de título faltante o inválido
 */
router.get("/filtrarPorTitulo", filtrarPorTitulo);

/**
 * @swagger
 * /filtrarPorFechas:
 *   get:
 *     summary: Filtrar publicaciones por rango de fechas
 *     description: Devuelve las publicaciones dentro de un rango de fechas específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del rango (YYYY-MM-DD)
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del rango (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Publicaciones filtradas exitosamente
 *       400:
 *         description: Parámetros de fecha faltantes o inválidos
 */
router.get("/filtrarPorFechas", filtrarPorFechas);

export default router;