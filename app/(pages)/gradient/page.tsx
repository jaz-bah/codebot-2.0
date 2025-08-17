"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, Copy, Plus, RotateCcw, X } from "lucide-react";
import React, { useRef, useState } from "react";

type GradientType = "linear" | "radial";

type IColorStop = {
  id: string;
  color: string;
  position: number;
  opacity: number;
};

export default function Page() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState<number>(90);
  const [colorStops, setColorStops] = useState<IColorStop[]>([
    { id: "1", color: "#ff9a9e", position: 0, opacity: 100 },
    { id: "2", color: "#fecfef", position: 100, opacity: 100 },
  ]);
  const [backgroundGradient, setBackgroundGradient] = useState<string>("");
  const [activeColorStop, setActiveColorStop] = useState<string>("1");

  const sliderRef = useRef<HTMLDivElement>(null);

  // Convert hex color to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  // Generate gradient CSS
  const generateGradient = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stops = sortedStops
      .map((stop) => `${hexToRgba(stop.color, stop.opacity)} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stops})`;
    } else {
      return `radial-gradient(circle, ${stops})`;
    }
  };

  // Create a handler function
  const handleGradientChange = () => {
    setBackgroundGradient(generateGradient());
  };

  // Add color stop
  const addColorStop = (position?: number) => {
    const newPosition = position ?? 50;
    const newId = Date.now().toString();
    const newStop: IColorStop = {
      id: newId,
      color: "#000000",
      position: newPosition,
      opacity: 100, // Default full opacity
    };
    setColorStops((prev) => [...prev, newStop]);
    setActiveColorStop(newId);
    handleGradientChange();
  };

  // Remove color stop
  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops((prev) => prev.filter((stop) => stop.id !== id));
      if (activeColorStop === id) {
        setActiveColorStop(colorStops[0]?.id || "");
      }
      handleGradientChange();
    }
  };

  // Update color stop
  const updateColorStop = (
    id: string,
    property: keyof Omit<IColorStop, "id">,
    value: string | number
  ) => {
    setColorStops((prev) =>
      prev.map((stop) =>
        stop.id === id ? { ...stop, [property]: value } : stop
      )
    );
    handleGradientChange();
  };

  // Get active color stop
  const getActiveColorStop = () => {
    return colorStops.find((stop) => stop.id === activeColorStop);
  };

  // Handle slider click to add color stop
  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const position = Math.round(
        ((event.clientX - rect.left) / rect.width) * 100
      );
      addColorStop(Math.max(0, Math.min(100, position)));
    }
  };

  // Copy CSS to clipboard
  const copyCss = async () => {
    const css = `background: ${backgroundGradient};`;
    try {
      await navigator.clipboard.writeText(css);
      console.log("Copied to clipboard:", css);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Reset to default
  const resetGradient = () => {
    setGradientType("linear");
    setAngle(90);
    setColorStops([
      { id: "1", color: "#ff9a9e", position: 0, opacity: 100 },
      { id: "2", color: "#fecfef", position: 100, opacity: 100 },
    ]);
    setActiveColorStop("1");
  };

  // Transparency background styles (separated to avoid conflicts)
  const transparencyBackgroundStyle = {
    backgroundImage:
      "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
  };

  const colorStopTransparencyStyle = (stop: IColorStop) => ({
    backgroundColor: hexToRgba(stop.color, stop.opacity),
    ...(stop.opacity < 100
      ? {
        backgroundImage:
          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "4px 4px",
        backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
      }
      : {}),
  });

  return (
    <div className="min-h-screen py-2">
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Left Panel - Controls */}
        <Card className="lg:w-80 p-6 space-y-2">
          {/* Gradient Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Type</Label>
            <div className="flex gap-2">
              <Button
                variant={gradientType === "linear" ? "default" : "outline"}
                onClick={() => setGradientType("linear")}
                className="flex-1"
                size="sm"
              >
                Linear
              </Button>
              <Button
                variant={gradientType === "radial" ? "default" : "outline"}
                onClick={() => setGradientType("radial")}
                className="flex-1"
                size="sm"
              >
                Radial
              </Button>
            </div>
          </div>

          {/* Direction/Angle */}
          {gradientType === "linear" && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Direction</Label>

              {/* Direction Buttons */}
              <div className="grid grid-cols-3 gap-1 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(315)}
                >
                  <ArrowUpLeft />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAngle(0)}>
                  <ArrowUp />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(45)}
                >
                  <ArrowUpRight />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(270)}
                >
                  <ArrowLeft />
                </Button>
                <div className="w-8 h-8"></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(90)}
                >
                  <ArrowRight />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(225)}
                >
                  <ArrowDownLeft />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(180)}
                >
                  <ArrowDown />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAngle(135)}
                >
                  <ArrowDownRight />
                </Button>
              </div>

              {/* Angle Input */}
              <div className="space-y-2">
                <Label className="text-xs">Angle: {angle}°</Label>
                <Input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(e.target.valueAsNumber)}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Colors</Label>

            {/* Color Stops List */}
            <div className="space-y-2">
              {colorStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`flex items-center gap-3 p-2 rounded-lg border-2 transition-colors ${activeColorStop === stop.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  onClick={() => setActiveColorStop(stop.id)}
                >
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded border-2 border-white shadow-sm cursor-pointer"
                      style={colorStopTransparencyStyle(stop)}
                    />
                  </div>
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) =>
                      updateColorStop(stop.id, "color", e.target.value)
                    }
                    className="w-0 h-0 opacity-0 absolute"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-mono">
                      {stop.color.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stop.opacity}% opacity
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 w-10 text-right">
                    {stop.position}%
                  </div>
                  {colorStops.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeColorStop(stop.id);
                      }}
                      className="w-6 h-6 p-0 text-gray-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Color Button */}
            <Button
              onClick={() => addColorStop()}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Plus size={14} className="mr-1" />
              Add Color
            </Button>
          </div>

          {/* Active Color Controls */}
          {getActiveColorStop() && (
            <div className="space-y-4">
              {/* Position Control */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Position</Label>
                <div className="space-y-2">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getActiveColorStop()?.position || 0}
                    onChange={(e) =>
                      updateColorStop(
                        activeColorStop,
                        "position",
                        e.target.valueAsNumber
                      )
                    }
                    className="w-full"
                  />
                  <div className="text-xs">
                    Position: {getActiveColorStop()?.position}%
                  </div>
                </div>
              </div>

              {/* Opacity Control */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Opacity</Label>
                <div className="space-y-2">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getActiveColorStop()?.opacity || 100}
                    onChange={(e) =>
                      updateColorStop(
                        activeColorStop,
                        "opacity",
                        e.target.valueAsNumber
                      )
                    }
                    className="w-full"
                  />
                  <div className="text-xs">
                    Opacity: {getActiveColorStop()?.opacity}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Button onClick={copyCss} className="w-full" size="sm">
              <Copy size={14} className="mr-2" />
              Copy CSS
            </Button>
            <Button
              onClick={resetGradient}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <RotateCcw size={14} className="mr-2" />
              Reset
            </Button>
          </div>
        </Card>

        {/* Right Panel - Preview */}
        <Card className="flex-1 p-6">
          {/* Preview */}
          <div className="mb-6">
            <Label className="text-sm font-semibold mb-3 block">Preview</Label>
            <div
              className="w-full h-80 rounded-lg shadow-lg"
              style={transparencyBackgroundStyle}
            >
              <div
                className="w-full h-full rounded-lg"
                style={{ backgroundImage: backgroundGradient }}
              />
            </div>
          </div>

          {/* Gradient Slider */}
          <div className="mb-6">
            <Label className="text-sm font-semibold mb-3 block">
              Color Stops
            </Label>
            <div
              ref={sliderRef}
              className="relative h-6 shadow-inner cursor-pointer rounded"
              style={{ backgroundImage: backgroundGradient }}
              onClick={handleSliderClick}
            >
              {/* Color Stop Handles */}
              {colorStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`absolute top-0 w-3 h-full border-2 cursor-pointer shadow-lg transition-all rounded ${activeColorStop === stop.id
                    ? "border-white scale-125 z-10"
                    : "border-gray-300"
                    }`}
                  style={{
                    left: `calc(${stop.position}% - 6px)`,
                    backgroundColor: stop.color,
                    opacity: stop.opacity / 100,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorStop(stop.id);
                  }}
                />
              ))}
            </div>
            <div className="text-xs mt-1">
              Click on the gradient to add a color stop
            </div>
          </div>

          {/* CSS Output */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">CSS</Label>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div>background: {backgroundGradient};</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
