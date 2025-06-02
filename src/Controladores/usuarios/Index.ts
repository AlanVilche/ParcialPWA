import { Request, Response } from "express";
import Usuario from "../../Modelos/usuario";


const CrearUsuario = async (req: Request, res: Response) => {

    try {
        const { nombreUsuario, email, fechaCreacion } = req.body;
    
        // Validar que los campos no estén vacíos
        if (!nombreUsuario || !email ) {
        return res.status(400).json({ error: "Los campos nombre e Email son obligatorios" });
        }
    
        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
        nombreUsuario,
        email,
        fechaCreacion: fechaCreacion || new Date(), // Si no se proporciona, se usa la fecha actual
        activo: false, // Por defecto, el usuario no está activo
        });
    
        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();
    
        // Responder con el usuario creado
        res.status(201).json({
            message: "El usuario se creó con éxito",
            usuario: {
                id: nuevoUsuario._id,
                nombreUsuario: nuevoUsuario.nombreUsuario,
                email: nuevoUsuario.email,
                fechaCreacion: nuevoUsuario.fechaCreacion,
                activo: nuevoUsuario.activo,
               
            },  error: false
        });
        
    } catch (Error) {
        console.error("Error al crear el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
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
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no existente" });
        }
        res.status(200).json({
            message: "Usuario localizado con éxito",
            usuario: {
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                email: usuario.email,
                fechaCreacion: usuario.fechaCreacion,
                activo: usuario.activo
            },
            error: false
        });
    } catch (Error) {
        console.error("Error al obtener el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const ActualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombreUsuario, email, activo } = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { nombreUsuario, email, activo },
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no existente" });
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            usuario: {
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                email: usuario.email,
                fechaCreacion: usuario.fechaCreacion,
                activo: usuario.activo
            },
            error: false
        });
    } catch (Error) {
        console.error("Error al actualizar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

 const ReactivarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true })
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no existente" });
        } res.status(200).json({
            message: "Usuario activado con éxito",
            usuario: {
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                email: usuario.email,
                fechaCreacion: usuario.fechaCreacion,
                activo: usuario.activo
            },
            error: false
        });
    } catch (Error) {
        console.error("Error al activar el usuario:", Error);
        res.status(500).json({ error: "Error interno del servidor" });
    } 
};

const BorrarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no existente" });
        } res.status(200).json({
            message: "Usuario borrado con éxito",
            usuario: {
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                email: usuario.email,
                fechaCreacion: usuario.fechaCreacion,
                activo: usuario.activo
            },
            error: false
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