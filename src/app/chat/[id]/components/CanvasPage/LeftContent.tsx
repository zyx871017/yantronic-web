"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { AiOutlineForm, AiOutlineMenuUnfold } from "react-icons/ai";
import { useChatList } from "@/contexts/ChatContext";
import TypeWrite from "../../../components/TypeWrite";
import ChatListItem from "../../../components/ChatListItem";
import ChatInput from "../../../components/ChatInput";
import { useLayout } from "@/contexts/LayoutContext";

const LeftContent = () => {
  const params = useParams();
  const { setSideOpen } = useLayout();
  const { chatList, typingId, setTypingId } = useChatList();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatList]);

  const typingEnd = () => {
    localStorage.removeItem("typingId");
    setTypingId(-1);
  };

  return (
    <>
      <div className="h-14 p-3 flex justify-between items-center">
        <div className="font-semibold text-lg text-text-secondary flex items-center">
          <Button
            className="!px-2 !h-10 !border-none"
            type="text"
            onClick={() => setSideOpen(true)}
          >
            <AiOutlineMenuUnfold className="size-6 text-text-primary" />
          </Button>
          <Link href="/chat" className="!px-2" type="text">
            <AiOutlineForm className="size-6 text-text-primary" />
          </Link>
          言创大模型
        </div>
      </div>
      <div
        ref={divRef}
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100vh - 132px)" }}
      >
        {chatList.reverse().map((item) => (
          <div key={item.id} className="max-w-[48rem] mx-auto">
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
              <ChatListItem item={item} />
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput id={params.id as string} />
      </div>
    </>
  );
};

export default LeftContent;
