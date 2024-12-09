import { MouseEvent } from "react";
import { useChatList } from "@/contexts/ChatContext";
import { useLoading } from "@/contexts/LoadingContext";
import { deleteConversation } from "@/service/question";
import { ConversationItemType } from "@/types/question";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import cls from "classnames";
import { AiOutlineEllipsis } from "react-icons/ai";

interface IMenuItemProps {
  item: ConversationItemType;
  onDelete: () => void;
  clickCallback?: () => void;
}
const MenuItem = (props: IMenuItemProps) => {
  const { item, onDelete, clickCallback = () => {} } = props;
  const { id } = useParams();
  const { setIsLoading } = useLoading();
  const { setChatList } = useChatList();
  const router = useRouter();

  const deleteQuestion = async (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await deleteConversation({ conversationId: item.conversationId });
      onDelete();
      setIsLoading(false);
      if (+id === item.conversationId) {
        router.push("/chat");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const clickHandle = () => {
    setChatList([]);
    clickCallback();
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <span onClick={(e) => e.preventDefault()} className="text-text-primary">
          分享
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span onClick={deleteQuestion} className="text-text-primary">
          删除
        </span>
      ),
      key: "1",
    },
  ];
  return (
    <Link
      href={`/m/chat/${item.conversationId}`}
      key={item.conversationId}
      className={cls(
        "block text-text-primary",
        "rounded-lg px-2.5 py-1.5 text-sm cursor-pointer group",
        "text-nowrap",
        "overflow-hidden",
        "relative",
        "hover:bg-sidebar-surface-secondary",
        +id === item.conversationId ? "bg-sidebar-surface-secondary" : ""
      )}
      onClick={clickHandle}
    >
      {item.question}
      <div className="absolute bottom-0 top-0 right-0 w-10 bg-gradient-to-l from-60% to-transparent from-sidebar-surface-primary group-hover:from-sidebar-surface-secondary"></div>
      <Dropdown
        menu={{
          items,
          className: "!bg-main-surface-secondary",
        }}
        trigger={["click"]}
      >
        <span
          className={cls(
            "absolute px-1 bottom-0 top-0 right-0 w-8 group-hover:flex items-center justify-end bg-sidebar-surface-secondary",
            +id === item.conversationId ? "flex" : "hidden"
          )}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <AiOutlineEllipsis className="size-6" />
        </span>
      </Dropdown>
    </Link>
  );
};

export default MenuItem;
