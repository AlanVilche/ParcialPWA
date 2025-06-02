import mongoose, { Document,Schema } from "mongoose";

export interface Usuario extends Document {
  nombreUsuario: string;
  email: string;
  fechaCreacion: Date;
  activo: boolean;
}

const userSchema = new Schema(
    {
        nombreUsuario: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fechaCreacion: {
         type: Date,
         default: Date.now,   
        },
        activo: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Usuario = mongoose.model<Usuario>("Usuario", userSchema);
export default Usuario;