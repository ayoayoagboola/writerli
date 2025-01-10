import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { supabase } from "@/lib/supabase";

// TODO: add more project-related procedures (delete project, update project, etc.)

export const projectRouter = router({
  // TODO: fix createProject
  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string(),
        coverImg: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, desc, coverImg } = input;
      console.log("input: ", input);

      if (!ctx.user || !ctx.user.id) {
        return { error: "You need to be logged in to fetch your projects!" };
      }

      const filePath = `public/${ctx.user.id}/projects/cover`;

      try {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(filePath, coverImg);

        console.log("asdfasdf: ", data);

        if (error) {
          return { error: "Something went wrong while uploading your image!" };
        }

        const project = await ctx.db
          .insert(projects)
          .values({
            userId: ctx.user.id,
            title,
            desc,
            coverImg: data.path,
          })
          .returning();

        if (!project) {
          return { error: "Something went wrong while creating your project!" };
        }

        const projectId = project[0].id;
        const updatedFilePath = `public/${ctx.user.id}/projects/${projectId}/cover_img`; // New path including project ID

        const { error: moveError } = await supabase.storage
          .from("images")
          .move(data.path, updatedFilePath);

        if (moveError) {
          return { error: "Failed to move the image to the correct path!" };
        }

        // Update the project record with the correct image path
        await ctx.db
          .update(projects)
          .set({
            coverImg: updatedFilePath,
          })
          .where(eq(projects.id, projectId));

        return { success: "Account created successfully!" };
      } catch {
        return { error: "Something went wrong while creating your account!" };
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
