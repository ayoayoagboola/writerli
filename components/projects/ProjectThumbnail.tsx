"use client";

import { trpc } from "@/app/_trpc/client";
import Image from "next/image";

// TODO: add cropping/editing of thumbnail image + color choices 

interface ProjectThumbnailProps {
  coverImg: string;
}

const ProjectThumbnail = ({ coverImg }: ProjectThumbnailProps) => {
  const { data } = trpc.images.getImage.useQuery({
    bucket: "images",
    path: coverImg,
  });

  if (!data || "error" in data) {
    return null;
  }

  return (
    <Image
      src={data.url.publicUrl}
      width={200}
      height={200}
      objectFit="cover"
      alt="Cover Image"
      className="w-full h-full rounded-xl object-cover"
    />
  );
};

export default ProjectThumbnail;
