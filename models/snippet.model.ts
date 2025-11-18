import { Schema, model, models } from "mongoose";
import { ISnippet } from "@/types/snippets.type";

const SnippetSchema = new Schema<ISnippet>(
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

const Snippet = models?.Snippet || model<ISnippet>("Snippet", SnippetSchema);
export default Snippet;
