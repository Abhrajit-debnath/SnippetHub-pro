"use client";

import { useEffect, useState } from "react";
import type { Snippet } from "@/app/types/snippet-type";

import UpgradeModal from "@/app/Layout/components/modals/upgrade-modal";
import SnippetSkeleton from "@/app/Layout/components/skeletons/snippet-skeleton";
import SnippetCard from "@/app/Layout/components/snippet/snippet-card";
import SnippetCardWrapper from "@/app/Layout/components/snippet/snippet-card-wrapper";
import SnippetForm from "@/app/Layout/components/snippet/snippet-form";
import SnippetHeader from "@/app/Layout/components/snippet/snippet-header";
import { useSnippetStore } from "@/app/store/snippetStore";
import { useRouter } from "next/navigation";
import axios from "@/app/config/axios.config";
import SnippetSearchBox from "@/app/Layout/components/snippet/snippet-search";

const Page = () => {
  const [openSnippetForm, setOpenSnippetForm] = useState(false);
  const [openUpgradeModalForm, setOpenUpgradeModalForm] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const { snippets, loading, fetchSnippets, deleteSnippet, setActiveSnippet } =
    useSnippetStore();
  const router = useRouter();

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const handleUpdateSnippet = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setOpenSnippetForm(true);
  };

  const handleDeleteSnippet = async (snippet: Snippet) => {
    await deleteSnippet(String(snippet._id));
  };

  const chatWithAIHandler = async (snippet: Snippet) => {
    setActiveSnippet(snippet);
    router.push("/dashboard/chat-with-ai");
  };

  return (
    <div className="flex flex-col">
      <SnippetHeader
        snippetCount={snippets.length}
        setOpenSnippetForm={setOpenSnippetForm}
        setOpenModalForm={setOpenUpgradeModalForm}
      />

      <SnippetSearchBox/>

      {/* Snippet Form Modal */}
      {openSnippetForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SnippetForm
            onSuccess={fetchSnippets}
            setOpenSnippetForm={setOpenSnippetForm}
            setSelectedSnippet={setSelectedSnippet}
            selectedSnippet={selectedSnippet}
          />
        </div>
      )}

      {/* Upgrade Modal */}
      {openUpgradeModalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <UpgradeModal setOpenUpgradeModalForm={setOpenUpgradeModalForm} />
        </div>
      )}

      {/* Snippet List */}
      <div className="mt-10">
        <SnippetCardWrapper>
          {loading ? (
            Array.from({ length: 4 }).map((_, id) => (
              <SnippetSkeleton key={id} />
            ))
          ) : snippets.length === 0 ? (
            <div className="capitalize text-white">no snippets found</div>
          ) : (
            snippets.map((snippet: Snippet) => (
              <SnippetCard
                key={String(snippet._id)}
                snippet={snippet}
                onUpdate={handleUpdateSnippet}
                onDelete={handleDeleteSnippet}
                onChat={chatWithAIHandler}
              />
            ))
          )}
        </SnippetCardWrapper>
      </div>
    </div>
  );
};

export default Page;
