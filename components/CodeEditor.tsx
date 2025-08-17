"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleEditorDidMount } from "@/helper/EditorMount";
import { ICodeData } from "@/types/global.type";
import Editor from "@monaco-editor/react";
import { useState } from "react";

const options = [
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "TypeScript",
    value: "typescript",
  },
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "Scss",
    value: "scss",
  },
  {
    label: "JSON",
    value: "json",
  },
];

interface Props {
  value?: string;
  currentLanguage?: string;
  setCodeData: (codeData: ICodeData) => void;
}

export default function CodeEditor({ setCodeData, value, currentLanguage }: Props) {
  // state
  const [language, setLanguage] = useState(currentLanguage || "javascript");

  // handle change
  const onChange = (value: string) => {
    setCodeData({ language, code: value });
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        <Select onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={language} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Editor
        height="400px"
        defaultLanguage={language}
        onMount={handleEditorDidMount}
        value={value ? value : "// Write your code here..."}
        onChange={(value) => onChange(value || "")}
        options={{
          lineNumbers: "on",
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}
