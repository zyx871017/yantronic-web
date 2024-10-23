"use client";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef, useState } from "react";
import TypeWrite from "../components/TypeWrite";
import { useLoading } from "@/contexts/LoadingContext";
import { useChatList } from "@/contexts/ChatContext";
import MarkdownReader from "../components/yanEditor/MarkdownReader";

export default function ChatDetail({ params }: { params: { id: string } }) {
  const { updateChatList, chatList } = useChatList();
  const { setIsLoading } = useLoading();
  const divRef = useRef<HTMLDivElement>(null);
  const [typingId, setTypingId] = useState(-1);
  const initData = async () => {
    setIsLoading(true);
    await updateChatList();
    setIsLoading(false);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = +(localStorage?.getItem("typingId") || -1);
      setTypingId(id);
    }
    initData();
  }, []);

  const typingEnd = () => {
    localStorage.removeItem("typingId");
    setTypingId(-1);
  };
  return (
    <>
      <div
        ref={divRef}
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100vh - 132px)" }}
      >
        {chatList.reverse().map((item) => (
          <div key={item.id} className="w-[48rem] mx-auto">
            <div className="flex flex-col items-end px-5 py-4">
              <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
                {item.question}
              </div>
            </div>
            {typingId === item.id ? (
              <p className="px-5 py-4 text-base leading-7">
                <TypeWrite text={item.answer} onTypingEnd={typingEnd} />
              </p>
            ) : (
              <MarkdownReader text={item.answer} />
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput id={params.id} />
      </div>
    </>
  );
}
