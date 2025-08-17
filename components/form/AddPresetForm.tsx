"use client";

import { savePresetAction } from "@/actions/preset.action";
import { Button } from "@/components/ui/button";
import { ICodeData } from "@/types/global.type";
import { IPresetPayload } from "@/types/preset.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CodeEditor from "../CodeEditor";
import { Input } from "../ui/input";

interface Props {
  closeModal: () => void;
}

export function AddPresetForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  // states
  const [code, setCode] = useState<ICodeData | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // save preset mutation
  const savePresetMutation = useMutation({
    mutationFn: async (payload: IPresetPayload) => savePresetAction(payload),
    onSuccess: () => {
      closeModal();
      setName("");
      setCode(null);
      queryClient.invalidateQueries({ queryKey: ["presets"] });
      toast.success("Preset created successfully");
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Faild to create preset");
      setIsSubmitting(false);
    },
  });

  // handle submit
  function onSubmit() {
    if (!code || !name) return;

    const newPreset: IPresetPayload = {
      name,
      ...code,
    };

    setIsSubmitting(true);
    savePresetMutation.mutate(newPreset);
  }

  // handle cancel
  function onCancel() {
    closeModal();
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex mb-5 w-full">
        <CodeEditor setCodeData={(value) => setCode(value)} />
      </div>

      <div className="flex justify-between gap-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
