"use client"

import { generateCssTree } from "@/actions/cssTree.action";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { handleEditorDidMount } from "@/helper/EditorMount";
import { extractScssTree } from "@/helper/helper";
import { cssPrompt } from "@/prompt/cssPrompt";
import { scssPrompt } from "@/prompt/scssPrompt";
import { Editor } from '@monaco-editor/react';
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from 'react';
import { toast } from "sonner";

export default function Page() {
    // states
    const [valueHtml, setValueHtml] = useState<string | null>(null);
    const [valueCss, setValueCss] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cssType, setCssType] = useState("scss");


    // generate css tree mutation
    const cssTreeMutation = useMutation({
        mutationFn: async (html: string) => generateCssTree(html),
        onSuccess: (data) => {
            const scss = extractScssTree(data);
            setValueCss(scss);
            toast.success("Css tree generated successfully")
        },
        onError: () => {
            toast.error("Failed to generate css tree")
        },
        onSettled: () => {
            setIsSubmitting(false)
        }
    })

    // handle generate
    const handleGenerate = async () => {
        setIsSubmitting(true)
        let prompt = "";
        if (cssType === "scss") {
            prompt = scssPrompt(valueHtml || "");
        } else {
            prompt = cssPrompt(valueHtml || "");
        }
        cssTreeMutation.mutate(prompt);
    }

    return (
        <div className="w-full grid grid-cols-2">
            <div className="col-span-2 p-2">
                <div className="flex justify-end items-center gap-5">
                    <ToggleGroup className="border-1 border-gray-300" type="single" defaultValue="scss" onValueChange={setCssType}>
                        <ToggleGroupItem value="scss">Scss</ToggleGroupItem>
                        <ToggleGroupItem value="css">Css</ToggleGroupItem>
                    </ToggleGroup>
                    <Button onClick={handleGenerate} disabled={isSubmitting}>
                        {isSubmitting ? (<Loader2 className="h-4 w-4 animate-spin" />) : "Generate"}
                    </Button>
                </div>
            </div>
            <div className="col-span-1">
                <Editor
                    height="calc(100vh - 120px)"
                    defaultLanguage={"html"}
                    onMount={handleEditorDidMount}
                    value={valueHtml ? valueHtml : "//html here..."}
                    onChange={(value) => setValueHtml(value || "")}
                    options={{
                        lineNumbers: "on",
                        fontSize: 14,
                        minimap: { enabled: false },
                    }}
                />
            </div>
            <div className="col-span-1">
                <Editor
                    height="calc(100vh - 120px)"
                    defaultLanguage={"css"}
                    onMount={handleEditorDidMount}
                    value={valueCss ? valueCss : "/*css here...*/"}
                    onChange={(value) => setValueCss(value || "")}
                    options={{
                        lineNumbers: "on",
                        fontSize: 14,
                        minimap: { enabled: false },
                    }}
                />
            </div>
        </div>
    )
}
