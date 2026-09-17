"use client";
import {
  deleteExtensionAction,
  getExtensionsAction,
} from "@/actions/extension.action";
import Header from "@/components/Header";
import Loader from "@/components/layout/Loader";
import CommingSoon from "@/components/section/CommingSoon";
import { JBTable } from "@/components/table/JBTable";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: extensions, isLoading } = useQuery({
    queryKey: ["extensions"],
    queryFn: () => getExtensionsAction(),
  }); 

  return (
    <div className="w-full h-full">
      {/* <Header title="Extensions" />

      {isLoading && <Loader />}
      {extensions && (
        <JBTable
          queryKey="extensions"
          dataType="extension"
          tableData={extensions}
          deleteAction={deleteExtensionAction}
        />
      )} */}
      <CommingSoon />
    </div>
  );
}
