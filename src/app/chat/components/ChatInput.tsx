"use client";
import Image from "next/image";
import askPng from "/public/img/ask.png";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { message } from "antd";
import { useLoading } from "@/contexts/LoadingContext";
import { isLogin } from "@/utils";
import { useLoginOpen } from "@/contexts/LoginContext";
import { askQuestion, saveChat } from "@/service/question";
import { useRouter } from "next/navigation";
import { useChatList } from "@/contexts/ChatContext";
export default function ChatInput(props: { id?: string }) {
  const [inputValue, setInputValue] = useState("");
  const { updateChatList, chatList } = useChatList();
  const { setIsLoading } = useLoading();
  const { setLoginOpen } = useLoginOpen();
  const router = useRouter();

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchQuestion();
    }
  };
  const fetchQuestion = async () => {
    if (!isLogin()) {
      setLoginOpen(true);
      return;
    }
    if (!inputValue) {
      message.error("您还没有向我提问");
      return;
    }
    setIsLoading(true);
    const messages: { role: "user" | "assistant"; content: string }[] = [];
    chatList.forEach((item) => {
      messages.push({ role: "user", content: item.question });
      messages.push({ role: "assistant", content: item.answer });
    });
    messages.push({ role: "user", content: inputValue });
    try {
      const res = await askQuestion({ messages });
      if (res.code === 0) {
        const saveRes = await saveChat({
          conversationId: props.id,
          question: inputValue,
          answer: res.answer,
        });
        const {
          answer: {
            data: { conversationId, questionId },
          },
        } = saveRes;
        localStorage.setItem("typingId", questionId + "");
        if (props.id) {
          updateChatList();
        } else {
          router.push(`/chat/${conversationId}`);
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="bg-main-surface-secondary w-[48rem] mx-auto rounded-full h-14 p-3 shadow-md flex gap-2.5">
      <div className="size-8 flex items-center justify-center">
        <AiOutlineComment className="size-6" />
      </div>
      <input
        onChange={inputChange}
        onKeyDown={keyDown}
        className="outline-none flex-1 bg-main-surface-secondary"
        placeholder="尽管来问我～"
      />
      <div
        onClick={fetchQuestion}
        className="size-8 flex items-center justify-center cursor-pointer"
      >
        <Image src={askPng} alt="" className="size-8" />
      </div>
    </div>
  );
}
