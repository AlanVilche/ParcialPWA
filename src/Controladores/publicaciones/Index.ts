import { Request, Response } from "express";
import Publicacion from "../../Modelos/publicacion";
import Usuario from "../../Modelos/usuario";

const CrearPublicacion = async (req: Request, res: Response) => {
  try {
    const post = new Publicacion(req.body);
    await post.save();
    res.status(201).json({
      message: "Publicación creada con éxito",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const ObtenerPublicaciones = async (req: Request, res: Response) => {
 try {
    const publicaciones = await Publicacion.find();
    res.status(200).json({
      message: "Publicaciones obteneidas exitosamente",
      data: publicaciones,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

 const ObtenerPublicacionPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Publicacion.findById(id);

    if (!post) {
      res.status(404).json({
        message: "Publicacion no encontrada",
        error: true,
        data: undefined,
      });
      return;
    }

    res.status(200).json({
      message: "Publicacion obtenida exitosamente",
      error: false,
      data: post,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const ActualizarPublicacion = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;

    const user = await Publicacion.findByIdAndUpdate(
      id,
      {
        titulo: req.body.titulo,
        contenido: req.body.contenido
      },
      { new: true }
    );
    if (!user) {
      res.status(404).json({
        message: "Publicacion no encontrada",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Actualizada la publicación con éxito",
      data: user,
      error: false,
    });
 
    } catch (Error) {
        console.error("Error al actualizar:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const AgregarLike = async (req: Request, res: Response) => {
  const { id } = req.params; // id de la publicación
  const { userId } = req.body; // id del usuario que da like

  try {
    // Evita duplicados usando $addToSet
    const post = await Publicacion.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    ).populate("publicaciones");
   if (!post) {
      return res.status(404).json({
        message: "Publicación no encontrada",
        error: true,
        data: undefined,
      });
    }

    res.status(200).json({
      message: "Like agregado exitosamente",
      error: false,
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const BorrarPublicacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Publicacion.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({
        message: "Publicación no encontrada",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Borrado la publicación con éxito",
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const ObtenerPersonasQueDieronLike = async (req: Request, res: Response) => {
  const { id } = req.params; // id de la publicación

  try {
    const post = await Publicacion.findById(id).populate("likes", "nombreUsuario");

    if (!post) {
      return res.status(404).json({
        message: "Publicación no encontrada",
        error: true,
        data: undefined,
      });
    }

    // Extrae solo los nombres de usuario
    const nombres = post.likes.map((usuario: any) => usuario.nombreUsuario);

    res.status(200).json({
      message: "Usuarios que dieron like obtenidos exitosamente",
      error: false,
      data: nombres,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { CrearPublicacion, ObtenerPublicaciones, ObtenerPublicacionPorId, ActualizarPublicacion, AgregarLike, ObtenerPersonasQueDieronLike, BorrarPublicacion };
        
