"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

const SnippetCreatePage = () => {
  // first arg is server action, second is initial state object
  const [formState, action] = useFormState(actions.createSnippet, { message: "" });

  return (
    <form action={action}>
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

        {formState.message && <div className="text-red-500">{formState.message}</div>}
      </div>
    </form>
  );
};
export default SnippetCreatePage;
