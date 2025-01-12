"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CreateProjectSchema } from "@/schemas/project";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/text-area";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// TODO: refactor error + success functionality

const CreateProject = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const session = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: "",
      desc: "",
      coverImg: undefined,
    },
  });

  const { register, control, getValues } = form;

  const createProjectMutation = trpc.projects.createProject.useMutation({
    onSuccess: async (data) => {
      if ("projectId" in data) {
        // data is of type { success: boolean; projectId: string }
        const { projectId } = data;

        // Upload the file now that we have the project ID
        await handleFileUpload(projectId);
      } else {
        // data is of type { error: string }
        toast.error(`Error creating project: ${data.error}`);
      }
    },
    onError: (error) => {
      toast.error(`Project creation failed: ${error.message}`);
    },
  });

  const updateProjectImageMutation =
    trpc.projects.updateProjectImage.useMutation({
      onSuccess: () => {
        toast.success("Project image updated successfully!");
      },
      onError: (error) => {
        toast.error(`Project image update failed: ${error.message}`);
      },
    });

  const handleFileUpload = async (projectId: string) => {
    const { coverImg } = form.getValues();

    if (!coverImg) {
      toast.error("No cover image selected!");
      return;
    }

    try {
      const filePath = `${session.data?.user.id}/projects/${projectId}/cover.png`;

      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, coverImg, {
          upsert: true,
          headers: {
            Authorization: `Bearer ${session.data?.user.supabaseAccessToken}`, // Ensure the token is passed here
          },
        });

      if (error) {
        throw new Error("Failed to upload the image");
      }

      // Now update the project with the image path
      updateProjectImageMutation.mutate({
        projectId,
        coverImgUrl: filePath,
      });

      toast.success("Project created successfully!");
      router.push(`/projects/${projectId}`);
    } catch (error) {
      toast.error(`Error uploading image: ${error}`);
    }
  };

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    const { title, desc } = values;

    if (!session.data) {
      toast.error("You need to be logged in to create a project!");
      return;
    }

    console.log("Form values on submit:", values);
    startTransition(async () => {
      createProjectMutation.mutate({
        title,
        desc,
      });
    });
  };

  console.log(getValues("coverImg"));

  return (
    <Dialog>
      <DialogTitle className="hidden">Create a project</DialogTitle>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4 w-full"
        >
          <div className="w-full flex flex-col gap-y-1.5">
            <Controller
              name="coverImg"
              control={control}
              render={({ field }) => (
                <Input
                  id="coverImg"
                  type="file"
                  disabled={isPending}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file); // Pass the file to react-hook-form
                      console.log("File selected: ", file); // Log the file for debugging
                    }
                  }}
                />
              )}
            />

            <Input
              placeholder="Title"
              type="text"
              disabled={isPending}
              {...register("title")}
            />
            <Textarea
              placeholder="Description"
              disabled={isPending}
              {...register("desc")}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            Create project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
