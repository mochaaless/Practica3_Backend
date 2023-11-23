import mongoose from "npm:mongoose@7.6.3";
import { Hipoteca } from "../types.ts";


const Schema = mongoose.Schema;

const hipotecaSchema = new Schema({
    total_quantity: { type: Number, required: true},
    cuotes: { type: Array, required: true},
    dni_client: {type: String, required: true}
  },
  { timestamps: true }
);

export type HipotecaModelType = mongoose.Document & Omit<Hipoteca, "id">;

export default mongoose.model<Hipoteca>("Hipoteca", hipotecaSchema);