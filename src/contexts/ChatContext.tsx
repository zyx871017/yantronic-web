"use client";
import type { ChatItemType, IMessageItem } from "@/types/question";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useLoading } from "./LoadingContext";
import { getChatDetail, ISaveChatRes, saveChat } from "@/service/question";
import { useParams } from "next/navigation";
import { getContent } from "@/utils/chat";

interface ChatContextProps {
  chatList: ChatItemType[];
  typingId: MutableRefObject<number>;
  typingAnswer: string;
  setTypingAnswer: (v: string) => void;
  queryMore: () => void;
  sendStreamRequest: (
    messages: IMessageItem[],
    questionId: number,
    cancelCallBack: (fn: () => void) => void
  ) => void;
  setChatList: (list: ChatItemType[]) => void;
  updateChatList: () => void;
  preSaveChat: (value: string) => Promise<ISaveChatRes>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatList, setChatList] = useState<ChatItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const typingId: MutableRefObject<number> = useRef(-1);
  const [typingAnswer, setTypingAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();
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

  const preSaveChat = async (value: string) => {
    const saveRes = await saveChat({
      question: value,
      answer: "",
      conversationId: id as string,
    });
    const {
      data: { conversationId, questionId },
    } = saveRes;
    if (chatList[0]?.conversationId === conversationId) {
      setChatList([
        ...chatList,
        {
          conversationId: conversationId,
          itemId: questionId,
          question: value,
          answer: "",
          status: 0,
          createTime: "",
        },
      ]);
    } else {
      setChatList([
        {
          conversationId: conversationId,
          itemId: questionId,
          question: value,
          answer: "",
          status: 0,
          createTime: "",
        },
      ]);
    }
    return saveRes;
  };

  const pushNewChat = (typingAnswer: string) => {
    setChatList((prevChatList) => {
      const unfinishIndex = prevChatList.findIndex((item) => item.status === 0);
      if (unfinishIndex >= 0) {
        const updatedChatList = [...prevChatList];
        updatedChatList[unfinishIndex].answer = typingAnswer;
        updatedChatList[unfinishIndex].status = 1;
        return updatedChatList;
      }
      return prevChatList;
    });

    setTypingAnswer("");
  };

  const sendStreamRequest = useCallback(
    async (
      messages: IMessageItem[],
      questionId: number,
      cancelCallBack: (fn: () => void) => void
    ) => {
      const url = "/api/fetchAsk";
      const token = localStorage.getItem("token");
      const headers = {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      let done = false;
      let answer = "";
      try {
        // 创建一个 AbortController 实例
        const controller = new AbortController();
        // 获取信号对象
        const signal = controller.signal;
        console.log(cancelCallBack);
        // 将取消请求的函数传递回调用方
        cancelCallBack(() => {
          console.log(controller);
          controller?.abort();
        });
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          signal: signal,
          body: JSON.stringify({ messages, questionId }),
        });

        if (!response.ok) {
          console.error("Error sending request:", response.status);
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        while (!done && reader) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          const chunk = decoder.decode(value, { stream: true });
          const content = getContent(chunk);

          setTypingAnswer((prevAnswer) => prevAnswer + content);
          answer += content;
        }
        if (done) {
          typingId.current = -1;
          pushNewChat(answer);
        }
      } catch (err: unknown) {
        typingId.current = -1;
        pushNewChat(answer);
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("请求被中止");
          } else {
            console.error(err);
          }
        } else {
          console.error("未知错误:", err);
        }
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
        setChatList,
        setTypingAnswer,
        updateChatList,
        queryMore,
        sendStreamRequest,
        preSaveChat,
        typingId,
        chatList,
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
