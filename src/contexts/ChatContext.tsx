"use client";
import type { ChatItemType, IMessageItem } from "@/types/question";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useLoading } from "./LoadingContext";
import { getChatDetail } from "@/service/question";
import { useParams } from "next/navigation";
import { getChatData, getContent } from "@/utils/chat";
import { useRouter } from "next/navigation";

interface ChatContextProps {
  chatList: ChatItemType[];
  typingId: number;
  typingAnswer: string;
  setTypingId: (v: number) => void;
  queryMore: () => void;
  sendStreamRequest: (messages: IMessageItem[]) => void;
  setChatList: (list: ChatItemType[]) => void;
  updateChatList: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatList, setChatList] = useState<ChatItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [typingId, setTypingId] = useState(-1);
  const [typingAnswer, setTypingAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();
  const router = useRouter();
  const { id } = useParams();

  const updateChatList = async () => {
    const res = await getChatDetail({
      page: 1,
      pageSize: 10,
      conversationId: +id,
    });
    if (res.code === 0) {
      setChatList(res.data.items.reverse());
      setHasMore(res.data.hasMore);
    }
  };

  const checkChatId = (input: string) => {
    if (input.startsWith("chatData:")) {
      const chatData = getChatData(input);
      if (+id === chatData.conversationId) {
        return;
      } else {
        router.push(`/chat/${chatData.conversationId}`);
      }
    }
  };

  const sendStreamRequest = useCallback(
    async (messages: IMessageItem[]) => {
      const url = "/api/fetchAsk";
      const token = localStorage.getItem("token");
      const headers = {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        console.error("Error sending request:", response.status);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let done = false;
      while (!done && reader) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        checkChatId(chunk);
        const content = getContent(chunk);

        // 使用函数式更新确保获取最新的状态值
        setTypingAnswer((prevAnswer) => prevAnswer + content);
      }
      if (done) {
      }
    },
    [setTypingAnswer]
  );

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
      value={{
        chatList,
        setChatList,
        updateChatList,
        queryMore,
        typingId,
        setTypingId,
        sendStreamRequest,
        typingAnswer,
      }}
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
