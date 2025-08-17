"use client";

import { addStorageAction, editStorageAction } from "@/actions/storage.action";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IStoragePayload, IStorageResponse } from "@/types/storage.type";
import Editor, { OnMount } from "@monaco-editor/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const handleEditorDidMount: OnMount = (editor, monaco) => {
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "f8f8f2" },
      { token: "comment", foreground: "6272a4", fontStyle: "italic" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "number", foreground: "bd93f9" },
      { token: "string", foreground: "f1fa8c" },
      { token: "identifier", foreground: "50fa7b" },
      { token: "variable", foreground: "8be9fd" },
      { token: "type", foreground: "8be9fd" },
      { token: "delimiter", foreground: "f8f8f2" },
    ],
    colors: {
      "editor.foreground": "#f8f8f2",
      "editor.background": "#282a36",
      "editorCursor.foreground": "#f8f8f0",
      "editor.lineHighlightBackground": "#44475a",
      "editorLineNumber.foreground": "#6272a4",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a88",
    },
  });

  monaco.editor.setTheme("dracula");
};

const options = [
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "TypeScript",
    value: "typescript",
  },
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "Scss",
    value: "scss",
  },
  {
    label: "JSON",
    value: "json",
  },
];

interface Props {
  editCode?: IStorageResponse | null;
  setEditCode?: () => void;
}

export function AddStorageForm({ editCode, setEditCode }: Props) {
  const queryClient = useQueryClient();

  // states
  const [code, setCode] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // add storage mutation
  const addStorageMutation = useMutation({
    mutationFn: async (payload: IStoragePayload) => addStorageAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      toast.success("Stored successfully");
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Error storing data");
      setIsSubmitting(false);
    },
  });

  // edit storage mutation
  const editStorageMutation = useMutation({
    mutationFn: async (params: { id: string; payload: IStoragePayload }) =>
      editStorageAction(params.id, params.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      toast.success("Edited successfully");
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Error editing data");
      setIsSubmitting(false);
    },
  });

  // handle submit
  function onSubmit() {
    if (!code || !language || isSubmitting) return;

    setIsSubmitting(true);

    const newStorage: IStoragePayload = {
      language,
      code,
    };

    if (editCode) {
      editStorageMutation.mutate({
        id: editCode._id,
        payload: newStorage,
      });
    } else {
      addStorageMutation.mutate(newStorage);
    }
  }

  // handle clear
  function handleClear() {
    setCode(null);
    setLanguage("javascript");
    if (setEditCode) {
      setEditCode();
    }
  }

  useEffect(() => {
    if (editCode) {
      setCode(editCode.code);
      setLanguage(editCode.language);
    }
  }, [editCode]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex mb-5 w-full">
        <Editor
          height="400px"
          defaultLanguage={language}
          onMount={handleEditorDidMount}
          value={code ? code : "// Write your code here..."}
          onChange={(value) => value && setCode(value)}
          options={{
            lineNumbers: "on",
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex">
          {editCode && (
            <>
              <span className="text-sm text-gray-500">Editing:</span>
              <span className="ml-2 text-sm font-semibold">
                {editCode?.language}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            className="cursor-pointer px-10"
            type="button"
            onClick={handleClear}
            variant="outline"
          >
            Clear
          </Button>

          {editCode ? (
            <Button
              className="cursor-pointer px-10"
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Edit"}
            </Button>
          ) : (
            <Button
              className="cursor-pointer"
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Store"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
