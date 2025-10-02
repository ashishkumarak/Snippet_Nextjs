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

// For Creating the new Snippet
 export async function createSnippet(prevState:{message:string},formData:FormData){
    // "use server" // Use ServerAction Directive // now it be removed/comment when added in server actions file.
    const title = formData.get("title");
    const code = formData.get("code");

    // Now here checking the condition
    // if(!title)
    if(typeof title! == "string" || title.length < 4 ){
      return {message:"Title is required and must atleast 4 char"}
    }

    if(typeof code! == "string" || code.length < 10 ){
      return {message:"Code is required and must atleast 10 char"}
    }



    const snippet = await prismaClient.snippet.create({
      data:{
        title,
        code
      }
    });
    console.log("Created Snippet", snippet);

    redirect("/"); // redirect to home page. 
  }
  