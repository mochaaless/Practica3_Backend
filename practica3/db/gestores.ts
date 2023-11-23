import mongoose from "npm:mongoose@7.6.3";
import { Gestor } from "../types.ts";

const Schema = mongoose.Schema;

const gestorSchema = new Schema(
  {
    name: { type: String, required: true },
    hipotecas:  { type: Array, required: true, default: []},
  },
  { timestamps: true }
);

export type GestorModelType = mongoose.Document & Omit<Gestor, "id">;

export default mongoose.model<Gestor>("Gestor", gestorSchema);