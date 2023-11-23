import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../types.ts";


const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    dni: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    iban: { type: String, required: true },
    balance: { type: Number, required: true , default: 0},
    movements: { type: Array, required: true, default: []},
    hipoteca: { type: Array, required: true, default: []},
    gestor:  { type: Object, required: true }
  },
  { timestamps: true }
);

export type ClientModelType = mongoose.Document & Omit<Client, "id">;

export default mongoose.model<Client>("Client", clientSchema);