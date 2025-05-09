import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario, verComentariosDePublicacion } from "./comentarios.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarcomentarios/{uidPublic}:
 *   post:
 *     summary: Agrega un nuevo comentario a una publicación.
 *     description: Este endpoint permite agregar un comentario a una publicación específica. Solo usuarios autenticados pueden usarlo.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: uidPublic
 *         required: true
 *         schema:
 *           type: string
 *         description: UID de la publicación a la que se agregará el comentario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *                 description: Contenido del comentario.
 *                 example: "Este es un comentario de prueba."
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: Usuario no autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/agregarcomentarios", agregarComentario);

/**
 * @swagger
 * /editarcomentarios/{comentarioId}:
 *   put:
 *     summary: Edita un comentario existente.
 *     description: Este endpoint permite editar un comentario específico. Solo el autor del comentario o un administrador puede usarlo.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: comentarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *                 description: Nuevo contenido del comentario.
 *                 example: "Este es el comentario editado."
 *     responses:
 *       200:
 *         description: Comentario editado exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Acceso denegado. Solo el autor o un administrador puede editar el comentario.
 *       404:
 *         description: Comentario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/editarcomentarios/:comentarioId", editarComentario);

/**
 * @swagger
 * /eliminarcomentarios/{comentarioId}:
 *   delete:
 *     summary: Elimina un comentario.
 *     description: Este endpoint permite eliminar un comentario específico. Solo el autor del comentario o un administrador puede usarlo.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: comentarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar.
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Acceso denegado. Solo el autor o un administrador puede eliminar el comentario.
 *       404:
 *         description: Comentario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/eliminarcomentarios/:comentarioId", eliminarComentario);

/**
 * @swagger
 * /comentariosPublicacion/{uidPublic}:
 *   get:
 *     summary: Obtiene los comentarios de una publicación.
 *     description: Este endpoint devuelve todos los comentarios asociados a una publicación específica.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: uidPublic
 *         required: true
 *         schema:
 *           type: string
 *         description: UID de la publicación cuyos comentarios se desean obtener.
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del comentario.
 *                     example: "12345"
 *                   contenido:
 *                     type: string
 *                     description: Contenido del comentario.
 *                     example: "Este es un comentario de prueba."
 *                   autor:
 *                     type: string
 *                     description: Autor del comentario.
 *                     example: "Usuario123"
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del comentario.
 *                     example: "2025-05-08T12:34:56Z"
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/comentariosPublicacion/:uidPublic", verComentariosDePublicacion);

export default router;