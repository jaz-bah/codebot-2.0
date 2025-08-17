"use client";

import FileCard from "@/components/card/FileCard";
import Collection from "@/components/section/Collection";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFileAction, getAllFilesAction } from "@/actions/file.action";
import Loader from "@/components/layout/Loader";
import { IFileResponse } from "@/types/file.type";
import { toast } from "sonner";

export default function Page() {
  const queryClient = useQueryClient();

  // get all files
  const { data: files, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: getAllFilesAction,
  });

  // delete file mutation
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);


  const deleteFileMutation = useMutation({
    mutationFn: (fileId: string) => deleteFileAction(fileId),
    onSuccess: () => {
      toast.success("File deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting file");
    },
    onSettled: () => {
      setIsDeleting(false);
      setDeletingFileId(null);
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
  });

  // delete file handler
  const deleteFileHandler = (fileId: string) => {
    setIsDeleting(true);
    setDeletingFileId(fileId);
    deleteFileMutation.mutate(fileId);
  }

  return (
    <div className="py-4">
      <Collection title="Files">
        {isLoading && <Loader />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files && files.map((file: IFileResponse) => (
            <FileCard
              key={file._id.toString()}
              file={file}
              onDelete={deleteFileHandler}
              isDeleting={isDeleting}
              deletingFileId={deletingFileId}
            />
          ))}
        </div>
      </Collection>
    </div>
  );
}
