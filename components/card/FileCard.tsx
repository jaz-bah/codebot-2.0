import { Card, CardContent } from "@/components/ui/card";
import { handleDownload } from "@/helper/helper";
import { IFileResponse } from "@/types/file.type";
import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  file: IFileResponse;
  onDelete: (fileId: string) => void;
  isDeleting: boolean;
  deletingFileId: string | null;
}

export default function FileCard({ file, onDelete, isDeleting, deletingFileId }: Props) {

  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{file.name}</h1>
        <p className="text-sm text-muted-foreground">
          {file.note}
        </p>

        <div className="flex gap-2">
          <Button
            className="cursor-pointer flex-1"
            size={"sm"}
            onClick={() => handleDownload(file.url, file.name)}
          >
            Download
          </Button>
          <Button
            className="cursor-pointer"
            variant={"destructive"}
            size={"sm"}
            onClick={() => onDelete(file._id.toString())}
            disabled={isDeleting && deletingFileId === file._id.toString()}
          >
            {isDeleting && deletingFileId === file._id.toString() ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
