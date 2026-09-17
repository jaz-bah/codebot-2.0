"use client";

import {
  getSnippetsAction,
  updateSnippetAction,
} from "@/actions/snippet.action";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { handleEditorDidMount } from "@/helper/EditorMount";
import { ISnippetPayload, ISnippetResponse } from "@/types/snippets.type";
import { Editor } from "@monaco-editor/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function SnippetPage() {
  const queryClient = useQueryClient();

  const [selectedSnippet, setSelectedSnippet] =
    useState<ISnippetResponse | null>(null);
  const [editedCode, setEditedCode] = useState<string>("");
  const [isDiff, setIsDiff] = useState(false);

  // Fetch all snippets
  const { isLoading, data: snippets } = useQuery({
    queryKey: ["snippets"],
    queryFn: getSnippetsAction,
  });

  // Update snippet mutation
  const editSnippetMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ISnippetPayload;
    }) => updateSnippetAction(id, payload),
    onSuccess: () => {
      setIsDiff(false);
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      toast.success("Snippet updated successfully");
    },
    onError: () => {
      toast.error("Failed to update snippet");
    },
  });

  // Handle editor change
  const handleCodeChange = (value: string | undefined) => {
    if (!selectedSnippet) return;
    const newValue = value || "";
    setEditedCode(newValue);
    setIsDiff(newValue !== selectedSnippet.code);
  };

  // Manual save
  const handleSave = () => {
    if (!selectedSnippet || !isDiff) return;

    const updatedSnippet: ISnippetResponse = {
      ...selectedSnippet,
      code: editedCode,
    };

    editSnippetMutation.mutate({
      id: updatedSnippet._id.toString(),
      payload: updatedSnippet,
    });

    setIsDiff(false);
    setSelectedSnippet(updatedSnippet);
    setEditedCode(updatedSnippet.code);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full grid grid-cols-12 h-[calc(100vh-60px)]">
        {isLoading ? (
          <div className="col-span-12 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {/* Sidebar */}
            <div className="col-span-2 h-full bg-accent border-r p-2 flex flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                {snippets?.map((snippet: ISnippetResponse) => (
                  <Button
                    key={snippet._id.toString()}
                    variant={
                      selectedSnippet?._id === snippet._id
                        ? "default"
                        : "outline"
                    }
                    className="w-full capitalize"
                    onClick={() => {
                      setSelectedSnippet(snippet);
                      setEditedCode(snippet.code);
                      setIsDiff(false);
                    }}
                    disabled={isLoading}
                  >
                    {snippet.language}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant={isDiff ? "default" : "outline"}
                  className="w-full"
                  onClick={handleSave}
                  disabled={!isDiff || editSnippetMutation.isPending}
                >
                  {editSnippetMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            {/* Editor Section */}
            <div className="col-span-10 h-full">
              {selectedSnippet ? (
                <Editor
                  height="100%"
                  defaultLanguage={"json"}
                  value={editedCode}
                  onMount={handleEditorDidMount}
                  onChange={handleCodeChange}
                  options={{
                    lineNumbers: "on",
                    fontSize: 14,
                    minimap: { enabled: false },
                    smoothScrolling: true,
                    scrollBeyondLastLine: false,
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No snippet selected
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
