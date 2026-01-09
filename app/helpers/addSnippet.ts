import axios from "@/app/config/axios.config";

type PayloadType = {
  title: string;
  code: string;
  tags: string[];
  language?: string;
};

export const handleAddSnippet = async (path: string, payload: PayloadType) => {
  const response = await axios.post(path, payload);
  
  return response;
};
