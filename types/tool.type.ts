import mongoose from "mongoose";

export interface ITool {
  userId: mongoose.Types.ObjectId;
  name: string;
  note: string;
  url: string;
}

export interface IToolResponse {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  note: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IToolPayload {
  name: string;
  note: string;
  url: string;
}
