"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export default function FontRatioCalculator() {
  // states
  const [initialPx, setInitialPx] = useState<number>(0);
  const [initialVw, setInitialVw] = useState<number>(0);
  const [currentPx, setcurrentPx] = useState<number>(0);
  const [currentVw, setcurrentVw] = useState<number>(0);

  useEffect(() => {
    if (initialPx > 0 && initialVw > 0) {
      const newRatio = initialVw / initialPx;
      const newCurrentVw = currentPx * newRatio;
      setcurrentVw(newCurrentVw);
    } else {
      setcurrentVw(0);
    }
  }, [initialPx, initialVw, currentPx]);

  return (
    <Card className="w-full h-50 p-4">
      <CardTitle>Font Ratio</CardTitle>

      <CardContent className="p-0">
        <div className="flex gap-2">
          <div className="flex flex-col w-[50%] gap-2">
            <Input
              className="w-full"
              placeholder="px"
              type="number"
              onChange={(e) => setInitialPx(Number(e.target.value))}
            />
            <Input
              className="w-full"
              placeholder="px"
              type="number"
              onChange={(e) => setcurrentPx(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col w-[50%] gap-2">
            <Input
              className="w-full"
              placeholder="vw"
              type="number"
              onChange={(e) => setInitialVw(Number(e.target.value))}
            />
            <div className="flex items-center justify-center h-10">
              {currentVw && (
                <h2 className="text-center">{currentVw.toFixed(2)}vw</h2>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
