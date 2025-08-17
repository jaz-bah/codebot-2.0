"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toFraction } from "@/helper/helper";

export default function RatioCalculator() {
  // states
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [ratio, setRatio] = useState<string>("0");

  useEffect(() => {
    if (width > 0 && height > 0) {
      const newRatio = width / height;
      const fraction = toFraction(newRatio);
      setRatio(fraction);
    } else {
      setRatio("0");
    }
  }, [width, height]);

  return (
    <Card className="w-full h-50 p-4">
      <CardTitle>Ratio</CardTitle>

      <CardContent className="p-0">
        <div className="flex">
          <div className="flex flex-col w-[60%] gap-2">
            <Input
              className="w-full"
              placeholder="Width"
              type="number"
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            <Input
              className="w-full"
              placeholder="Height"
              type="number"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-center w-[40%] gap-2">
            <h2 className="text-md font-bold">{ratio}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
