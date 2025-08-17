import { OnMount } from "@monaco-editor/react";

export const handleEditorDidMount: OnMount = (editor, monaco) => {
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "f8f8f2" },
      { token: "comment", foreground: "6272a4", fontStyle: "italic" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "number", foreground: "bd93f9" },
      { token: "string", foreground: "f1fa8c" },
      { token: "identifier", foreground: "50fa7b" },
      { token: "variable", foreground: "8be9fd" },
      { token: "type", foreground: "8be9fd" },
      { token: "delimiter", foreground: "f8f8f2" },
    ],
    colors: {
      "editor.foreground": "#f8f8f2",
      "editor.background": "#282a36",
      "editorCursor.foreground": "#f8f8f0",
      "editor.lineHighlightBackground": "#44475a",
      "editorLineNumber.foreground": "#6272a4",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a88",
    },
  });

  monaco.editor.setTheme("dracula");
};