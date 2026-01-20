"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useMessageStore } from "@/app/store/chatMessagesStore";
type ChatControlsProps = {
  sendMessage: (chatquery: string) => Promise<void>;
};
const ChatControls = ({ sendMessage }: ChatControlsProps) => {
  const [chatQuery, setChatQuery] = useState("");
  return (
    <div className="w-full p-1">
      <div className="w-full relative">
        <input
          type="text"
          value={chatQuery}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              sendMessage(chatQuery);
              setChatQuery("")

            }
          }}
          onChange={(e) => setChatQuery(e.target.value)}
          className="w-full border-violet-500 border text-white p-3 font-inter capitalize focus:outline-none rounded-xl"
          placeholder="chat with ai ..."
        />
        <button
          className="absolute right-4 top-3 cursor-pointer "
          onClick={() => {
            sendMessage(chatQuery);
            setChatQuery("");
          }}
        >
          <SendHorizontal className="text-buttonColor" />
        </button>
      </div>
    </div>
  );
};

export default ChatControls;
