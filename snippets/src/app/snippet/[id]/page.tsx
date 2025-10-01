import { Button } from "@/components/ui/button";
import { prismaClient } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

// you can do like also :- async( {params} : {params:Promise<{id:string}>} )

type SnippetDetailsProps = {
  params: Promise<{ id: string }>
}

const SnippetDetailPage : React.FC<SnippetDetailsProps> = async ({ params}) => {


  const id = parseInt((await params).id);
  const snippet = await prismaClient.snippet.findUnique({
    where : {
      id,
    }
  });

  if(!snippet) return <h1>Snippet not found</h1> // if no data in snippet var


  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{snippet.title} </h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link>
          <Button variant={'destructive'}>Delete</Button>
        </div>        
      </div>
      <pre className="p-3 bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>

)
};

export default SnippetDetailPage;
