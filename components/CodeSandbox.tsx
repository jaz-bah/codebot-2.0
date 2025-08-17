// components/CodeSandbox.tsx
"use client";

import { Sandpack, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";

type TemplateType = "static" | "react" | "react-ts";

type CodeSandboxProps = {
  template: TemplateType;
  data: {
    [fileName: string]: string;
  };
};

export default function CodeSandbox({ template, data }: CodeSandboxProps) {
  const { listen } = useSandpack();

  const files: Record<string, { code: string }> = {};

  for (const fileName in data) {
    if (template === "static" && fileName === "index.html") {
      files[`/${fileName}`] = {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Preview</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    ${data[fileName]}
    <script src="script.js"></script>
  </body>
</html>`,
      };
    } else {
      files[`/${fileName}`] = { code: data[fileName] };
    }
  }

  useEffect(() => {
    // listens for any message dispatched between sandpack and the bundler
    const stopListening = listen((msg) => console.log(msg));

    return () => {
      // unsubscribe
      stopListening();
    };
  }, [listen]);

  return (
    <div style={{ height: "100vh" }}>
      <Sandpack template={template} theme="dark" files={files} />
    </div>
  );
}
