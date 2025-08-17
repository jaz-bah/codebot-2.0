import { IExtensionPayload } from "./../types/extension.type";

// get extensions action
export const getExtensionsAction = async () => {
  try {
    const response = await fetch(`/api/extension`, {
      method: "GET",
    });
    const data = await response.json();
    return data.extensions;
  } catch (error) {
    return error;
  }
};

// create extension action
export const createExtensionAction = async (payload: IExtensionPayload) => {
  try {
    const response = await fetch(`/api/extension`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update extension action
export const updateExtensionAction = async (
  id: string,
  payload: IExtensionPayload
) => {
  try {
    const response = await fetch(`/api/extension/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete extension action
export const deleteExtensionAction = async (id: string) => {
  try {
    const response = await fetch(`/api/extension/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
