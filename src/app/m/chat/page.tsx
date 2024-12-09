"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChatList } from "@/contexts/ChatContext";
import { useRouter } from "next/navigation";

const MobileChat = () => {
  const [typing, setTyping] = useState(false);
  const [question, setQuestion] = useState("");
  const router = useRouter();
  const { preSaveChat } = useChatList();
  const onAsk = async (value: string) => {
    console.log(value);
    setQuestion(value);
    setTyping(true);
    const saveRes = await preSaveChat(value);
    if (saveRes && saveRes.code === 0) {
      router.push(`/chat/${saveRes.data.conversationId}`);
    }
    setTyping(false);
  };
  const cancelAnswer = () => {};

  return (
    <div className="h-[calc(100vh-60px)] px-3 w-full">
      <div className="w-full flex flex-col h-full">
        {question ? (
          <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 items-end px-5 py-4">
              <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
                {question}
              </div>
            </div>
            <div className="h-8 flex items-center pl-3">
              <i className="w-3 h-4 bg-main-surface-tertiary animate-blink"></i>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-3xl font-semibold">有什么可以帮您？？</h1>
          </div>
        )}
        <ChatInput onAsk={onAsk} onCancel={cancelAnswer} typing={typing} />
        <div className="text-xs text-center p-2">
          内容由言创AI大模型生成，仅供您参考
        </div>
      </div>
    </div>
  );
};

export default MobileChat;
