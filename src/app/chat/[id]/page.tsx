"use client";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef, useState } from "react";
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
  const [cancelHandle, setCancelHandle] = useState<() => void>(() => {});
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
        sendStreamRequest(messages, unfinishedAnswer.itemId, cancelCallBack);
      }
    }
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatList]);
  const cancelCallBack = (cancel: () => void) => {
    setCancelHandle(() => cancel); // 保存取消函数
  };
  const getAnswerItem = (item: ChatItemType) => {
    if (item.status === 0) {
      return { answer: typingAnswer };
    }
    return item;
  };

  const confirmAsk = async (value: string) => {
    await preSaveChat(value);
  };
  const confirmCancel = () => {
    cancelHandle();
  };
  return (
    <div
      className="flex flex-col flex-1"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div ref={divRef} className="p-6 overflow-y-auto">
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
      <div className="mb-6 w-[48rem] m-auto">
        <ChatInput
          onAsk={confirmAsk}
          onCancel={() => confirmCancel()}
          typing={false}
        />
      </div>
    </div>
  );
}
