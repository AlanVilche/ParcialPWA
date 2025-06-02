import express from "express";
import  { ActualizarPublicacion, AgregarLike, BorrarPublicacion, CrearPublicacion,ObtenerPersonasQueDieronLike,ObtenerPublicaciones,ObtenerPublicacionPorId }  from "../../Controladores/publicaciones/Index";

const router = express.Router();

router.post("/", CrearPublicacion);
router.get("/", ObtenerPublicaciones);
router.get("/:id", ObtenerPublicacionPorId);
router.patch("/:id", ActualizarPublicacion);
//router.patch("/Like/:id", AgregarLike);
//router.get("/Usuarios/:id", ObtenerPersonasQueDieronLike);
router.delete("/:id", BorrarPublicacion);

export default router;


