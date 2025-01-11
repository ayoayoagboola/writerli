import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

// TODO: add more project-related procedures (delete project, update project, etc.)

export const projectRouter = router({
  // TODO: fix createProject
  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string(),  
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, desc } = input;

      console.log("Received input: ", input); // Log to see the content

      if (!ctx.user || !ctx.user.id) {
        return { error: "You need to be logged in to fetch your projects!" };
      }

      try {
        const project = await ctx.db
          .insert(projects)
          .values({
            userId: ctx.user.id,
            title,
            desc,
            coverImg: null // Store the temporary image path
          })
          .returning();

          if (!project) {
            return { error: "Failed to create the project!" };
          }
  
          const projectId = project[0].id;
          return { success: true, projectId }; // Return projectId for file upload
      } catch (err) {
        console.error("Error creating project:", err);
        return { error: "Something went wrong while creating your project!" };
      }
    }),

    updateProjectImage: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        coverImgUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, coverImgUrl } = input;

      if (!ctx.user || !ctx.user.id) {
        return { error: "You need to be logged in to update the project!" };
      }

      try {
        await ctx.db
          .update(projects)
          .set({ coverImg: coverImgUrl })
          .where(eq(projects.id, projectId));

        return { success: "Project image updated!" };
      } catch (err) {
        console.error("Error updating project image:", err);
        return { error: "Failed to update project image!" };
      }
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user || !ctx.user.id) {
      return { error: "You need to be logged in to fetch your projects!" };
    }

    try {
      const projectList = await ctx.db.query.projects.findMany({
        where: eq(projects.userId, ctx.user.id),
      });
      return projectList;
    } catch (error) {
      console.error("Error: ", error);
      return { error: "Something went wrong while fetching your projects!" };
    }
  }),
});
