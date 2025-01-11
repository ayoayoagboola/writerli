import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProjectThumbnailProps {
  coverImg: string;
}

const ProjectThumbnail = async ({ coverImg }: ProjectThumbnailProps) => {
  const { data } = await supabase.storage.from("images").getPublicUrl(coverImg);

  return (
    <Image
      src={data?.publicUrl}
      layout="fill"
      objectFit="cover"
      alt="Cover Image"
      className="w-full h-full rounded-xl"
    />
  );
};

export default ProjectThumbnail;
