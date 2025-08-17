"use client";

import { deleteComponentAction, getComponentsAction } from "@/actions/component.action";
import ComponentCard from "@/components/card/ComponentCard";
import Loader from "@/components/layout/Loader";
import Collection from "@/components/section/Collection";
import { IComponentResponse } from "@/types/component.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";


export default function Page() {
  const queryClient = useQueryClient();
  
  // get all components
  const { data: components, isLoading } = useQuery<IComponentResponse[]>({
    queryKey: ["components"],
    queryFn: () => getComponentsAction(),
  });

  // deleting states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingComponentId, setDeletingComponentId] = useState<string | null>(null);

  // delete component mutation
  const deleteComponentMutation = useMutation({
    mutationFn: (id: string) => deleteComponentAction(id),
    onSuccess: () => {
      toast.success("Component deleted successfully");

    },
    onError: () => {
      toast.error("Failed to delete component");
    },
    onSettled: () => {
      setIsDeleting(false);
      setDeletingComponentId(null);
      queryClient.invalidateQueries({ queryKey: ["components"] });
    }
  });

  // handle delete
  function handleDelete(component: IComponentResponse) {
    setDeletingComponentId(component._id);
    setIsDeleting(true);
    deleteComponentMutation.mutate(component._id);
  }

  return (
    <div className="py-4">
      <Collection title="Components">
        {isLoading && <Loader />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {components && components.map((component: IComponentResponse) => (
            <ComponentCard
              key={component._id}
              component={component}
              onDelete={handleDelete}
              isDeleting={isDeleting}
              deletingComponentId={deletingComponentId}
            />
          ))}
        </div>
      </Collection>
    </div>
  );
}
