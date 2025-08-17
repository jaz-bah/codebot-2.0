import React from "react";

interface Porps {
    title: string;
    hasBar?: boolean
}
export default function Header({ title, hasBar = true }: Porps) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-sm md:text-lg xl:text-2xl font-bold">{title}</h1>
      {hasBar && <span className="w-10 md:w-50 h-0.5 rounded bg-white"></span>}
    </div>
  );
}
