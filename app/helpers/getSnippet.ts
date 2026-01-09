import axios from "@/app/config/axios.config";

import type { Snippet } from "../types/snippet-type";

type GetSnippetsResponse = {
  data: Snippet[];
  message: string;
};

export const handleGetSnippet = async (
  path: string
): Promise<GetSnippetsResponse> => {
  const response = await axios.get<GetSnippetsResponse>(path);
  console.log(response);

  return response.data;
};
