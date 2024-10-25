"use client";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { Tooltip } from "antd";
import { useLoading } from "@/contexts/LoadingContext";
import { isLogin } from "@/utils";
import { useLoginOpen } from "@/contexts/LoginContext";
import { askQuestion, saveChat } from "@/service/question";
import { useRouter } from "next/navigation";
import { useChatList } from "@/contexts/ChatContext";
import classNames from "classnames";
export default function ChatInput(props: { id?: string }) {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { updateChatList, chatList, setChatList, setTypingId } = useChatList();
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

  useEffect(() => {
    if (!props.id) {
      setChatList([]);
    }
  }, [props.id]);
  // 确认提问
  const fetchQuestion = async () => {
    if (isComposing) {
      return;
    }
    if (!isLogin()) {
      setLoginOpen(true);
      return;
    }
    if (!inputValue) {
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
        setTypingId(questionId);
        if (props.id) {
          updateChatList();
        } else {
          router.push(`/chat/${conversationId}`);
        }
        setInputValue("");
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
        value={inputValue}
        onChange={inputChange}
        onKeyDown={keyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="outline-none flex-1 bg-main-surface-secondary"
        placeholder="尽管来问我～"
      />
      <Tooltip title={inputValue ? null : "消息为空"}>
        <div
          onClick={fetchQuestion}
          className="size-8 flex items-center justify-center cursor-pointer"
        >
          <BsArrowUpCircleFill
            className={classNames([
              "size-8",
              inputValue ? "text-text-primary" : "text-text-tertiary",
            ])}
          />
        </div>
      </Tooltip>
    </div>
  );
}
