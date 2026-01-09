import React from "react";

type RecentSnippetActivityProps = {
  title: string;
  language?: string;
  createdAt: Date;
};

const RecentSnippetActivity = ({
  title,
  language,
  createdAt,
}: RecentSnippetActivityProps) => {
  const createdDate = new Date(createdAt).toDateString();

  return (
    <div className="group flex items-center justify-between gap-4 rounded-lg bg-snippetCardbox px-4 py-3 transition hover:bg-snippetCardbox/80">
      
    
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white truncate max-w-55 pb-1">
          {title}
        </span>
        <span className="text-xs text-gray-400">
          {createdDate}
        </span>
      </div>

   
      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-gray-200">
        {language ?? "Unknown"}
      </span>
    </div>
  );
};

export default RecentSnippetActivity;
