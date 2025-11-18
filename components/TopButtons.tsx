"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AddComponentForm } from "./form/AddComponentForm";
import { AddExtensionForm } from "./form/AddExtensionForm";
import { AddFileForm } from "./form/AddFileForm";
import { AddPresetForm } from "./form/AddPresetForm";
import { AddToolForm } from "./form/AddToolForm";
import { Modal } from "./modal/Modal";
import { Button } from "./ui/button";
import { AddSnippetForm } from "./form/AddSnippetForm";

export default function TopButtons() {
  const pathName = usePathname();
  const pathNameSplit = pathName.split("/");

  // states
  const [open, setOpen] = useState(false);

  const contents = {
    files: {
      title: "Add File",
      form: <AddFileForm closeModal={() => setOpen(false)} />,
    },
    components: {
      title: "Add Component",
      form: <AddComponentForm closeModal={() => setOpen(false)} />,
    },
    presets: {
      title: "Add Preset",
      form: <AddPresetForm closeModal={() => setOpen(false)} />,
    },
    tools: {
      title: "Add Tool",
      form: <AddToolForm closeModal={() => setOpen(false)} />,
    },
    extensions: {
      title: "Add Extension",
      form: <AddExtensionForm closeModal={() => setOpen(false)} />,
    },
    "ide-snippets": {
      title: "Add Snippet",
      form: <AddSnippetForm closeModal={() => setOpen(false)} />,
    },
  };

  if (!pathNameSplit[1]) return null;
  const currentContent = contents[pathNameSplit[1] as keyof typeof contents];
  if (!currentContent) return null;

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        <span className="hidden md:block">{currentContent.title}</span>
        <Plus className="h-4 w-4" />
      </Button>

      <Modal open={open} onOpenChange={setOpen} title={currentContent.title} pathName={pathNameSplit[1]}>
        <div className="py-2">{currentContent.form}</div>
      </Modal>
    </>
  );
}
