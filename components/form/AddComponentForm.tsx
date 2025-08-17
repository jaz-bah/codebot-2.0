"use client";

import { createComponentAction } from "@/actions/component.action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IComponentPayload } from "@/types/component.type";
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
  preview: z.instanceof(File),
  url: z.string().url({ message: "Please enter a valid url." }),
});

export function AddComponentForm({ closeModal }: Props) {
  const queryClient = useQueryClient();

  //states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // form intial values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      preview: undefined,
      url: "",
    },
  });

  // add component mutation
  const addComponentMutation = useMutation({
    mutationFn: (payload: IComponentPayload) => createComponentAction(payload),
    onSuccess: () => {
      toast.success("Component created successfully");
    },
    onError: () => {
      toast.error("Failed to create component");
    },
    onSettled: () => {
      form.reset();
      closeModal();
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["components"] });
    }
  });

  // handle submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    addComponentMutation.mutate(values);
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
              <FormLabel>Component Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter file name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preview</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Select preview image"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                  }}
                />
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
              <FormLabel>Sandbox url</FormLabel>
              <FormControl>
                <Input placeholder="Enter url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button className="cursor-pointer" type="reset" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
