// To use Server Actions in a Client Component,
// you can either export them from a separate file with "use server" at the top,
// or pass them down through props from a Server Component.
"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createSnippet = async (formState: { message: string }, formData: FormData) => {
  try {
    // 1. Server Action must be an async function so to execute this code
    // on the server to connect to the database.

    // 2. Check & valid user inputs
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer than 3 characters.",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer than 10 characters.",
      };
    }

    // 3. Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Something went wrong...",
    };
  }

  revalidatePath("/");

  // 4. Redirect to the new snippet page
  redirect("/");
};

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  redirect("/");
};
