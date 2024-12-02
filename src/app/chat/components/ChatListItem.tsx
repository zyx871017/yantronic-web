"use client";
import { useState } from "react";
import { ChatItemType } from "@/types/question";
import MarkdownReader from "./Markdown/MarkdownReader";
import { Button, Tooltip } from "antd";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

interface IProps {
  item: Partial<ChatItemType>;
}
const ChatListItem = (props: IProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
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
  return (
    <div className="group relative mb-10">
      <MarkdownReader text={item.answer || ""} />
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
  );
};

export default ChatListItem;
