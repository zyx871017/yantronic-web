"use client";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineCopy,
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineCheck,
} from "react-icons/ai";
import TypeWrite from "../components/TypeWrite";
import { useLoading } from "@/contexts/LoadingContext";
import { useChatList } from "@/contexts/ChatContext";
import MarkdownReader from "../components/Markdown/MarkdownReader";
import { Button, Tooltip } from "antd";
import CanvasPage from "../components/CanvasPage";
import { useLayout } from "@/contexts/LayoutContext";

export default function ChatDetail({ params }: { params: { id: string } }) {
  const { updateChatList, chatList, typingId, setTypingId } = useChatList();
  const { setSideOpen } = useLayout();
  const { setIsLoading } = useLoading();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canvasMode, setCanvasMode] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const initData = async () => {
    setIsLoading(true);
    await updateChatList();
    setIsLoading(false);
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatList]);

  const typingEnd = () => {
    localStorage.removeItem("typingId");
    setTypingId(-1);
  };
  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  if (canvasMode) {
    return <CanvasPage />;
  }
  return (
    <>
      <div
        ref={divRef}
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100vh - 132px)" }}
      >
        {chatList.reverse().map((item) => (
          <div key={item.id} className="w-[48rem] mx-auto">
            <div className="flex flex-col items-end px-5 py-4">
              <div className="px-5 py-2.5 rounded-3xl bg-main-surface-secondary">
                {item.question}
              </div>
            </div>
            {typingId === item.id ? (
              <p className="px-5 py-4 text-base leading-7">
                <TypeWrite text={item.answer} onTypingEnd={typingEnd} />
              </p>
            ) : (
              <div className="group relative mb-10">
                <MarkdownReader text={item.answer} />
                <div className="absolute w-full h-10 -bottom-10 hidden group-hover:block">
                  {copied ? (
                    <Tooltip title="复制" placement="bottom">
                      <Button className="!px-1" type="text">
                        <AiOutlineCheck className="size-5 text-text-secondary" />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="复制" placement="bottom">
                      <Button
                        className="!px-1"
                        type="text"
                        onClick={() => copyText(item.answer)}
                      >
                        <AiOutlineCopy className="size-5 text-text-secondary" />
                      </Button>
                    </Tooltip>
                  )}
                  {disliked ? null : (
                    <Tooltip title="最佳回复" placement="bottom">
                      <Button
                        className="!px-1"
                        type="text"
                        onClick={() => setLiked(true)}
                      >
                        {liked ? (
                          <AiFillLike className="size-5 text-text-secondary" />
                        ) : (
                          <AiOutlineLike className="size-5 text-text-secondary" />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                  {liked ? null : (
                    <Tooltip title="错误回复" placement="bottom">
                      <Button
                        className="!px-1"
                        type="text"
                        onClick={() => setDisliked(true)}
                      >
                        {disliked ? (
                          <AiFillDislike className="size-5 text-text-secondary" />
                        ) : (
                          <AiOutlineDislike className="size-5 text-text-secondary" />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput id={params.id} />
      </div>
    </>
  );
}
