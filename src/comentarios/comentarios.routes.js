import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario, verComentariosDePublicacion } from "./comentarios.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarcomentarios:
 *   post:
 *     summary: Agregar un nuevo comentario
 *     description: Permite a un usuario autenticado agregar un comentario a una publicación.
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
 *               publicacionId:
 *                 type: string
 *                 description: ID de la publicación a la que se agrega el comentario
 *             required:
 *               - contenido
 *               - publicacionId
 *           example:
 *             contenido: "¡Excelente publicación!"
 *             publicacionId: "123abc"
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado. Se requiere autenticación
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 */
router.post("/agregarcomentarios", agregarComentario);

/**
 * @swagger
 * /editarcomentarios/{comentarioId}:
 *   put:
 *     summary: Editar un comentario existente
 *     description: Permite al autor del comentario o a un administrador editar un comentario.
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
 *           example:
 *             contenido: "Comentario editado."
 *     responses:
 *       200:
 *         description: Comentario editado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido. Solo el autor o un administrador puede editar
 *       404:
 *         description: Comentario no encontrado
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario (autor)
 *       - Administrador
 */
router.put("/editarcomentarios/:comentarioId", editarComentario);

/**
 * @swagger
 * /eliminarcomentarios/{comentarioId}:
 *   delete:
 *     summary: Eliminar un comentario
 *     description: Permite al autor del comentario o a un administrador eliminar un comentario.
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
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido. Solo el autor o un administrador puede eliminar
 *       404:
 *         description: Comentario no encontrado
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario (autor)
 *       - Administrador
 */
router.delete("/eliminarcomentarios/:comentarioId", eliminarComentario);

/**
 * @swagger
 * /comentariosPublicacion/{uidPublic}:
 *   get:
 *     summary: Ver comentarios de una publicación
 *     description: Obtiene todos los comentarios asociados a una publicación específica.
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
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - Usuario
 *       - Administrador
 */
router.get("/comentariosPublicacion/:uidPublic", verComentariosDePublicacion);

export default router;