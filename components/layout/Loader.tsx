import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="w-full flex items-center justify-center p-5">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
