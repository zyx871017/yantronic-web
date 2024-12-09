"use client";

import { useChatList } from "@/contexts/ChatContext";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef } from "react";
import ChatListItem from "@/app/chat/components/ChatListItem";
import { ChatItemType, IMessageItem } from "@/types/question";

const MobileChatDetail = () => {
  const {
    updateChatList,
    chatList,
    typingAnswer,
    typingId,
    sendStreamRequest,
    preSaveChat,
    cancelHandle,
  } = useChatList();
  const divRef = useRef<HTMLDivElement>(null);
  const onAsk = async (question: string) => {
    await preSaveChat(question);
  };
  const cancelAnswer = () => {
    cancelHandle();
  };

  const getAnswerItem = (item: ChatItemType) => {
    if (item.status === 0) {
      return { answer: typingAnswer };
    }
    return item;
  };

  useEffect(() => {
    updateChatList();
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

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      <div className="w-full flex flex-col h-full">
        <div className="px-3 flex flex-col h-full overflow-y-auto overflow-x-hidden">
          {chatList.map((item) => (
            <div key={item.itemId} className="w-full">
              <div className="flex justify-end p-3">
                <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
                  {item.question}
                </div>
              </div>
              <ChatListItem item={getAnswerItem(item)} />
            </div>
          ))}
        </div>
        <div className="px-3">
          <ChatInput
            onAsk={onAsk}
            onCancel={cancelAnswer}
            typing={!!typingAnswer}
          />
        </div>
        <div className="text-xs text-center p-2">
          内容由言创AI大模型生成，仅供您参考
        </div>
      </div>
    </div>
  );
};

export default MobileChatDetail;
