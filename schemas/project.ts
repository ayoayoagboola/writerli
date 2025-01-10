import * as z from "zod";

// TODO: add validation for the create project form

export const CreateProjectSchema = z.object({
  title: z.string(),
  desc: z.string(),
  coverImg: z.any(),
});
