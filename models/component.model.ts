import { Schema, model, models } from "mongoose";
import { IComponent } from "../types/component.type";

const componentSchema = new Schema<IComponent>(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        preview: {
            type: String,
            required: true,
        },
        files: {
            type: [
                {
                    name: String,
                    language: String,
                    code: String,
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Component = models?.Component || model<IComponent>("Component", componentSchema);
export default Component;
