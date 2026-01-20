"use client";
import { useMessageStore } from "@/app/store/chatMessagesStore";
import { ChatMessage } from "@/app/types/chat-message";

const ChatMessages = () => {
  const { messages } = useMessageStore();

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2 snippet-msg px-3">

   
      {messages.map((msg: ChatMessage, idx) =>
    
          <div
            key={idx}
            className={`max-w-[75%] font-inter text-sm rounded-xl ${
              msg.role === "user"
                ? "ml-auto text-right text-zinc-400 bg-snippetCardbox p-3"
                : "mr-auto text-left bg-buttonColorHover text-white p-3"
            }`}
          >
            {msg.content}
          </div>
       
      )}
    </div>
  );
};

export default ChatMessages;
