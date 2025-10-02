"use server"; // use for server action

import { prismaClient } from "@/lib/prisma";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache"; // import On-demand Caching

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

  revalidatePath(`/snippet/${id}`); // Using On-demand Caching

  redirect(`/snippet/${id}`);
}


// For Deleting the snippet
export const deleteSnippet = async(id:number) =>{
  await prismaClient.snippet.delete({
    where:{
      id
    }
  });
  revalidatePath("/"); // Using On-demand Caching

  redirect('/');
}

// For Creating the new Snippet
 export async function createSnippet(prevState:{message:string},formData:FormData){

    // "use server" // Use ServerAction Directive // now it be removed/comment when added in server actions file.


    try {

    const title = formData.get("title");
    const code = formData.get("code");

    // Now here checking the condition
    // if(!title){
    //   return {message:"Title is required and must atleast 4 char"}
    // } // also used as normal condition
    // if(!code){
    //   return {message:"Code is required and must atleast 4 char"}
    // } // also used as normal condition


    if(typeof title !== "string" || title.length < 4 ){
      return {message:"Title is required and must atleast 4 char"}
    } // here i used title! == "string" then showing error see carefully operator sign.

    if(typeof code !== "string" || code.length < 10 ){
      return {message:"Code is required and must atleast 10 char"}
    }


    await prismaClient.snippet.create({
      data:{
        title,
        code,
      }
    });

    // console.log("Created Snippet", snippet);

    // throw new Error(" OOPS something went wrong."); //throw manually error when connection failed to db so do comment the snippet.create code.

    revalidatePath("/"); // Using On-demand Caching

    } catch(error: unknown){
      if(error instanceof Error){
        return { message: error.message}
      }else {
        return {message:"Some interval servor error"}
      }
      
    }
        

    redirect("/"); // redirect to home page. // used only in server components & use outside the try-catch block.

  }
  