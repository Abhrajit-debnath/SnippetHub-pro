"use client";

import type { Snippet } from "@/app/types/snippet-type";
import CodeBlock from "../snippet/code-block";
import DropdownMenuDialog from "./snippet-dropdown-menu";
import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { Check } from "lucide-react";
type SnippetCardProps = {
  snippet: Snippet;
  onUpdate: (snippet: Snippet) => void;
  onDelete: (snippet: Snippet) => void;
};

const SnippetCard = ({ snippet, onUpdate, onDelete }: SnippetCardProps) => {
  const [copyCode, setCopyCode] = useState(false);
  const createdDate = new Date(snippet.createdAt).toDateString();

  const handelCopytoClipboard = (code: string) => {
    try {
      window.navigator.clipboard.writeText(code);

      setCopyCode(true);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setCopyCode(false);
      }, 1000);
    }
  };

  const updateSnippetHandler = () => {
    onUpdate(snippet);
  };

  const deleteSnippetHandler = () => {
    onDelete(snippet);
  };

  return (
    <div className="bg-cardBg rounded-md relative w-full min-w-0">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm truncate font-poppins min-w-0 text-white ">
            {snippet.title}
          </h2>
          <div className="flex items-center justify-between gap-7">
            {copyCode ? (
              <div className="text-gray-300">
                <Check strokeWidth={1.5} />
              </div>
            ) : (
              <button
                onClick={() => handelCopytoClipboard(snippet.code)}
                className="text-gray-300 cursor-pointer"
              >
                <ClipboardList strokeWidth={1} />
              </button>
            )}

            <DropdownMenuDialog
              updateSnippetHandler={updateSnippetHandler}
              deleteSnippetHandler={deleteSnippetHandler}
            />
          </div>
        </div>

        {/* Code */}
        <div className="mt-3 min-w-0">
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>

        {/* Footer */}
      </div>
      <div className="mt-2 rounded-b-md bg-snippetCardbox flex items-center justify-between gap-2 flex-wrap text-xs w-full p-4">
        <span className="truncate font-inter text-xs text-gray-300 capitalize">
          created at{" "}
        </span>
        <span className="truncate font-inter text-xs text-gray-300">
          {createdDate}
        </span>
      </div>
    </div>
  );
};

export default SnippetCard;
