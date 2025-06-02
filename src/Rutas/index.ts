import express from "express";
import userRouter from "./Usuarios";
import postRouter from "./Publicaciones";

const router = express.Router();

router.use("/Usuarios", userRouter);
router.use("/Publicaciones", postRouter);


export default router;
