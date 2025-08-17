import { IExtension } from "./../types/extension.type";
import { Schema, model, models } from "mongoose";


const extensionSchema = new Schema<IExtension>(
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
        note: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Extension = models?.Extension || model<IExtension>("Extension", extensionSchema);
export default Extension;