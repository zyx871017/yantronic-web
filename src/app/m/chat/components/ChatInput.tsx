"use client";
import { useState, KeyboardEvent } from "react";
import { BsArrowUpCircleFill, BsFillStopCircleFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { Tooltip } from "antd";
import { isLogin } from "@/utils";
import { useLoginOpen } from "@/contexts/LoginContext";
import { useChatList } from "@/contexts/ChatContext";
import classNames from "classnames";
import { Input, Button } from "antd";
const { TextArea } = Input;

interface IProps {
  onAsk: (value: string) => void;
  onCancel?: () => void;
  typing: boolean;
  id?: string;
}

const ChatInput = (props: IProps) => {
  const { onAsk, typing, onCancel = () => {} } = props;
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { setLoginOpen } = useLoginOpen();
  const { typingId } = useChatList();

  const inputChange = (value: string) => {
    setInputValue(value);
  };
  const keyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !typing) {
      e.preventDefault();
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
    console.log(onAsk);
    onAsk(inputValue);
    setInputValue("");
  };
  return (
    <div className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-main-surface-secondary">
      <TextArea
        size="large"
        value={inputValue}
        onChange={(e) => inputChange(e.target.value)}
        onPressEnter={(e) => keyDown(e)}
        placeholder="尽管来问我～"
        className="!border-0 !shadow-none !bg-transparent !px-2 !placeholder-text-secondary !text-text-primary"
        autoSize={{ minRows: 1, maxRows: 6 }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        style={{
          resize: "none",
        }}
      />
      <div className="flex h-[44px] items-center justify-between">
        <Button
          type="text"
          icon={<MdAttachFile className="size-6 text-text-primary" />}
        ></Button>
        {typing ? null : typingId.current !== -1 ? (
          <BsFillStopCircleFill
            onClick={() => onCancel()}
            className={classNames(["size-8 cursor-pointer hover:opacity-70"])}
          />
        ) : (
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
    </div>
  );
};
ChatInput.display = "ChatInput";
export default ChatInput;
