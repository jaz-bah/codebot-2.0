import { Schema, model, models } from "mongoose";
import { ITool } from "@/types/tool.type";

const toolSchema = new Schema<ITool>(
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

const Tool = models?.Tool || model<ITool>("Tool", toolSchema);
export default Tool;
