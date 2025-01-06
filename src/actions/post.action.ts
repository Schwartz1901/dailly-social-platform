"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content:string, image:string) {
    // create post
    try{
        const userId = await getDbUserId();
        const post = await prisma.post.create({
            data:{
                content,
                image,
                authorId: userId
            }
        })

        revalidatePath("/"); //purge the cache for the home pgae
        return {success:true, post}
    } catch (error) {
        console.log("Error in createPost", error);
        return {success:false, error: "Failed to create post"}
    }
}