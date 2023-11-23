import mongoose from "npm:mongoose@7.6.3";
import { Movement } from "../types.ts";

const Schema = mongoose.Schema;

const movementSchema = new Schema(
  {
    sender: { type: String, required: true },
    receiver:  { type: String, required: true },
    quantity:  { type: Number, required: true },
  },
  { timestamps: true }
);

export type MovementModelType = mongoose.Document & Omit<Movement, "id">;

export default mongoose.model<Movement>("Movements", movementSchema);