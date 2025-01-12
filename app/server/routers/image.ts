import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { supabase } from "@/lib/supabase";


export const imageRouter = router({
  getImage: protectedProcedure.input(z.object({ bucket: z.string(), path: z.string()})).query(async ({ ctx, input }) => {
    const { bucket, path } = input;

    if (!ctx.user || !ctx.user.id) {
      return { error: "You need to be logged in to fetch images!" };
    }
    
    const { data } = await supabase.storage.from(bucket).getPublicUrl(path);
    return { url: data };
}),
getUserImages: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user || !ctx.user.id) {
      return { error: "You need to be logged in to fetch images!" };
    }
    
    const { data } = await supabase.storage.from("images").list(`${ctx.user.id}/projects/176cb021-ecc2-4360-9426-f54844bb5db3`);
    // console.log(data, ctx.user.id);

    if (!data) {
      return { images: [] };
    }

    const images = [];
    for (const image of data) {
      const imageUrl = URL.createObjectURL(image as unknown as Blob)
      console.log(imageUrl)
      images.push(imageUrl);
    }
    console.log(images);

    return { images };
})
});
