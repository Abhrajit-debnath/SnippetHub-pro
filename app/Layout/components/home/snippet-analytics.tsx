import React, { useMemo } from "react";
import SnippetAnalyticsChart from "./snippet-analytics-chart";
import { useSnippetStore } from "@/app/store/snippetStore";

export const languageColors: Record<string, string> = {
  javascript: "bg-yellow-400",
  typescript: "bg-blue-400",
  python: "bg-green-400",
  java: "bg-red-400",
  cpp: "bg-purple-400",
  go: "bg-cyan-400",
};

const SnippetAnalytics = () => {
  const { snippets } = useSnippetStore();
  const totalSnippets = snippets.length;

  const languageStats = useMemo(() => {
    const map: Record<string, number> = {};

    snippets.forEach((snippet) => {
      const lang = snippet.language?.toLowerCase();
      if (!lang) return;

      map[lang] = (map[lang] || 0) + 1;
    });

    return Object.entries(map);
  }, [snippets]);

  return (
    <div className="bg-snippetCardbox rounded-xl p-5">
      <h2 className="font-poppins text-white text-sm mb-4">
        Snippets by language
      </h2>
      <div className="flex flex-col gap-5 sm:flex-row md:flex-col xl:flex-row xl:gap-6">
        <div className="w-full xl:w-1/2 max-h-56 overflow-y-auto pr-2 snippet-scrollbar">
          <div className="flex flex-col gap-3">
            {languageStats.length > 0 ? (
              languageStats.map(([language]) => (
                <div
                  key={language}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        languageColors[language] ?? "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm text-white capitalize font-inter">
                      {language}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs lg:text-sm text-zinc-400 font-inter flex items-center justify-center min-h-50">
                No snippets data available
              </div>
            )}
          </div>
        </div>

        <div className="w-full xl:w-1/2 flex items-center justify-center">
          {languageStats.length > 0 ? (
            <SnippetAnalyticsChart
              language={languageStats}
              totalSnippets={totalSnippets}
            />
          ) : (
            <div className="text-xs lg:text-sm text-zinc-400 font-inter flex items-center justify-center min-h-20"> No chart to show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetAnalytics;
