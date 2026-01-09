import axios from "@/app/config/axios.config";

export const handlerDeleteSnippet = async (snippetId: string) => {
  const response = await axios.delete(`/snippets/delete/${snippetId}`);

  return response;
};
