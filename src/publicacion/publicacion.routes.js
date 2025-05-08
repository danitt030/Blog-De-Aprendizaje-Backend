import { Router } from "express";
import { agregarPublicacion, listarPublicaciones, filtrarPorCurso, filtrarPorTitulo, filtrarPorFechas } from "./publicacion.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Agrega una nueva publicación.
 *     description: Este endpoint permite agregar una nueva publicación. Solo usuarios con el rol de administrador pueden usarlo.
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
 *                 description: Título de la publicación.
 *                 example: "Introducción a Node.js"
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación.
 *                 example: "Node.js es un entorno de ejecución para JavaScript..."
 *               cursoId:
 *                 type: integer
 *                 description: ID del curso relacionado con la publicación.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       403:
 *         description: Acceso denegado. Solo administradores pueden usar este endpoint.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/agregarPublicacion", agregarPublicacion);

/**
 * @swagger
 * /listarPublicaciones:
 *   get:
 *     summary: Lista todas las publicaciones.
 *     description: Este endpoint devuelve una lista de todas las publicaciones disponibles.
 *     tags:
 *       - Publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la publicación.
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación.
 *                     example: "Introducción a Node.js"
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación.
 *                     example: "Node.js es un entorno de ejecución para JavaScript..."
 *                   cursoId:
 *                     type: integer
 *                     description: ID del curso relacionado.
 *                     example: 1
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/listarPublicaciones", listarPublicaciones);

/**
 * @swagger
 * /filtrarPorCurso:
 *   get:
 *     summary: Filtra publicaciones por curso.
 *     description: Este endpoint permite filtrar las publicaciones relacionadas con un curso específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso para filtrar las publicaciones.
 *         example: 1
 *     responses:
 *       200:
 *         description: Publicaciones filtradas obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la publicación.
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación.
 *                     example: "Introducción a Node.js"
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación.
 *                     example: "Node.js es un entorno de ejecución para JavaScript..."
 *                   cursoId:
 *                     type: integer
 *                     description: ID del curso relacionado.
 *                     example: 1
 *       400:
 *         description: Falta el parámetro cursoId o es inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/filtrarPorCurso", filtrarPorCurso);

/**
 * @swagger
 * /filtrarPorTitulo:
 *   get:
 *     summary: Filtra publicaciones por título.
 *     description: Este endpoint permite filtrar las publicaciones que coincidan parcial o totalmente con un título específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *         description: Palabra clave para buscar en los títulos de las publicaciones.
 *         example: "Node.js"
 *     responses:
 *       200:
 *         description: Publicaciones filtradas obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 publicaciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tituloPublicacion:
 *                         type: string
 *                         example: "Introducción a Node.js"
 *                       descripcionPublicacion:
 *                         type: string
 *                         example: "Node.js es un entorno de ejecución para JavaScript..."
 *                       cursoPublicacion:
 *                         type: string
 *                         example: "Tecnología III"
 *                       fechaPublicacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-06T03:16:40.649+00:00"
 *       400:
 *         description: Falta el parámetro 'titulo'.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/filtrarPorTitulo", filtrarPorTitulo);

/**
 * @swagger
 * /filtrarPorFechas:
 *   get:
 *     summary: Filtra publicaciones por rango de fechas.
 *     description: Este endpoint permite filtrar las publicaciones que se encuentren dentro de un rango de fechas específico.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del rango (formato YYYY-MM-DD).
 *         example: 2025-05-01
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del rango (formato YYYY-MM-DD).
 *         example: 2025-05-08
 *     responses:
 *       200:
 *         description: Publicaciones filtradas obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 publicaciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tituloPublicacion:
 *                         type: string
 *                         example: "Introducción a Node.js"
 *                       descripcionPublicacion:
 *                         type: string
 *                         example: "Node.js es un entorno de ejecución para JavaScript..."
 *                       cursoPublicacion:
 *                         type: string
 *                         example: "Tecnología III"
 *                       fechaPublicacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-06T03:16:40.649+00:00"
 *       400:
 *         description: Falta uno o ambos parámetros de fecha.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/filtrarPorFechas", filtrarPorFechas);

export default router;