// app/store/useSnippetStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Snippet } from "@/app/types/snippet-type";

import { handleGetSnippet } from "@/app/helpers/getSnippet";
import { handlerDeleteSnippet } from "@/app/helpers/deleteSnippet";
import { handleAddSnippet } from "@/app/helpers/addSnippet";
import { handleUpdateSnippet } from "@/app/helpers/updateSnippet";

type AddSnippetPayload = {
  title: string;
  code: string;
  tags: string[];
  language?: string;
};

interface SnippetStore {
  snippets: Snippet[];
  loading: boolean;

  fetchSnippets: () => Promise<void>;
  addSnippet: (payload: AddSnippetPayload) => Promise<void>;
  updateSnippet: (id: string, payload: AddSnippetPayload) => Promise<void>;
  deleteSnippet: (id: string) => Promise<void>;
}

export const useSnippetStore = create<SnippetStore>()(
  persist(
    (set) => ({
      snippets: [],
      loading: false,

      fetchSnippets: async () => {
        try {
          set({ loading: true });
          const res = await handleGetSnippet("/snippets/get");

          set({ snippets: res.data.reverse() });
        } catch (error) {
          console.error("Fetch snippets failed", error);
        } finally {
          set({ loading: false });
        }
      },

      addSnippet: async (payload) => {
        try {
          const res = await handleAddSnippet("/snippets/add", payload);

          set((state) => ({
            snippets: [res.data, ...state.snippets],
          }));
        } catch (error) {
          console.error("Add snippet failed", error);
        }
      },

      updateSnippet: async (id, payload) => {
        try {
          const res = await handleUpdateSnippet(
            `/snippets/update/${id}`,
            payload
          );

          set((state) => ({
            snippets: state.snippets.map((s) =>
              s._id === id ? res.data : s
            ),
          }));
        } catch (error) {
          console.error("Update snippet failed", error);
        }
      },

      deleteSnippet: async (id) => {
        try {
          await handlerDeleteSnippet(id);

          set((state) => ({
            snippets: state.snippets.filter((s) => s._id !== id),
          }));
        } catch (error) {
          console.error("Delete snippet failed", error);
        }
      },
    }),
    {
      name: "snippet-store",
      partialize: (state) => ({
        snippets: state.snippets,
      }),
    }
  )
);
