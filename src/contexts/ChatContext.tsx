"use client";
import { ChatItemType } from "@/types/question";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLoading } from "./LoadingContext";
import { getChatDetail } from "@/service/question";
import { useParams } from "next/navigation";

interface ChatContextProps {
  chatList: ChatItemType[];
  setChatList: (list: ChatItemType[]) => void;
  updateChatList: () => void;
  queryMore: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatList, setChatList] = useState<ChatItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();
  const { id } = useParams();
  const updateChatList = async () => {
    setIsLoading(true);
    const res = await getChatDetail({
      page: 1,
      pageSize: 10,
      conversationId: +id,
    });
    if (res.code === 0) {
      setChatList(res.data.items.reverse());
      setHasMore(res.data.hasMore);
    }
    setIsLoading(false);
  };

  const queryMore = async () => {
    if (hasMore) {
      setIsLoading(true);
      const res = await getChatDetail({
        page: currentPage + 1,
        pageSize: 10,
        conversationId: +id,
      });
      if (res.code === 0) {
        setChatList(res.data.items.reverse());
        setHasMore(res.data.hasMore);
        setCurrentPage(currentPage + 1);
      }
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ chatList, setChatList, updateChatList, queryMore }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatList = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useLoginOpen must be used within a LoginOpenProvider");
  }
  return context;
};
