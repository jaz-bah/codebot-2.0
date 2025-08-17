import { IPreset } from "./../types/preset.type";
import { Schema, model, models } from "mongoose";

const presetSchema = new Schema<IPreset>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Preset = models?.Preset || model<IPreset>("Preset", presetSchema);
export default Preset;
