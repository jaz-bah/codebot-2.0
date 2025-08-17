"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFileAction } from "@/actions/file.action";
import { IFilePayload } from "@/types/file.type";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";


interface Props {
  closeModal: () => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  note: z.string(),
  file: z.instanceof(File)
});

export function AddFileForm({ closeModal }: Props) {

  const queryClient = useQueryClient();

  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // form intial values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      note: "",
      file: undefined,
    },
  });

  // add file mutation
  const addFileMutation = useMutation({
    mutationFn: (payload: IFilePayload) => addFileAction(payload),
    onSuccess: () => {
      toast.success("File added successfully");
    },
    onError: () => {
      toast.error("Error adding file");
    },
    onSettled: () => {
      onCancel();
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setIsSubmitting(false);
    },
  })


  // handle submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    addFileMutation.mutate({
      name: values.name,
      note: values.note,
      file: values.file as File,
    });
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload a file"
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

        <div className="flex justify-end gap-2">
          <Button className="cursor-pointer" type="reset" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<Loader2 className="h-10 w-10 animate-spin" />) : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
