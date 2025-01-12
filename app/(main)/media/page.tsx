"use client";

import { trpc } from "@/app/_trpc/client";
import Image from "next/image";

// TODO: fix loading in the images 

const MediaPage = () => {
  const { data: images, error } = trpc.images.getUserImages.useQuery(); // This is a hook that fetches the user's images
  console.log(images);

  if (!images) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if ("error" in images) {
    return <div>Error: ${error?.message}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <h1 className="text-4xl">Media Page</h1>
      <div className="flex w-full h-full items-center justify-center">
        {images.images.map((image: string, index) => (
          <Image
            key={index}
            src={image}
            alt="User's image"
            className="w-24 h-24 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaPage;
