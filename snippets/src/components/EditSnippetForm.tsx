"use client"
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippet } from '@/generated/prisma'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {

    const [code, setcode] = useState(snippet.code);

    const changeEventHandler = (value:string = "" ) =>{
       setcode(value); // accepting new value from code editor and when input is undefined then add "" in :string = "" otherwise throw error like-- '(value: string) => void' is not assignable to type 'OnChange'.
  }

  // you cannot use server action as a inline inside client component so make in another file
  // async function saveSnippet (){
  // "use server"
  // }

 const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)

  return (
    <div className='flex flex-col gap-4'>
      <form action={saveSnippetAction} className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>Your Code Editor:-</h1>
        <Button type='submit'>Save</Button>
      </form>
      <Editor
      height="40vh"
      theme='vs-dark'
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={changeEventHandler}
      
    />
    </div>
  )
}

export default EditSnippetForm