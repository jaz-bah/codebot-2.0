import { IStorage } from './../types/storage.type';
import { Schema, model, models } from "mongoose";


const storageSchema = new Schema<IStorage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Storage = models?.Storage || model<IStorage>("Storage", storageSchema);
export default Storage;