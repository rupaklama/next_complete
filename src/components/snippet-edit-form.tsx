"use client";

import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState<string>(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  // Using 'bind' is a technique in JavaScript and TypeScript to pre-fill some of the arguments to a function,
  // creating a new function with fewer parameters required when it's actually called.
  // In this case, null is passed as the first argument to bind, which means the 'this' context of the editSnippet function will not be changed when the new function is called. This is often done when 'this' is not used within the function.
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        className="mt-4"
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="rounded p-2 bg-blue-200 mt-4">
          Save
        </button>
      </form>
    </div>
  );
};
export default SnippetEditForm;
