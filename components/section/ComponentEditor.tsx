"use client";
import {
  getComponentAction,
  saveComponentAction,
} from "@/actions/component.action";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { handleEditorDidMount } from "@/helper/EditorMount";
import { IComponentFile, IComponentResponse } from "@/types/component.type";
import { Editor } from "@monaco-editor/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AddComponentFileForm } from "../form/AddComponentFileForm";
import { Modal } from "../modal/Modal";
import { toast } from "sonner";

interface Props {
  componentId: string;
}

export default function ComponentEditor({ componentId }: Props) {
  // get component data
  const { data, isLoading } = useQuery({
    queryKey: ["component", componentId],
    queryFn: () => getComponentAction(componentId),
  });

  // states
  const [component, setComponent] = useState<IComponentResponse | null>(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    selectedFileIndex !== null ? component!.files[selectedFileIndex].language : "json"
  );

  // set component data
  useEffect(() => {
    setComponent(data || null);
  }, [data]);

  // handle add file
  const handleAddFile = (file: IComponentFile) => {
    const newFiles = [...component!.files, file];
    setComponent({
      ...component!,
      files: newFiles,
    });
    setSelectedFileIndex(newFiles.length - 1);
    setSelectedLanguage(file.language);
  };

  // delete file
  const handleDeleteFile = (index: number) => {
    setComponent({
      ...component!,
      files: component!.files.filter((_, i) => i !== index),
    });

    if (selectedFileIndex === index) {
      setSelectedFileIndex(0);
      setSelectedLanguage(component!.files[0].language);
    }
  };

  // save mutation
  const saveMutation = useMutation({
    mutationFn: (payload: IComponentResponse) => saveComponentAction(payload),
    onSuccess: () => {
      setIsUpdating(false);
      toast.success("Component saved successfully");
    },
    onError: () => {
      setIsUpdating(false);
      toast.error("Error saving component");
    },
  });

  // handle save
  const handleSave = () => {
    if (!component) {
      return;
    }
    setIsUpdating(true);
    saveMutation.mutate(component);
  };

  // handle file change
  const handleFileChange = (index: number) => {
    setSelectedFileIndex(index);
    setSelectedLanguage(component!.files[index].language);
  };

  useEffect(() => {
    console.log(selectedLanguage);
  }, [selectedLanguage]);

  // const isLoading = isLoadingComponent;
  return (
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
              {component?.files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button
                    variant={
                      selectedFileIndex === index ? "default" : "outline"
                    }
                    className="flex-1 capitalize"
                    onClick={() => handleFileChange(index)}
                  >
                    {file.name}
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDeleteFile(index)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Add File
              </Button>

              <Modal
                open={open}
                onOpenChange={setOpen}
                title={"Add File"}
                pathName={"Add File"}
              >
                <div className="py-2">
                  <AddComponentFileForm
                    closeModal={() => setOpen(false)}
                    addFile={handleAddFile}
                  />
                </div>
              </Modal>
            </div>
          </div>

          {/* Editor Section */}
          <div className="col-span-10 h-full">
            <div className="grid grid-cols-1 grid-rows-auto h-full">
              <div className="row-span-1">
                <div className="bg-accent border-b h-full p-2 flex justify-between items-center">
                  <h2 className="text-sm font-bold">
                    {selectedFileIndex !== null
                      ? component?.files[selectedFileIndex]?.name
                      : "Add File"}
                  </h2>

                  <div className="flex">
                    <Button
                      variant={"outline"}
                      onClick={() => handleSave()}
                      size={"sm"}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row-span-auto h-full">
                <Editor
                  height="100%"
                  defaultLanguage={selectedLanguage}
                  language={selectedLanguage}
                  value={
                    selectedFileIndex !== null
                      ? component?.files[selectedFileIndex]?.code || "{}"
                      : "{}"
                  }
                  onMount={handleEditorDidMount}
                  onChange={(value) => {
                    if (selectedFileIndex !== null) {
                      setComponent({
                        ...component!,
                        files: component!.files.map((file, i) =>
                          i === selectedFileIndex
                            ? { ...file, code: value || "" }
                            : file
                        ),
                      });
                    }
                  }}
                  options={{
                    lineNumbers: "on",
                    fontSize: 14,
                    minimap: { enabled: false },
                    smoothScrolling: true,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
