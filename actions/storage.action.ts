import { IStoragePayload } from "@/types/storage.type";

// get storages action
export const getStoragesAction = async () => {
  try {
    const res = await fetch("/api/storage");
    const data = await res.json();
    return data.storages;
  } catch (error) {
    return error;
  }
};

// add storage action
export const addStorageAction = async (payload: IStoragePayload) => {
  try {
    const response = await fetch("/api/storage", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// edit storage action
export const editStorageAction = async (
  id: string,
  payload: IStoragePayload
) => {
  try {
    const response = await fetch(`/api/storage/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete storage action
export const deleteStorageAction = async (id: string) => {
  try {
    const response = await fetch(`/api/storage/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
