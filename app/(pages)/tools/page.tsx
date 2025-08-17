"use client";
import { deleteToolAction, getToolsAction } from "@/actions/tool.action";
import Header from "@/components/Header";
import Loader from "@/components/layout/Loader";
import { JBTable } from "@/components/table/JBTable";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  // get tools
  const { data: tools, isLoading } = useQuery({
    queryKey: ["tools"],
    queryFn: () => getToolsAction(),
  });

  return (
    <div className="py-4 flex flex-col gap-4 w-full max-w-6xl mx-auto">
      <Header title="Tools" />

      {isLoading && <Loader />}

      {tools && (
        <JBTable
          queryKey="tools"
          dataType="tool"
          tableData={tools}
          actionType="download"
          deleteAction={deleteToolAction}
        />
      )}
    </div>
  );
}
