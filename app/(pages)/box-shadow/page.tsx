"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type IBoxShadow = {
  position: "inset" | "outset";
  horizontal: number;
  vertical: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
};

export default function BoxShadowGenerator() {
  // States
  const [boxShadow, setBoxShadow] = useState<string>(
    "0px 10px 15px -3px rgba(0,0,0,0.1)"
  );
  const [layoutBackground, setLayoutBackground] = useState<string>("#f3f4f6");
  const [boxBackground, setBoxBackground] = useState<string>("#ffffff");
  const [boxRadius, setBoxRadius] = useState<number>(20);

  // States shadow
  const [boxShadowList, setBoxShadowList] = useState<IBoxShadow[]>([
    {
      position: "outset",
      horizontal: 0,
      vertical: 10,
      blur: 15,
      spread: -3,
      color: "#000000",
      opacity: 10,
    },
  ]);

  // Generate box shadow CSS from list
  const generateBoxShadow = () => {
    const shadows = boxShadowList.map((shadow) => {
      const { position, horizontal, vertical, blur, spread, color, opacity } =
        shadow;
      const rgbaColor = hexToRgba(color, opacity / 100);
      const insetStr = position === "inset" ? "inset " : "";
      return `${insetStr}${horizontal}px ${vertical}px ${blur}px ${spread}px ${rgbaColor}`;
    });
    return shadows.join(", ");
  };

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Update box shadow when list changes
  const handleBoxShadowChange = () => {
    setBoxShadow(generateBoxShadow());
  };

  // Update shadow property
  const updateShadow = (
    index: number,
    property: keyof IBoxShadow,
    value: number | string
  ) => {
    setBoxShadowList((prev) =>
      prev.map((shadow, i) =>
        i === index ? { ...shadow, [property]: value } : shadow
      )
    );
    handleBoxShadowChange();
  };

  // Add new shadowO
  const addShadow = () => {
    setBoxShadowList((prev) => [
      ...prev,
      {
        position: "outset",
        horizontal: 0,
        vertical: 5,
        blur: 10,
        spread: 0,
        color: "#000000",
        opacity: 20,
      },
    ]);
  };

  // Remove shadow
  const removeShadow = (index: number) => {
    setBoxShadowList((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset all shadows
  const resetShadows = () => {
    setBoxShadowList([
      {
        position: "outset",
        horizontal: 0,
        vertical: 10,
        blur: 15,
        spread: -3,
        color: "#000000",
        opacity: 10,
      },
    ]);
    setBoxRadius(20);
    setLayoutBackground("#f3f4f6");
    setBoxBackground("#ffffff");
  };

  // Copy CSS to clipboard
  const copyCss = async () => {
    const css = `box-shadow: ${boxShadow};`;
    try {
      await navigator.clipboard.writeText(css);
      // You could add a toast notification here
      console.log("Copied to clipboard:", css);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
        {/* Preview Section */}
        <div className="lg:col-span-5">
          <Card className="p-0">
            <CardContent className="p-0">
              <div
                className="p-10 rounded-lg flex items-center justify-center min-h-96"
                style={{ backgroundColor: layoutBackground }}
              >
                <div
                  className="w-60 h-60 transition-all duration-300"
                  style={{
                    boxShadow,
                    backgroundColor: boxBackground,
                    borderRadius: boxRadius + "px",
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="lg:col-span-3 space-y-4">
          {/* Box Customizer */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Box Customizer</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="layout-bg">Layout Background</Label>
                  <Input
                    id="layout-bg"
                    type="color"
                    value={layoutBackground}
                    onChange={(e) => setLayoutBackground(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="box-bg">Box Background</Label>
                  <Input
                    id="box-bg"
                    type="color"
                    value={boxBackground}
                    onChange={(e) => setBoxBackground(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="box-radius">Border Radius: {boxRadius}px</Label>
                <Input
                  id="box-radius"
                  type="range"
                  min="0"
                  max="100"
                  value={boxRadius}
                  onChange={(e) => setBoxRadius(e.target.valueAsNumber)}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={copyCss} variant="default" className="flex-1">
                  Copy CSS
                </Button>
                <Button
                  onClick={addShadow}
                  variant="default"
                  className="flex-1"
                >
                  Add Shadow
                </Button>
                <Button
                  onClick={resetShadows}
                  variant="destructive"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium">Generated CSS:</Label>
                <div className="bg-gray-900 text-green-400 p-3 rounded-md mt-2 font-mono text-sm overflow-x-auto">
                  box-shadow: {boxShadow};
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Box Shadow Customizers */}
        {boxShadowList.map((shadow, index) => (
          <div key={index} className="col-span-8 md:col-span-4 lg:col-span-2">
            <Card className="p-2 gap-2">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-0">
                <h3 className="text-md font-semibold">Shadow {index + 1}</h3>
                {boxShadowList.length > 1 && (
                  <Button
                    onClick={() => removeShadow(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </CardHeader>

              <CardContent className="space-y-2 p-0">
                {/* Position Toggle */}
                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        shadow.position === "outset" ? "default" : "outline"
                      }
                      onClick={() => updateShadow(index, "position", "outset")}
                      className="flex-1"
                      size="sm"
                    >
                      Outset
                    </Button>
                    <Button
                      variant={
                        shadow.position === "inset" ? "default" : "outline"
                      }
                      onClick={() => updateShadow(index, "position", "inset")}
                      className="flex-1"
                      size="sm"
                    >
                      Inset
                    </Button>
                  </div>
                </div>

                {/* Horizontal Offset */}
                <div>
                  <Label>Horizontal: {shadow.horizontal}px</Label>
                  <Input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.horizontal}
                    onChange={(e) =>
                      updateShadow(index, "horizontal", e.target.valueAsNumber)
                    }
                  />
                </div>

                {/* Vertical Offset */}
                <div>
                  <Label>Vertical: {shadow.vertical}px</Label>
                  <Input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.vertical}
                    onChange={(e) =>
                      updateShadow(index, "vertical", e.target.valueAsNumber)
                    }
                  />
                </div>

                {/* Blur Radius */}
                <div>
                  <Label>Blur: {shadow.blur}px</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={shadow.blur}
                    onChange={(e) =>
                      updateShadow(index, "blur", e.target.valueAsNumber)
                    }
                  />
                </div>

                {/* Spread Radius */}
                <div>
                  <Label>Spread: {shadow.spread}px</Label>
                  <Input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.spread}
                    onChange={(e) =>
                      updateShadow(index, "spread", e.target.valueAsNumber)
                    }
                  />
                </div>

                {/* Color and Opacity */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Input
                      type="color"
                      value={shadow.color}
                      onChange={(e) =>
                        updateShadow(index, "color", e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Opacity: {shadow.opacity}%</Label>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.opacity}
                      onChange={(e) =>
                        updateShadow(index, "opacity", e.target.valueAsNumber)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
