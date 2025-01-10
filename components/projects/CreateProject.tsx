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

// TODO: refactor error + success functionality, images are not being uploaded

const CreateProject = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const { register, control } = form;

  const createProjectMutation = trpc.projects.createProject.useMutation({
    onSuccess: () => {
      toast.success("Project created successfully!");
    },
    onError: (error) => {
      toast.error(`Project creation failed: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    startTransition(() => {
      createProjectMutation.mutate({
        title: values.title,
        desc: values.desc,
      });
    });
  };

  return (
    <Dialog>
      <DialogTitle>Create a project</DialogTitle>
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
                    const file = e.target.files?.[0]; // Use optional chaining to safely access the first file
                    if (file) {
                      field.onChange(file); // Pass the file to the form field if it's not null
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
