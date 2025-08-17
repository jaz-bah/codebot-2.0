"use client";

import { saveToolAction } from "@/actions/tool.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IToolPayload } from "@/types/tool.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  closeModal: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  note: z.string(),
  url: z.string().url({ message: "Please enter a valid url." }),
});

export function AddToolForm({ closeModal }: Props) {
  const queryClient = useQueryClient();

  // form intial values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      note: "",
      url: "",
    },
  });

  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tool add mutation
  const addToolMutation = useMutation({
    mutationFn: async (payload: IToolPayload) => saveToolAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      form.reset();
      closeModal();
      setIsSubmitting(false);
      toast.success("Tool added successfully");
    },
    onError: () => {
      form.reset();
      closeModal();
      setIsSubmitting(false);
      toast.error("Error adding tool");
    },
  });

  // handle submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    addToolMutation.mutate(values);
  }

  // handle cancel
  function onCancel() {
    form.reset();
    closeModal();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter file name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="note..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            type="reset"
            onClick={onCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
