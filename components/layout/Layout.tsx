"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import FloatingButtons from "./FloatingButtons";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TopButtons from "../TopButtons";
import { Toaster } from "../ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const pathNameSplit = pathName.split("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="h-15 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {pathNameSplit.length > 2 && (
              <Button className="cursor-pointer" size="sm" variant="ghost">
                <Link href={`/${pathNameSplit[1]}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            )}

            <p className="text-lg font-medium capitalize">
              {pathName !== "/" ? pathNameSplit[1] : "Home"}
            </p>
          </div>

          <div className="flex gap-2">
            <TopButtons />
          </div>
        </div>
        <div
          className={`${pathName.includes("/components/") || pathName.includes("/css-tree") ? "px-0" : "px-4"}`}

        >
          {children}
        </div>
        <FloatingButtons />
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
