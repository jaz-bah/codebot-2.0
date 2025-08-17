"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export default function FlexWidthCalculator() {
  // states
  const [count, setCount] = useState<number>(0);
  const [gap, setGap] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const newGap = ((count - 1) * gap) / count;
    const newGapString = `calc(${100 / count}% - ${newGap}px)`;

    if (newGap && newGap > 0) {
      setResult(newGapString);
    } else {
      setResult(null);
    }
  }, [count, gap]);

  return (
    <Card className="w-full h-50 p-4">
      <CardTitle>Flex Width</CardTitle>

      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col w-full gap-2">
            <Input
              className="w-full"
              placeholder="Count"
              type="number"
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <Input
              className="w-full"
              placeholder="Gap"
              type="number"
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-center w-full gap-2">
            {result && <h2 className="text-md font-bold">{result}</h2>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
