"use client";

import {
  Award,
  Calendar,
  ChevronRight,
  Folders,
  HelpCircle,
  Home,
  Plus,
  Settings,
  Shapes,
  Trash2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import CreateProject from "../projects/CreateProject";

// TODO: fix the layout

export function MainSidebar() {
  const { data: projects, error } = trpc.projects.getProjects.useQuery(); // get all projects

  if (error) {
    console.error("Error fetching projects: ", error);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <div className="text-xl font-semibold px-2 mb-4">writerli</div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/home"}>
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenu>
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Folders />
                        <span>Projects</span>
                        <ChevronRight className="transition-transform ml-auto group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {projects &&
                          Array.isArray(projects) &&
                          projects.map((project) => (
                            <SidebarMenuSubItem key={project.id}>
                              <SidebarMenuSubButton asChild>
                                <Link href={`/projects/${project.id}`}>
                                  <span>{project.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                    {/* need to fix this :(( */}
                    <SidebarMenuAction>
                      <CreateProject>
                        <Plus />
                      </CreateProject>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/media"}>
                    <Shapes />
                    <span>Media</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/stats"}>
                    <Award />
                    <span>Stats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/calendar"}>
                    <Calendar />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Trash2 />
                  <span>Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/settings"}>
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/help"}>
                    <HelpCircle />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
