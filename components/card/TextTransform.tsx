"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "../ui/textarea";
import { textTransform } from "@/helper/helper";
import { Button } from "../ui/button";

export default function TextTransform() {
  // states
  const [formate, setFormate] = useState("uppercase");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const formatedText = textTransform(input, formate);
    setOutput(formatedText);
  }, [formate, input]);

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between">
        <CardTitle>Text Transform</CardTitle>
        <Button onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
      </div>
      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          <ToggleGroup
            type="single"
            variant={"outline"}
            value={formate}
            onValueChange={setFormate}
          >
            <ToggleGroupItem value="uppercase">Uppercase</ToggleGroupItem>
            <ToggleGroupItem value="capitalize">Capitalize</ToggleGroupItem>
            <ToggleGroupItem value="lowercase">Lowercase</ToggleGroupItem>
            <ToggleGroupItem value="camelcase">Camelcase</ToggleGroupItem>
            <ToggleGroupItem value="kebabcase">Kebabcase</ToggleGroupItem>
            <ToggleGroupItem value="snakecase">Snakecase</ToggleGroupItem>
          </ToggleGroup>

          <Textarea value={input} onChange={(e) => setInput(e.target.value)} />

          <div className="p-5">
            <h2 className="text-md text-center">{output}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
