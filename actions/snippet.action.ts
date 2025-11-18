import { ISnippetPayload } from "@/types/snippets.type";

// get snippets action
export const getSnippetsAction = async () => {
  try {
    const response = await fetch("/api/snippet", {
      method: "GET",
    });
    const data = await response.json();
    return data.snippets;
  } catch (error) {
    return error;
  }
};

// save snippet action
export const saveSnippetAction = async (payload: ISnippetPayload) => {
  try {
    const response = await fetch("/api/snippet", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete snippet action
export const deleteSnippetAction = async (id: string) => {
  try {
    const response = await fetch(`/api/snippet/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update snippet action
export const updateSnippetAction = async (id: string, payload: ISnippetPayload) => {
  try {
    const response = await fetch(`/api/snippet/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
