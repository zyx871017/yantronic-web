"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChatList } from "@/contexts/ChatContext";
import ChatListItem from "./components/ChatListItem";
import { useRouter } from "next/navigation";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const router = useRouter();
  const { typingAnswer, preSaveChat } = useChatList();

  // 确保依赖项完整
  const onAsk = async (value: string) => {
    setQuestion(value);
    setTyping(true);
    const saveRes = await preSaveChat(value);
    // if (saveRes && saveRes.code === 0) {
    //   router.push(`/chat/${saveRes.data.conversationId}`);
    // }
    setTyping(false);
  };

  return question ? (
    <>
      <div
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100vh - 132px)" }}
      >
        <div className="w-[48rem] mx-auto">
          <div className="flex flex-col items-end px-5 py-4">
            <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
              {question}
            </div>
          </div>
          <p className="px-5 py-4 text-base leading-7">
            <ChatListItem item={{ answer: typingAnswer }} />
          </p>
        </div>
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput typing={typing} onAsk={onAsk} />
      </div>
    </>
  ) : (
    <div className="px-5 text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full mb-10 text-4xl font-semibold text-center">
        有什么可以帮您？？
      </div>
      <ChatInput typing={typing} onAsk={onAsk} />
      <div className="flex"></div>
    </div>
  );
}
