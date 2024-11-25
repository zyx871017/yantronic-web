"use client";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { Tooltip } from "antd";
import { isLogin } from "@/utils";
import { useLoginOpen } from "@/contexts/LoginContext";
import classNames from "classnames";

interface IProps {
  onAsk: (value: string) => void;
  typing: boolean;
  id?: string;
}

export default function ChatInput(props: IProps) {
  const { onAsk, typing } = props;
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { setLoginOpen } = useLoginOpen();

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !typing) {
      fetchQuestion();
    }
  };

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
    onAsk(inputValue);
    setInputValue("");
  };
  return (
    <div className="bg-main-surface-secondary max-w-[48rem] mx-auto rounded-full h-14 p-3 shadow-md flex gap-2.5">
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
      {typing ? null : (
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
      )}
    </div>
  );
}
