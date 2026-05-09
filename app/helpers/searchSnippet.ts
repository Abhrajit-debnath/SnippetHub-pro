import axios from "@/app/config/axios.config";

import type { Snippet } from "../types/snippet-type";

type searchSnippetsResponse = {
  data: Snippet[];
  message: string;
};

export const handleSearchSnippet = async (
  path: string
): Promise<searchSnippetsResponse> => {
  const response = await axios.get<searchSnippetsResponse>(path);

  return response.data;
};
