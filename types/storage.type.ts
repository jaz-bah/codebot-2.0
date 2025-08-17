import mongoose from "mongoose";

export interface IStorage {
  userId: mongoose.Types.ObjectId;
  language: string;
  code: string;
}


export interface IStorageResponse {
  _id: string;
  userId: mongoose.Types.ObjectId;
  language: string;
  code: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IStoragePayload {
  language: string;
  code: string;
}

export interface IStorageUpdatePayload {
  language?: string;
  code?: string;
}
