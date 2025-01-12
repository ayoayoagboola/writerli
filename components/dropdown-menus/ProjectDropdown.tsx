import copy from "copy-to-clipboard";
import {
  ExternalLink,
  Image as ImageIcon,
  Link as LinkIcon,
  Palette,
  PenLine,
  Star,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Project } from "@/types/project";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import Link from "next/link";

// TODO: finalize actions 

interface ProjectDropdownProps {
  children: React.ReactNode;
  project: Project;
}

const ProjectDropdown = ({ children, project }: ProjectDropdownProps) => {
  const deleteProject = trpc.projects.deleteProject.useMutation({
    onSuccess: () => {
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Project deletion failed: ${error.message}`);
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem>
          <Star />
          Add to Favorites
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PenLine />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ImageIcon />
          Edit Project Image
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Palette />
          Edit Thumbnail Color
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/projects/${project.id}`} target="_blank" className="flex w-full h-full">
            <ExternalLink />
            Open in new tab
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            copy(`http://localhost:3000/projects/${project.id}`);
            toast.success("Link copied to clipboard!");
          }}
        >
          {/* for local development */}
          <LinkIcon />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 stroke-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
          onClick={() => deleteProject.mutate({ id: project.id })}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectDropdown;
