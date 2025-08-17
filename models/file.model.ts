
import { Schema, model, models } from "mongoose";
import { IFile } from "@/types/file.type";

const fileSchema = new Schema<IFile>(
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

const File = models?.File || model<IFile>("File", fileSchema);
export default File;

