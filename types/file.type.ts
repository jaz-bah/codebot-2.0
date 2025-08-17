import mongoose from "mongoose";


export interface IFile {
    userId: mongoose.Types.ObjectId;
    name: string;
    note: string;
    url: string;
}

export interface IFileResponse {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    name: string;
    note: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFilePayload {
    name: string;
    note: string;
    file: File;
}

