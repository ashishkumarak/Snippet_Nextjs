"use server";

import { prismaClient } from "@/lib/prisma";
import { redirect } from "next/navigation";

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
