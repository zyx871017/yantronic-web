"use client";
import { getHistoryList } from "@/service/question";
import { ConversationItemType } from "@/types/question";
import { isLogin } from "@/utils";
import { useParams } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const { id } = useParams();

  const updateConversation = async ({ page = 1, pageSize = 30 }) => {
    if (isLogin()) {
      const { data } = await getHistoryList({ page, pageSize });
      setConversationList(data.items);
    } else {
      setConversationList([]);
    }
  };

  useEffect(() => {
    updateConversation({});
  }, [id]);

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
