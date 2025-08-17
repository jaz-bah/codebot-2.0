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
        url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Component = models?.Component || model<IComponent>("Component", componentSchema);
export default Component;
