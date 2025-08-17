import React from "react";
import Header from "../Header";


interface Props {
    title: string,
    hasBar?: boolean
    children: React.ReactNode
}

export default function Collection({ children, title }: Props) {
  return (
    <div className="flex flex-col gap-4 my-10">
      <Header title={title} />
        {children}
    </div>
  );
}
