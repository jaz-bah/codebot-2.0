"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, Copy, Edit, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import { EditToolForm } from "../form/EditToolForm";
import { Modal } from "../modal/Modal";
import { ITableData } from "@/types/global.type";
import Link from "next/link";
import { EditExtensionForm } from "../form/EditExtensionForm";

interface Props {
  tableData: ITableData[];
  dataType: "extension" | "tool";
  queryKey: string;
  actionType?: "copy" | "download";
  deleteAction: (id: string) => void;
}

export function JBTable({
  dataType,
  actionType = "copy",
  tableData,
  deleteAction,
  queryKey,
}: Props) {
  const queryClient = useQueryClient();
  // states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [editModalState, setEditModalState] = useState(false);
  const [editData, setEditData] = useState<ITableData | null>(null);

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Deleted successfully");
      setIsDeleting(false);
      setIsDeletingId(null);
    },
    onError: () => {
      setIsDeleting(false);
      setIsDeletingId(null);
      toast.error("Error deleting");
    },
  });

  // handle delete
  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setIsDeletingId(id);
    await deleteMutation.mutateAsync(id);
  };

  // handle edit
  const handleEdit = (data: ITableData) => {
    setEditData(data);
    setEditModalState(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.note}</TableCell>
                  <TableCell className="text-right flex justify-end items-center gap-2">
                    {actionType === "copy" ? (
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant={"secondary"}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant={"secondary"}
                        asChild
                      >
                        <Link href={data.url} download={true}>
                          <ArrowDown className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}

                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant={"secondary"}
                      onClick={() => handleEdit(data)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant={"destructive"}
                      onClick={() => handleDelete(data._id)}
                      disabled={isDeleting && isDeletingId === data._id}
                    >
                      {isDeleting && isDeletingId === data._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        open={editModalState}
        onOpenChange={setEditModalState}
        title={dataType === "extension" ? "Edit Extension" : "Edit Tool"}
        pathName={dataType === "extension" ? "/extensions" : "/tools"}
      >
        {editData && (
          <>
            {dataType === "extension" ? (
              <EditExtensionForm
                closeModal={() => {
                  setEditModalState(false);
                  setEditData(null);
                }}
                initialValues={editData}
              />
            ) : (
              <EditToolForm
                closeModal={() => {
                  setEditModalState(false);
                  setEditData(null);
                }}
                initialValues={editData}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
}
