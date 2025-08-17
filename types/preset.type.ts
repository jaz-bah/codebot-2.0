import mongoose from "mongoose";

export interface IPreset {
  name: string;
  userId: mongoose.Types.ObjectId;
  language: string;
  code: string;
}

export interface IPresetResponse {
  _id: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  language: string;
  code: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IPresetPayload {
  name: string;
  language: string;
  code: string;
}
