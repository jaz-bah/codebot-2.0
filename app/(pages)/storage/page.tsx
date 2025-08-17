"use client";
import {
  deleteStorageAction,
  getStoragesAction,
} from "@/actions/storage.action";
import CodePreview from "@/components/card/CodePreview";
import { AddStorageForm } from "@/components/form/AddStorageForm";
import Loader from "@/components/layout/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { IStorageResponse } from "@/types/storage.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function Page() {
  // states
  const [editCode, setEditCode] = useState<IStorageResponse | null>(null);

  // get all storages
  const { data: storages, isLoading } = useQuery({
    queryKey: ["storage"],
    queryFn: () => getStoragesAction(),
  });

  // handle edit
  const handleEdit = (storage: IStorageResponse) => {
    setEditCode(storage);
  };

  return (
    <div className="py-4">
      <div className="flex w-full mb-5">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="w-full">
            <AddStorageForm
              editCode={editCode}
              setEditCode={() => setEditCode(null)}
            />
          </CardContent>
        </Card>
      </div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {storages?.map((storage: IStorageResponse) => (
          <CodePreview
            key={storage._id}
            id={storage._id}
            name={storage.language}
            language={storage.language}
            code={storage.code}
            handleEdit={() => handleEdit(storage)}
            deleteAction={() => deleteStorageAction(storage._id)}
            queryKey={"storage"}
          />
        ))}
      </div>
    </div>
  );
}
