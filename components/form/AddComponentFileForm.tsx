"use client";

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
import { IComponentFile } from "@/types/component.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  closeModal: () => void;
  addFile: (file: IComponentFile) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  language: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
});

export function AddComponentFileForm({ closeModal, addFile }: Props) {

  //states
  const [language, setLanguage] = useState("javascript");

  // form intial values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      language: language,
    },
  });

  // handle submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    addFile({
      name: values.name,
      language: values.language,
      code: "//code here",
    });
    onCancel();
  }

  // handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    form.setValue("language", value);
  };

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
          name="language"
          render={() => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language} />
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
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
