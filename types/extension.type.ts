import mongoose from "mongoose";

export interface IExtension {
  userId: mongoose.Types.ObjectId;
  name: string;
  note: string;
  url: string;
}

export interface IExtensionResponse {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  note: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExtensionPayload {
  name: string;
  note: string;
  url: string;
}
