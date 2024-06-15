import { redirect } from "next/navigation";
import { db } from "@/db";

const SnippetCreatePage = () => {
  const createSnippet = async (formData: FormData) => {
    // 1. Server Action must be an async function so to execute this code
    // on the server to connect to the database.
    "use server";

    // 2. Check & valid user inputs
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // 3. Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // 4. Redirect to the new snippet page
    redirect("/");
  };

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Enter a title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea id="code" name="code" className="border rounded p-2 w-full" placeholder="Enter a code" />
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};
export default SnippetCreatePage;
