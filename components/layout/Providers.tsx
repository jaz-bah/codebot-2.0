"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import Layout from "./Layout";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {pathName === "/signup" || pathName === "/signin" ? (
            <>{children}</>
          ) : (
            <Layout>{children}</Layout>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
