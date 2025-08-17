import { IFilePayload } from "@/types/file.type";
import { uploadFile } from "./uploadFile.action";


// get all files
export const getAllFilesAction = async () => {
    try {
        const response = await fetch(`/api/file`,{
            method: "GET",
        });
        const data = await response.json();
        return data.files;
    } catch (error) {
        return error;
    }
}

// add file
export const addFileAction = async (payload: IFilePayload) => {
    try {
        const { file } = payload;
        const fileUrl = await uploadFile(file);

        if(!fileUrl) {
            return "Error uploading file";
        }

        const response = await fetch(`/api/file`,{
            method: "POST",
            body: JSON.stringify({
                name: payload.name,
                note: payload.note,
                url: fileUrl.url,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

// delete file
export const deleteFileAction = async (id: string) => {
    try {
        const response = await fetch(`/api/file/${id}`,{
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}


