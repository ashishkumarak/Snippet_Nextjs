"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { prismaClient } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React, { useActionState } from 'react'

import * as actions from "@/actions";

const CreateSnippetPage = () => {

  const [formDatacoming , updatedActions] = useActionState(actions.createSnippet, {message:""});



  // async function createSnippet(formData:FormData){
  //   "use server" // Use ServerAction Directive
  //   const title = formData.get("title") as string;
  //   const code = formData.get("code") as string;

  //   const snippet = await prismaClient.snippet.create({
  //     data:{
  //       title,
  //       code
  //     }
  //   });
  //   console.log("Created Snippet", snippet);

  //   redirect("/"); // redirect to home page. 
  // }
  // above code move at server action file with some code update .
  
 
  return (
    <form action={updatedActions} >
      <div>
        <Label>Title</Label>
        <Input type='text' name='title' id='title'/>
      </div>
       <div>
        <Label>Code</Label>
        <Textarea name='code' id='code'/>
      </div>

      { formDatacoming.message && <div className='p-2 bg-red-300 border-2 border-red-600 mt-2'>{formDatacoming.message}</div> 
      }
      
      <Button type='submit' className='my-4'>New</Button>
    </form>
  )
}

export default CreateSnippetPage