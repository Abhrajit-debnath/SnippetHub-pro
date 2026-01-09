// components/skeletons/snippet-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const SnippetSkeleton = () => {
  return (
    <div className="bg-cardBg rounded-md w-full min-w-0 animate-pulse">
      {/* Header */}
      <div className="p-3 flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-1/3 rounded" /> {/* title */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded" /> {/* copy icon */}
          <Skeleton className="h-4 w-4 rounded" /> {/* menu icon */}
        </div>
      </div>

      {/* Code block */}
      <div className="p-3">
        <Skeleton className="h-20 w-full rounded" /> {/* code area */}
      </div>

      {/* Footer */}
      <div className="mt-2 rounded-b-md bg-snippetCardbox flex items-center justify-between gap-2 flex-wrap text-xs w-full p-4">
        <Skeleton className="h-3 w-1/4 rounded" /> {/* "created at" */}
        <Skeleton className="h-3 w-1/6 rounded" /> {/* date */}
      </div>
    </div>
  );
};

export default SnippetSkeleton;
