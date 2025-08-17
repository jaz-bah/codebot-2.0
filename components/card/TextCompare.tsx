"use client";
import React, { JSX, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  compareCharacters,
  CompareResult,
  CharDiff,
} from "@/helper/textCompare";

export default function TextCompare(): JSX.Element {
  const [inputOne, setInputOne] = useState<string>("");
  const [inputTwo, setInputTwo] = useState<string>("");
  const [resultOne, setResultOne] = useState<JSX.Element[]>([]);
  const [resultTwo, setResultTwo] = useState<JSX.Element[]>([]);
  const [isIdentical, setIsIdentical] = useState<boolean | null>(null);

  const compareText = (): void => {
    const { diffs, identical }: CompareResult = compareCharacters(
      inputOne,
      inputTwo
    );
    setIsIdentical(identical);

    if (identical) {
      setResultOne([]);
      setResultTwo([]);
      return;
    }

    const renderedOne = diffs.map((diff: CharDiff, i: number) => (
      <span
        key={`one-${i}`}
        className={diff.same ? "" : "text-red-500/50"}
      >
        {diff.charOne}
      </span>
    ));

    const renderedTwo = diffs.map((diff: CharDiff, i: number) => (
      <span
        key={`two-${i}`}
        className={diff.same ? "" : "text-red-500/50 "}
      >
        {diff.charTwo}
      </span>
    ));

    setResultOne(renderedOne);
    setResultTwo(renderedTwo);
  };

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <CardTitle>Text Compare</CardTitle>
        <Button onClick={compareText}>Compare</Button>
      </div>
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Enter first text"
            value={inputOne}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputOne(e.target.value)
            }
          />
          <Textarea
            placeholder="Enter second text"
            value={inputTwo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputTwo(e.target.value)
            }
          />
        </div>

        {isIdentical !== null && (
          <div className="mt-4">
            {isIdentical ? (
              <p className="text-green-600 font-semibold">
                Texts are identical.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="p-2 border rounded">
                  <div className="flex flex-wrap whitespace-pre-wrap">
                    {resultOne}
                  </div>
                </div>
                <div className="p-2 border rounded">
                  <div className="flex flex-wrap whitespace-pre-wrap">
                    {resultTwo}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
