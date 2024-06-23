import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

const SnippetShowPage = async (props: SnippetShowPageProps) => {
  // note: by default the `props` will contain some data from the URL since this is the server component
  // console.log(props);

  // adding delay to display loader
  await new Promise(resolve => setTimeout(resolve, 2000));

  const snippet = await db.snippet.findFirst({
    where: {
      id: Number(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div key={snippet.id} className="flex m-4 justify-between items-center">
        <h3 className="font-bold text-xl">{snippet.title}</h3>

        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="border rounded p-2 bg-blue-200">
            Edit
          </Link>

          <form action={deleteSnippetAction}>
            <button className="border rounded p-2 bg-red-200">Delete</button>
          </form>
        </div>
      </div>

      <pre className="p-3 rounded bg-gray-200 border-gray-200 overflow-auto">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};
export default SnippetShowPage;

// note: applying cache to the dynamic route
// export const generateStaticParams = async () => {
//   const snippets = await db.snippet.findMany();

//   return snippets.map(snippet => ({
//     params: {
//       id: String(snippet.id),
//     },
//   }));
// };
