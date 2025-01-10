"use client";

import * as z from "zod";

import Link from "next/link";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Header } from "../ui/header";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Social } from "./Social";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Label } from "../ui/label";

// TODO: refactor error + success functionality

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { register, getValues } = form;

  const registerMutation = trpc.users.register.useMutation({
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      console.log(values, getValues());
      registerMutation.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
    });
  };
  return (
    <Card className="flex-col p-8 rounded-[24px]">
      <div className="mb-2">
        <Header title={"Welcome Back!"} label={"Cogito, ergo sum."} />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-4">
          <div className="gap-y-2">
            <Label>First Name</Label>
            <Input
              placeholder="John"
              type="text"
              disabled={isPending}
              {...register("firstName")}
            />
          </div>
          <div className="gap-y-2">
            <Label>Last Name</Label>
            <Input
              placeholder="Smith"
              type="text"
              disabled={isPending}
              {...register("lastName")}
            />
          </div>
          <div className="gap-y-2">
            <Label>Email</Label>
            <Input
              placeholder="john.smith@example.com"
              type="email"
              disabled={isPending}
              {...register("email")}
            />
          </div>
          <div className="gap-y-2">
            <Label>Password</Label>
            <Input
              placeholder="******"
              type="password"
              disabled={isPending}
              {...register("password")}
            />
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          <p>Submit</p>
        </Button>
      </form>

      <Social />
      <Link href="/login">
        <p className="text-sm">Already have an account?</p>
      </Link>
    </Card>
  );
};
