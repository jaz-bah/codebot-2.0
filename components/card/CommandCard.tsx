"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ICommand, ICommandCard } from "@/types/global.type";
import { toast } from "sonner";

interface Props {
  command: ICommandCard;
}

export default function CommandCard({ command }: Props) {
  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    toast.success("Command copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{command.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {command.commands.map((cmd: ICommand) => (
          <Badge
            key={cmd.cmd}
            className="w-full flex gap-2 flex-wrap justify-between items-center px-2 py-1 cursor-pointer text-sm/6 mb-2"
            variant={"outline"}
            onClick={() => handleCopy(cmd.cmd)}
          >
            <p className="">{cmd.cmd}</p>
            <p className="text-gray-500">{cmd.desc}</p>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
