import ComponentEditor from "@/components/section/ComponentEditor";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ComponentEditor componentId={id} />
    </div>
  );
}
