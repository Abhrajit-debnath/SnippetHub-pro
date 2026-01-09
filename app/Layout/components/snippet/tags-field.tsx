"use client";

import React from "react";
import { X } from "lucide-react";
type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

const TagInput = ({ value, onChange }: TagInputProps) => {
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget.value.trim();
      if (!input) return;
      if (value.includes(input)) return;

      onChange([...value, input.toLowerCase()]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };
  return (
    <div className="flex flex-wrap gap-2 border-zinc-700  border rounded-md p-2 max-h-10 overflow-auto bg-zinc-800">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-xs
                     bg-zinc-800 text-white rounded-full"
        >
          #{tag}
          <button onClick={() => removeTag(tag)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <input
        onKeyDown={addTag}
        placeholder="Add tag & press Enter"
        className="  text-white flex-1 bg-transparent outline-none text-sm"
      />
    </div>
  );
};

export default TagInput;
