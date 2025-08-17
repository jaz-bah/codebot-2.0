"use client"
import { Toaster } from "@/components/ui/sonner";
import { boxShadowExamples } from "@/data/boxShadow";
import React from "react";
import { toast } from "sonner";

export default function page() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="py-2">
      <h2 className="text-2xl mb-2">Box Shadow Examples</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {boxShadowExamples.map((example, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-md shadow-md flex items-center justify-center cursor-pointer"
            onClick={() => copyToClipboard(example)}
          >
            <div
              className="bg-white h-30 w-30 rounded-md flex items-center justify-center"
              style={{ boxShadow: example }}
            >
              <span className="text-2xl font-bold text-black">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <Toaster/>
    </div>
  );
}
