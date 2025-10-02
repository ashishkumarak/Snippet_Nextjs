"use server";

import { prismaClient } from "@/lib/prisma";
import { redirect } from "next/navigation";

// For Saving the Snippet
export const saveSnippet = async (id: number, code: string) => {
  await prismaClient.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippet/${id}`);
}


// For Deleting the snippet
export const deleteSnippet = async(id:number) =>{
  await prismaClient.snippet.delete({
    where:{
      id
    }
  });

  redirect('/');
}
