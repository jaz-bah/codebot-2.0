import FlexWidthCalculator from "@/components/card/FlexWidthCalculator";
import FontRatioCalculator from "@/components/card/FontRatioCalculator";
import FontSizeCalculator from "@/components/card/FontSizeCalculator";
import RatioCalculator from "@/components/card/RatioCalculator";
import TextCompare from "@/components/card/TextCompare";
import TextTransform from "@/components/card/TextTransform";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 py-5 gap-2">
      {/* Flex width calculator */}
      <div className="col-span-3">
        <FlexWidthCalculator />
      </div>

      {/* ratio calculator */}
      <div className="col-span-3">
        <RatioCalculator />
      </div>

      {/* font ratio calculator */}
      <div className="col-span-3">
        <FontRatioCalculator />
      </div>

      {/* font size calculator */}
      <div className="col-span-3">
        <FontSizeCalculator />
      </div>

      {/* text transform */}
      <div className="col-span-5">
        <TextTransform />
      </div>

      {/* text compare */}
      <div className="col-span-5">
        <TextCompare />
      </div>

      {/* font size calculator */}
      <div className="col-span-2">
        <Card className="p-2">
          <Button asChild>
            <Link href={"/box-shadow"}>Box Shadow</Link>
          </Button>

          <Button asChild>
            <Link href={"/gradient"}>Gradient</Link>
          </Button>

          <Button asChild>
            <Link href={"/glassmorphism"}>Glassmorphism</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
