import { create } from "zustand";

type chatMessage = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

type messageState = {
  messages: chatMessage[];
  clearMessages: () => void;
  addMessages: (msg: chatMessage) => void;
  replaceMessage: (id: string, msg: Object) => void;
};

export const useMessageStore = create<messageState>((set) => ({
  messages: [],
  replaceMessage: (id, msg) => {
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, ...msg } : m)),
    }));
  },
  clearMessages: () => {
    set({ messages: [] });
  },
  addMessages: (msg) => {
    set((state) => ({
      messages: [...state.messages, msg],
    }));
  },
}));
