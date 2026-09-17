"use client";
import {
  deleteExtensionAction,
  getExtensionsAction,
} from "@/actions/extension.action";
import Header from "@/components/Header";
import Loader from "@/components/layout/Loader";
import { JBTable } from "@/components/table/JBTable";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: extensions, isLoading } = useQuery({
    queryKey: ["extensions"],
    queryFn: () => getExtensionsAction(),
  }); 

  return (
    <div className="py-4 flex flex-col gap-4 w-4xl mx-auto max-w-full">
      <Header title="Extensions" />

      {isLoading && <Loader />}
      {extensions && (
        <JBTable
          queryKey="extensions"
          dataType="extension"
          tableData={extensions}
          deleteAction={deleteExtensionAction}
        />
      )}
    </div>
  );
}
