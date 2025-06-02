import { Request, Response } from "express";
import Usuario from "../../Modelos/usuario";


const CrearUsuario = async (req: Request, res: Response) => {
try {
    const user = new Usuario(req.body);
    await user.save();
    res.status(201).json({
      message: "Usuario creado con éxito",
      data: user,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};


const ObtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            message: "Usuarios localizados con éxito",
            usuarios: usuarios.map(usuario => ({
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                email: usuario.email,
                fechaCreacion: usuario.fechaCreacion,
                activo: usuario.activo
            })),
            error: false
        });
    } catch (Error) {
        console.error("Error al obtener los usuarios:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const ObtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findById(id);
    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Usuario localizado con éxito",
      data: user,
      error: false,
    });
  } catch (Error) {
        console.error("Error al buscar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const ActualizarUsuario = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;

    const user = await Usuario.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Actualizado con éxito",
      data: user,
      error: false,
    });
 
    } catch (Error) {
        console.error("Error al actualizar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

 const ReactivarUsuario = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;
    const user = await Usuario.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    )
    res.status(200).json({
      message: "Usuario reactivado con éxito",
      data: user,
      error: false,
    });
    } catch (Error) {
        console.error("Error al activar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    } 
};

const BorrarUsuario = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;
    const user = await Usuario.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    )
    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Usuario eliminado con éxito",
      data: user,
      error: false,
    });
 
    } catch (Error) {   
        console.error("Error al borrar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export {
    CrearUsuario,
    ObtenerUsuarios,
    ActualizarUsuario,
    ObtenerUsuarioPorId,
    ReactivarUsuario,
    BorrarUsuario
};