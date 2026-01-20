"use client";

import ChatControls from "@/app/Layout/components/chat/chat-controls";
import ChatMessages from "@/app/Layout/components/chat/chat-messages";
import axios from "@/app/config/axios.config";
import { useSnippetStore } from "@/app/store/snippetStore";
import { useMessageStore } from "@/app/store/chatMessagesStore";
import ChatWelcomeScreen from "@/app/Layout/components/chat/chat-welcome-screen";

const Page = () => {
  const { activeSnippet } = useSnippetStore();
  const { addMessages, messages, replaceMessage } = useMessageStore();

  const sendMessage = async (chatQuery: string) => {
    if (!activeSnippet) {
      console.error("No snippet selected");
      return;
    }

    addMessages({ id: "hee", role: "user", content: chatQuery });

    const thinkingId = crypto.randomUUID();

    addMessages({
      id: thinkingId,
      role: "assistant",
      content: "Thinking..",
    });
    try {
      const res = await axios.post("/chat", {
        message: chatQuery,
        snippet: activeSnippet,
      });

      replaceMessage(thinkingId, {
        content: res.data.reply,
      });
    } catch (error) {}
  };

  return (
    <div className="relative h-full flex flex-col">
      <h1 className="text-white capitalize text-xl lg:text-2xl pt-8 lg:pt-0 py-3">
        chat with <span className="text-buttonColor font-logo">snippet ai</span>
      </h1>

      {messages.length > 0 ? <ChatMessages /> : <ChatWelcomeScreen />}

      <ChatControls sendMessage={sendMessage} />
    </div>
  );
};

export default Page;
