import mongoose from "mongoose";

export interface ISnippet {
  userId: mongoose.Types.ObjectId;
  language: string;
  code: string;
}


export interface ISnippetResponse {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  language: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}


export interface ISnippetPayload {
  language: string;
  code: string;
}

