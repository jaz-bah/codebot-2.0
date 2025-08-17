import { IPresetPayload } from "@/types/preset.type";

// save preset action
export const savePresetAction = async (payload: IPresetPayload) => {
  try {
    const response = await fetch("/api/preset", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get presets action
export const getPresetsAction = async () => {
  try {
    const response = await fetch("/api/preset", {
      method: "GET",
    });
    const data = await response.json();
    return data.presets;
  } catch (error) {
    return error;
  }
};

// delete preset action
export const deletePresetAction = async (id: string) => {
  try {
    const response = await fetch(`/api/preset/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update preset action
export const updatePresetAction = async (id: string, payload: IPresetPayload) => {
  try {
    const response = await fetch(`/api/preset/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
