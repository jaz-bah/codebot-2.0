import {
  IComponentPayload,
  IComponentResponse,
  IComponentUpdatePayload,
} from "@/types/component.type";
import { uploadImage } from "./uploadImage.action";

// get components action
export const getComponentsAction = async () => {
  try {
    const response = await fetch(`/api/component`, {
      method: "GET",
    });
    const data = await response.json();
    return data.components;
  } catch (error) {
    return error;
  }
};

// create component action
export const createComponentAction = async (payload: IComponentPayload) => {
  try {
    const { preview } = payload;
    const previewUrl = await uploadImage(preview);
    if (!previewUrl) {
      return "Error uploading image";
    }

    const response = await fetch(`/api/component`, {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        preview: previewUrl.url,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update component action
export const updateComponentAction = async (
  payload: IComponentUpdatePayload,
  component: IComponentResponse
) => {
  try {
    const uploadOrKeepOriginal = async (
      file: File | null | undefined,
      originalUrl: string
    ) => {
      if (!file) return originalUrl;
      const { url } = await uploadImage(file);
      return url || originalUrl;
    };

    const { preview } = payload;
    const previewUrl = await uploadOrKeepOriginal(preview, component.preview);

    const response = await fetch(`/api/component/${component._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        preview: previewUrl,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// save component action
export const saveComponentAction = async (payload: IComponentResponse) => {
  try {
    const response = await fetch(`/api/component/${payload._id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete component action
export const deleteComponentAction = async (id: string) => {
  try {
    const response = await fetch(`/api/component/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get component action
export const getComponentAction = async (id: string) => {
  try {
    const response = await fetch(`/api/component/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data.component;
  } catch (error) {
    return error;
  }
};
