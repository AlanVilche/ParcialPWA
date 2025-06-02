import express from "express";

import {
  ObtenerUsuarios,
  CrearUsuario,
  ObtenerUsuarioPorId,
  ActualizarUsuario,
  ReactivarUsuario,
  BorrarUsuario,
} from "../../Controladores/usuarios/Index";

const routes = express.Router();
/*
routes.get("/", ObtenerUsuarios); 
routes.get("/:id", ObtenerUsuarioPorId);
routes.post("/", CrearUsuario);
routes.post("/:id", ActualizarUsuario);
routes.patch("/borrar/:id", BorrarUsuario);
routes.patch("/reactivar/:id", ReactivarUsuario);
*/
export default routes;


