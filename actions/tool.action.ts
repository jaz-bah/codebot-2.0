import { IToolPayload } from "@/types/tool.type";


// get tools action
export const getToolsAction = async () => {
  try {
    const response = await fetch("/api/tool", {
      method: "GET",
    });
    const data = await response.json();
    return data.tools;
  } catch (error) {
    return error;
  }
};

// save tool action
export const saveToolAction = async (payload: IToolPayload) => {
  try {
    const response = await fetch("/api/tool", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete tool action
export const deleteToolAction = async (id: string) => {
  try {
    const response = await fetch(`/api/tool/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update tool action
export const updateToolAction = async (id: string, payload: IToolPayload) => {
  try {
    const response = await fetch(`/api/tool/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
