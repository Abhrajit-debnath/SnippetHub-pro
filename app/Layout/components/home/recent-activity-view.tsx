import { useSnippetStore } from "@/app/store/snippetStore";
import RecentSnippetActivity from "./recent-snippet-activity";
import { useRouter } from "next/navigation";

const RecentActivityView = () => {
  const { snippets } = useSnippetStore();
  const router = useRouter();

  const recentSnippets = snippets.slice(0, 4);

  return (
    <div className="bg-sidebarBg rounded-xl w-full p-5 md:w-[60%] xl:w-[55%] 2xl:w-[50%] min-h-90">
      <div className="flex justify-between pb-3">
        <h2 className="font-poppins capitalize text-white text-lg">
          Recent activity
        </h2>

        {snippets.length > 0 && (
          <button
            onClick={() => router.push("snippets")}
            className="bg-buttonColor cursor-pointer rounded-2xl px-4 py-1 text-white font-medium hover:bg-buttonColorHover font-poppins text-sm capitalize"
          >
            {snippets.length > 4 ? "view all" : "view more"}
          </button>
        )}
      </div>

      {recentSnippets.length === 0 ? (
        <div className="w-full bg-snippetCardbox rounded-xl flex flex-col justify-center items-center py-25 min-h-55">
          <span className="text-4xl">📂</span>
          <p className="mt-2 text-gray-400 font-poppins text-sm">
            No recent activity
          </p>
          <p className="text-xs font-inter text-gray-500 mt-1">
            Create your first snippet to see 
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recentSnippets.map((snippet, id) => (
            <RecentSnippetActivity
              key={id}
              title={snippet.title}
              language={snippet.language}
              createdAt={snippet.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivityView;
