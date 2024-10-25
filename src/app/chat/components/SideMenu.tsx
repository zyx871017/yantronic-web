"use client";
import { useLayout } from "@/contexts/LayoutContext";
import { deleteConversation, getHistoryList } from "@/service/question";
import { QuestionItemType } from "@/types/question";
import { Button, Dropdown, MenuProps, Tooltip } from "antd";
import cls from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import {
  AiOutlineForm,
  AiOutlineMenuFold,
  AiOutlinePlus,
  AiOutlineEllipsis,
} from "react-icons/ai";

interface IMenuItemProps {
  item: QuestionItemType;
  onDelete: () => void;
}

function MenuItem(props: IMenuItemProps) {
  const { item, onDelete } = props;
  const { id } = useParams();

  const deleteQuestion = async (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    try {
      await deleteConversation({ conversationId: item.id });
      onDelete();
    } catch (e) {
      console.log(e);
    }
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
      href={`/chat/${item.id}`}
      key={item.id}
      className={cls(
        "rounded-lg px-2.5 py-1.5 text-sm cursor-pointer group",
        "text-nowrap",
        "overflow-hidden",
        "relative",
        "hover:bg-sidebar-surface-secondary",
        +id === item.id ? "bg-sidebar-surface-secondary" : ""
      )}
    >
      {item.title}
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
            +id === item.id ? "flex" : "hidden"
          )}
          onClick={(e) => e.preventDefault()}
        >
          <AiOutlineEllipsis className="size-6" />
        </span>
      </Dropdown>
    </Link>
  );
}

export default function SideMenu() {
  const { id } = useParams();
  const [dataList, setDataList] = useState<QuestionItemType[]>([]);
  const { setSideOpen } = useLayout();
  const getData = async () => {
    const { data } = await getHistoryList({ page: 1, pageSize: 30 });
    setDataList(data.items);
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="bg-sidebar-surface-primary h-full border-r border-border hidden sm:flex flex-col overflow-hidden w-left-width">
      <div className="text-black mt-3 mx-0 flex items-center justify-between">
        <Button type="text" onClick={() => setSideOpen(false)}>
          <AiOutlineMenuFold className="size-6 text-text-primary" />
        </Button>
        <Link href="/chat" className="px-4" type="text">
          <AiOutlineForm className="size-6 text-text-primary" />
        </Link>
      </div>
      <div className="flex mt-4 mb-1.5 px-3">
        <Link
          href="/chat"
          className="active:scale-[98%] border-[0.5px] w-full h-10 border-border-main flex items-center rounded-xl px-2 py-1.5 bg-main-light cursor-pointer"
        >
          <div className="size-6 flex justify-center items-center">
            <AiOutlinePlus className="size-4" />
          </div>
          <span className="text-sm font-semibold">新对话</span>
        </Link>
      </div>
      <div className="px-3 flex flex-col gap-[2px] flex-1 overflow-y-auto">
        {dataList.map((item) => {
          return (
            <MenuItem key={item.id} onDelete={() => getData()} item={item} />
          );
        })}
      </div>
    </div>
  );
}
