import { notFound } from "next/navigation";
//@ts-ignore
import { db } from "@/db";

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

  return (
    <div key={snippet.id} className="border p-4 m-4 overflow-hidden">
      <h3 className="font-bold">{snippet.title}</h3>
      <pre>{snippet.code}</pre>
    </div>
  );
};
export default SnippetShowPage;
