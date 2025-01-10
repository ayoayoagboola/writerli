"use client";

import { trpc } from "@/app/_trpc/client";
import CreateProject from "@/components/projects/CreateProject";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";

// TODO: add error handling + loading state, add image support

const ProjectsPage = () => {
  const {
    data: projects,
    error,
    isLoading,
  } = trpc.projects.getProjects.useQuery(); // get all projects

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <CreateProject>
        <Button>Create project</Button>
      </CreateProject>
      <div className="flex gap-4 p-8">
        {projects && Array.isArray(projects) &&
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
