"use client";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef } from "react";
import { useChatList } from "@/contexts/ChatContext";
import ChatListItem from "../components/ChatListItem";
import { ChatItemType, IMessageItem } from "@/types/question";

export default function ChatDetail() {
  const {
    updateChatList,
    chatList,
    typingAnswer,
    typingId,
    sendStreamRequest,
    preSaveChat,
  } = useChatList();
  const divRef = useRef<HTMLDivElement>(null);

  const initData = async () => {
    await updateChatList();
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (chatList.length && typingId.current === -1) {
      const unfinishedAnswer = chatList.find((item) => item.status === 0);
      if (unfinishedAnswer) {
        typingId.current = unfinishedAnswer.itemId;
        const messages: IMessageItem[] = [];
        chatList.forEach((item) => {
          if (item.status === 1) {
            messages.push({
              role: "user",
              content: item.question,
            });
            messages.push({
              role: "assistant",
              content: item.answer,
            });
          } else {
            messages.push({
              role: "user",
              content: item.question,
            });
          }
        });
        sendStreamRequest(messages, unfinishedAnswer.itemId);
      }
    }
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatList]);

  const getAnswerItem = (item: ChatItemType) => {
    if (item.status === 0) {
      return { answer: typingAnswer };
    }
    return item;
  };

  const confirmAsk = async (value: string) => {
    await preSaveChat(value);
  };

  return (
    <>
      <div
        ref={divRef}
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100vh - 132px)" }}
      >
        {chatList.map((item) => (
          <div key={item.itemId} className="w-[48rem] mx-auto">
            <div className="flex flex-col items-end px-5 py-4">
              <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
                {item.question}
              </div>
            </div>
            <ChatListItem item={getAnswerItem(item)} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput onAsk={confirmAsk} typing={false} />
      </div>
    </>
  );
}
