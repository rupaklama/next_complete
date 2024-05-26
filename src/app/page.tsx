import { db } from "@/db";

const HomePage = async () => {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map(snippet => {
    return (
      <div key={snippet.id} className="border p-4 m-4 overflow-hidden">
        <h3 className="font-bold">{snippet.title}</h3>
        <pre>{snippet.code}</pre>
      </div>
    );
  });

  return <div>{renderedSnippets}</div>;
};

export default HomePage;
