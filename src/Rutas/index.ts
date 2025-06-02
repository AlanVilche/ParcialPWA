import express from "express";
import userRouter from "./Usuarios";
import postRouter from "./Publicaciones";

const router = express.Router();

router.use("/usuarios", userRouter);
router.use("/publicaciones", postRouter);


export default router;
