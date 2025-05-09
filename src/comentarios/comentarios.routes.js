import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario, verComentariosDePublicacion } from "./comentarios.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarcomentarios:
 *   post:
 *     summary: Agregar un nuevo comentario
 *     description: Permite agregar un comentario a una publicación específica. Cualquier usuario autenticado puede usar este endpoint.
 *     tags:
 *       - Comentarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *                 description: Contenido del comentario
 *               uidPublic:
 *                 type: string
 *                 description: ID de la publicación a la que pertenece el comentario
 *             required:
 *               - contenido
 *               - uidPublic
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/agregarcomentarios", agregarComentario);

/**
 * @swagger
 * /editarcomentarios/{comentarioId}:
 *   put:
 *     summary: Editar un comentario existente
 *     description: Permite a un usuario editar su propio comentario. Requiere autenticación.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: comentarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *                 description: Nuevo contenido del comentario
 *             required:
 *               - contenido
 *     responses:
 *       200:
 *         description: Comentario editado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       403:
 *         description: No autorizado para editar este comentario
 */
router.put("/editarcomentarios/:comentarioId", editarComentario);

/**
 * @swagger
 * /eliminarcomentarios/{comentarioId}:
 *   delete:
 *     summary: Eliminar un comentario
 *     description: Permite a un usuario eliminar su propio comentario. Requiere autenticación.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: comentarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       403:
 *         description: No autorizado para eliminar este comentario
 *       404:
 *         description: Comentario no encontrado
 */
router.delete("/eliminarcomentarios/:comentarioId", eliminarComentario);

/**
 * @swagger
 * /comentariosPublicacion/{uidPublic}:
 *   get:
 *     summary: Ver comentarios de una publicación
 *     description: Devuelve todos los comentarios asociados a una publicación específica.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: uidPublic
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *       404:
 *         description: Publicación no encontrada
 */
router.get("/comentariosPublicacion/:uidPublic", verComentariosDePublicacion);

export default router;