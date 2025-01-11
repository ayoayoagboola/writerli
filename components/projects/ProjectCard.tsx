"use client"

import { Project } from "@/types/project";
import { MoreVertical } from "lucide-react";
import ProjectThumbnail from "./ProjectThumbnail";

// TODO: add image support + fix the layout

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

  return (
    <div className="flex bg-slate-50 rounded-xl p-3 border border-slate-300 w-96 items-center justify-center">
      <div className="flex flex-col w-full h-full gap-y-3 items-center justify-center">
        <div className="flex w-full h-[200px] rounded-xl">
          <div className="flex w-full h-full rounded-xl">
            {project.coverImg ? (
              <ProjectThumbnail coverImg={project.coverImg} />
            ) : (
              <div className="w-full h-full bg-slate-100 rounded-xl"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full items-start justify-between">
          <div className="font-bold">{project.title}</div>
          <div className="flex w-full items-center justify-between">
            <div className="text-xs text-slate-500">
              Last updated: {project.updatedAt.toLocaleString()}
            </div>
            <div>
              <MoreVertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
