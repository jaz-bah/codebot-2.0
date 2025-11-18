import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Blocks,
  Braces,
  Code,
  Component,
  File,
  GitFork,
  MemoryStick,
  PencilRuler,
  SquareChevronRight,
  Workflow,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Files",
    url: "/files",
    icon: File,
  },
  {
    title: "Components",
    url: "/components",
    icon: Component,
  },
  {
    title: "Presets",
    url: "/presets",
    icon: Code,
  },
  {
    title: "Storage",
    url: "/storage",
    icon: MemoryStick,
  },
  {
    title: "Tools",
    url: "/tools",
    icon: PencilRuler,
  },
  {
    title: "Extensions",
    url: "/extensions",
    icon: Blocks,
  },
  {
    title: "CSS Tree",
    url: "/css-tree",
    icon: GitFork,
  },
  {
    title: "Commands",
    url: "/commands",
    icon: SquareChevronRight,
  },
  {
    title: "IDE Snippets",
    url: "/ide-snippets",
    icon: Braces,
  },
  {
    title: "Workplace",
    url: "/workplace",
    icon: Workflow,
  },
];

export function AppSidebar() {
  const session = useSession();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col gap-4">
        <SidebarHeader className="p-0">
          <Link
            href="/"
            className="flex items-center justify-center h-15 border-b border-border"
          >
            <h1 className="text-3xl font-medium">CodeBot</h1>
          </Link>
        </SidebarHeader>
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={pathname === item.url ? "bg-accent" : ""}
                  >
                    <Link href={item.url} prefetch={true}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          {session.data?.user && (
            <h2 className="text-center text-xl">{session.data.user.email}</h2>
          )}
          <div className="flex gap-2">
            <Button
              className="cursor-pointer flex-1"
              variant={"destructive"}
              onClick={() => signOut()}
            >
              Log out
            </Button>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
