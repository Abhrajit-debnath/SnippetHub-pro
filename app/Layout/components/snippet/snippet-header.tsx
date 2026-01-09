"use client";

import { useAuthStore } from "@/app/store/authStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const FREE_SNIPPET_LIMIT = 3;

type SnippetHeaderProps = {
  setOpenSnippetForm: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  snippetCount: number;
};

const SnippetHeader = ({
  setOpenSnippetForm,
  setOpenModalForm,
  snippetCount,
}: SnippetHeaderProps) => {
  const { user, loading } = useAuthStore();

  if (loading) return null;

  const isPro = user?.isSubscribed;

  const handleCreateSnippet = () => {
    if (!isPro && snippetCount >= FREE_SNIPPET_LIMIT) {
      setOpenModalForm(true);
      return;
    }

    setOpenSnippetForm(true);
  };

  return (
    <div className="w-full flex items-center justify-between pt-4">
      <h1 className="text-xl font-poppins font-medium text-white">Snippets</h1>

      <Button
        onClick={handleCreateSnippet}
        className="bg-buttonColor hover:bg-buttonColorHover cursor-pointer capitalize text-white text-xs font-poppins"
      >
        {
          !isPro && snippetCount >= FREE_SNIPPET_LIMIT
          ? ""
          : <Plus className="mr-1 h-4 w-4" />
        }
        
        {!isPro && snippetCount >= FREE_SNIPPET_LIMIT
          ? "Upgrade to Pro"
          : "New Snippet"}
      </Button>
    </div>
  );
};

export default SnippetHeader;
