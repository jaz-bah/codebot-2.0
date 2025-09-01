"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Edit, ExpandIcon, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { Modal } from "../modal/Modal";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  code: string;
  language: string;
  queryKey: string;
  handleEdit?: () => void;
  deleteAction: (id: string) => void;
}

export default function CodePreview({
  handleEdit,
  deleteAction,
  id,
  name,
  code,
  language,
  queryKey,
}: Props) {
  const queryClient = useQueryClient();

  // state
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // handle copy
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Preset deleted successfully");
      setIsDeleting(false);
    },
    onError: () => {
      toast.error("Failed to delete preset");
      setIsDeleting(false);
    },
  });

  // handle delete
  const handleDelete = () => {
    setIsDeleting(true);
    deleteMutation.mutate(id);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{name}</CardTitle>
        <CardAction className="flex gap-2">
          <Button
            className="cursor-pointer"
            size={"sm"}
            variant={"secondary"}
            onClick={() => setIsOpen(true)}
          >
            <ExpandIcon />
          </Button>
          <Button
            className="cursor-pointer"
            size={"sm"}
            variant={"secondary"}
            onClick={copyCode}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>

          <Button
            onClick={handleEdit}
            className="cursor-pointer"
            size={"sm"}
            variant={"secondary"}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleDelete}
            className="cursor-pointer"
            size={"sm"}
            variant={"destructive"}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full max-h-[400px]">
        <div className="w-full h-full">
          <SyntaxHighlighter
            className="h-full"
            language={language}
            style={oneDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </CardContent>

      <Modal title={name} open={isOpen} onOpenChange={setIsOpen} pathName={"full-view"} >
        <div className="w-full h-full max-h-[80vh]">
          <SyntaxHighlighter
            className="h-full"
            language={language}
            style={oneDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </Modal>
    </Card>
  );
}
