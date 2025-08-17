"use client";

import { deletePresetAction, getPresetsAction } from "@/actions/preset.action";
import CodePreview from "@/components/card/CodePreview";
import { EditPresetForm } from "@/components/form/EditPresetForm";
import Loader from "@/components/layout/Loader";
import { Modal } from "@/components/modal/Modal";
import Collection from "@/components/section/Collection";
import { IPresetResponse } from "@/types/preset.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preset, setPreset] = useState<IPresetResponse | null>(null);

  // get presets
  const { data: presets, isLoading } = useQuery({
    queryKey: ["presets"],
    queryFn: () => getPresetsAction(),
  });

  // handle edit
  const handleEdit = (preset: IPresetResponse) => {
    setPreset(preset);
    setIsModalOpen(true);
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <Collection title="Presets">
        {isLoading && <Loader />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {presets &&
            presets?.map((preset: IPresetResponse) => (
              <CodePreview
                key={preset._id}
                queryKey={"presets"}
                id={preset._id}
                name={preset.name}
                code={preset.code}
                language={preset.language}
                deleteAction={(id) => deletePresetAction(id)}
                handleEdit={() => handleEdit(preset)}
              />
            ))}
        </div>
      </Collection>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Edit Preset"
        pathName={"presets"}
      >
        {preset && (
          <EditPresetForm
            closeModal={() => setIsModalOpen(false)}
            preset={preset}
          />
        )}
      </Modal>
    </div>
  );
}
