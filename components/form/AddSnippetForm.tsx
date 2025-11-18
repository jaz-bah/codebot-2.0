"use client";

import { saveSnippetAction } from "@/actions/snippet.action";
import { Button } from "@/components/ui/button";
import { ISnippetPayload } from "@/types/snippets.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface Props {
  closeModal: () => void;
}

export function AddSnippetForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  // states
  const [language, setLanguage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // save preset mutation
  const saveSnippetMutation = useMutation({
    mutationFn: async (payload: ISnippetPayload) => saveSnippetAction(payload),
    onSuccess: () => {
      closeModal();
      setLanguage("");
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      toast.success("Snippet created successfully");
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Faild to create snippet");
      setIsSubmitting(false);
    },
  });

  // handle submit
  function onSubmit() {
    if (!language) return;

    const newSnippet: ISnippetPayload = {
      language,
      code: "{}",
    };

    setIsSubmitting(true);
    saveSnippetMutation.mutate(newSnippet);
  }

  // handle cancel
  function onCancel() {
    closeModal();
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between gap-2">
        <Input
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            onClick={onCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
