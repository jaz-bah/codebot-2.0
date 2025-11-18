"use client";
import CommandCard from "@/components/card/CommandCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { gitCommands } from "@/data/gitCommands";
import { vpsCommands } from "@/data/vpsCommands";
import { nextCommands } from "@/data/nextCommands";
import { ICommandCard } from "@/types/global.type";
import React, { useState } from "react";
import { shopifyCliCommands } from "@/data/shopifyCliCommands";
import { shopifyAppCommands } from "@/data/shopifyAppCommands";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [selected, setSelected] = useState("github");
  const [commands, setCommands] = useState(gitCommands);

  const handleTabs = (values: string) => {
    setSelected(values);
    if (values === "github") {
      setCommands(gitCommands);
    } else if (values === "vps") {
      setCommands(vpsCommands);
    } else if (values === "nextjs") {
      setCommands(nextCommands);
    } else if (values === "shopify-cli") {
      setCommands(shopifyCliCommands);
    } else if (values === "shopify-app") {
      setCommands(shopifyAppCommands);
    }
  };

  return (
    <div>
      {/* topbar */}
      <div className="py-2 mb-5 w-full">
        <ToggleGroup
          type="single"
          variant={"outline"}
          className="w-full hidden md:flex"
          defaultValue={selected}
          onValueChange={(value) => handleTabs(value)}
        >
          <ToggleGroupItem value="github">Github</ToggleGroupItem>
          <ToggleGroupItem value="vps">VPS</ToggleGroupItem>
          <ToggleGroupItem value="nextjs">Nextjs/React</ToggleGroupItem>
          <ToggleGroupItem value="shopify-cli">Shopify Cli</ToggleGroupItem>
          <ToggleGroupItem value="shopify-app">Shopify App</ToggleGroupItem>
        </ToggleGroup>

        <Select value={selected} onValueChange={handleTabs}>
          <SelectTrigger className="w-full md:hidden">
            <SelectValue placeholder="Select a command" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="github">Github</SelectItem>
              <SelectItem value="vps">VPS</SelectItem>
              <SelectItem value="nextjs">Nextjs/React</SelectItem>
              <SelectItem value="shopify-cli">Shopify Cli</SelectItem>
              <SelectItem value="shopify-app">Shopify App</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* command cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {commands.map((command: ICommandCard) => (
          <CommandCard key={command.title} command={command} />
        ))}
      </div>
    </div>
  );
}
