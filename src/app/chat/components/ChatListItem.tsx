"use client";
import { useState } from "react";
import { ChatItemType } from "@/types/question";
import MarkdownReader from "@/components/Markdown/MarkdownReader";
import { Button, Tooltip } from "antd";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { fetchUpOrDown } from "@/service/question";

interface IProps {
  item: Partial<ChatItemType>;
}
const ChatListItem = (props: IProps) => {
  const [upOrDown, setUpOrDown] = useState("");
  const [copied, setCopied] = useState(false);
  const { item } = props;

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

  const changeUpOrDown = async (key: string) => {
    setUpOrDown(key);
    fetchUpOrDown({ questionId: item.itemId || 0, upOrDown: key });
  };
  return (
    <div className="group relative mb-10">
      <MarkdownReader text={item.answer?.trimStart() || ""} />
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
              onClick={() => copyText(item.answer || "")}
            >
              <AiOutlineCopy className="size-5 text-text-secondary" />
            </Button>
          </Tooltip>
        )}
        {upOrDown === "down" ? null : (
          <Tooltip title="最佳回复" placement="bottom">
            <Button
              className="!px-1"
              type="text"
              onClick={() => changeUpOrDown("up")}
            >
              {upOrDown === "up" ? (
                <AiFillLike className="size-5 text-text-secondary" />
              ) : (
                <AiOutlineLike className="size-5 text-text-secondary" />
              )}
            </Button>
          </Tooltip>
        )}
        {upOrDown === "up" ? null : (
          <Tooltip title="错误回复" placement="bottom">
            <Button
              className="!px-1"
              type="text"
              onClick={() => changeUpOrDown("down")}
            >
              {upOrDown === "down" ? (
                <AiFillDislike className="size-5 text-text-secondary" />
              ) : (
                <AiOutlineDislike className="size-5 text-text-secondary" />
              )}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
