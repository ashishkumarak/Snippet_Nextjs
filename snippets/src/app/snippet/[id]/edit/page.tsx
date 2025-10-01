import EditSnippetForm from '@/components/EditSnippetForm'
import { prismaClient } from '@/lib/prisma';
import React from 'react'

const EditPageSnippet = async ({params} : {params:Promise<{id:string}>} ) => {

  const id = parseInt((await params).id);
   const snippet = await prismaClient.snippet.findUnique({
     where : {
       id,
     }
   });
 
   if(!snippet) return <h1>Snippet not found</h1> // if no data in snippet var


  return (
    <div>
      <EditSnippetForm  snippet={snippet}/>
    </div>
  )
}

export default EditPageSnippet