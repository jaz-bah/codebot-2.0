import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Trash } from "lucide-react";
import { IComponentResponse } from "@/types/component.type";

interface Props {
  component: IComponentResponse;
  onDelete: (component: IComponentResponse) => void;
  isDeleting: boolean;
  deletingComponentId: string | null;
}

export default function ComponentCard({ component, onDelete, isDeleting, deletingComponentId }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="w-full aspect-[1/1]">
          <Image className="w-full h-full aspect-square object-cover" src={component.preview} alt="Beats" width={500} height={500} />
        </div>

        <h1 className="text-sm md:text-lg lg:text-2xl font-bold">{component.name}</h1>


        <div className="flex gap-2">
          <Button className="cursor-pointer flex-1" size={"sm"}>
            <Link className="w-full" href={component.url} target="_blank">Code</Link>
          </Button>

          <Button
            className="cursor-pointer"
            variant={"destructive"}
            size={"sm"}
            onClick={() => onDelete(component)}
            disabled={isDeleting && deletingComponentId === component._id}
          >
            {isDeleting && deletingComponentId === component._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
