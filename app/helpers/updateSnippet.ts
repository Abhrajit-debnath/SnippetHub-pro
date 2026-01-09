// helpers/updateSnippet.ts
import axios from "@/app/config/axios.config";
import type { Snippet } from "@/app/types/snippet-type";

export const handleUpdateSnippet = async (
  snippetId: string,
  data: Partial<Snippet>
) => {
  const response = await axios.put(
    `/snippets/update/${snippetId}`,
    data
  );

  return response;
};
