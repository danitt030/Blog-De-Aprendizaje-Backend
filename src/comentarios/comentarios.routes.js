import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario, verComentariosDePublicacion } from "./comentarios.controller.js";

const router = Router();

router.post("/agregarcomentarios/:uidPublic", agregarComentario);

router.put("/editarcomentarios/:comentarioId", editarComentario);

router.delete("/eliminarcomentarios/:comentarioId", eliminarComentario);

router.get("/comentariosPublicacion/:uidPublic", verComentariosDePublicacion);

export default router;