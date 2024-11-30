"use client";
import { getHistoryList } from "@/service/question";
import { ConversationItemType } from "@/types/question";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ConversationContextProps {
  conversationList: ConversationItemType[];
  updateConversation: (params: {
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
}

const ConversationContext = createContext<ConversationContextProps | undefined>(
  undefined
);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversationList, setConversationList] = useState([]);

  const updateConversation = async ({ page = 1, pageSize = 30 }) => {
    const { data } = await getHistoryList({ page, pageSize });
    setConversationList(data.items);
  };

  return (
    <ConversationContext.Provider
      value={{ conversationList, updateConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
