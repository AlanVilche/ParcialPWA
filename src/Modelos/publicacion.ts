import mongoose, { Document, Schema } from "mongoose";
import { Usuario } from "./usuario";

export interface Publicacion extends Document {
  titulo: string;
  contenido: string;
  autor: string;
  likes: Usuario[];
  Editado: boolean;
  fechaCreacion: Date;
}

const publicacionSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        contenido: {
            type: String,
            required: true,
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],

        Editado: {
            type: Boolean,
            required: true,
            default: false,
        },
        fechaCreacion: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);


const Publicacion = mongoose.model("Publicacion", publicacionSchema);

export default Publicacion;