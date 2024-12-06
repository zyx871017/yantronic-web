"use client";
import { useChatList } from "@/contexts/ChatContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useLoading } from "@/contexts/LoadingContext";
import { deleteConversation, getHistoryList } from "@/service/question";
import { ConversationItemType } from "@/types/question";
import { isLogin } from "@/utils";
import { Button, Dropdown, MenuProps } from "antd";
import cls from "classnames";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import {
  AiOutlineForm,
  AiOutlineMenuFold,
  AiOutlinePlus,
  AiOutlineEllipsis,
} from "react-icons/ai";
import dayjs from "dayjs";

interface IMenuItemProps {
  item: ConversationItemType;
  onDelete: () => void;
  clickCallback?: () => void;
}

function MenuItem(props: IMenuItemProps) {
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
      href={`/chat/${item.conversationId}`}
      key={item.conversationId}
      className={cls(
        "block",
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
}

export default function SideMenu() {
  const { id } = useParams();
  const { cancelHandle, typingId } = useChatList();
  const [historyList, setHistoryList] = useState<CategorizedData>({});
  const { setSideOpen } = useLayout();
  const getData = async () => {
    const { data } = await getHistoryList({ page: 1, pageSize: 30 });
    setHistoryList(categorizeData(data.items));
  };
  type Conversation = {
    conversationId: number;
    createTime: string;
    question: string;
  };
  type CategorizedData = {
    [key: string]: Conversation[];
  };
  const dayLabels = [
    "今天",
    "昨天",
    "前天",
    "3天前",
    "4天前",
    "5天前",
    "6天前",
  ];
  const weekLabels = ["上周", "2周前", "3周前", "4周前"];

  const categorizeData = (data: Conversation[]): CategorizedData => {
    const categories: CategorizedData = {
      今天: [],
      昨天: [],
      前天: [],
      "3天前": [],
      "4天前": [],
      "5天前": [],
      "6天前": [],
      上周: [],
      "2周前": [],
      "3周前": [],
      "4周前": [],
      上个月: [],
    };

    const now = dayjs(); // 当前时间

    data.forEach((item) => {
      const itemDate = dayjs(item.createTime).startOf("day"); // 记录时间（当天的零点）
      const diffDays = now.diff(itemDate, "day"); // 直接获取天数差值
      if (diffDays === 0) {
        // 今天
        categories["今天"].push(item);
      } else if (diffDays <= 6) {
        // 前 6 天
        categories[dayLabels[diffDays]].push(item);
      } else if (diffDays >= 7 && diffDays < 28) {
        // 7 到 27 天，按周分类
        const weekIndex = Math.floor((diffDays - 7) / 7);
        const label = weekLabels[Math.min(weekIndex, weekLabels.length - 1)];
        categories[label].push(item);
      } else if (diffDays >= 30) {
        // 超过 30 天的归类
        categories["上个月"].push(item);
      }
    });

    return categories;
  };

  useEffect(() => {
    if (isLogin()) {
      getData();
    }
  }, [id]);
  const clickHandle = () => {
    if (typingId.current !== -1) {
      cancelHandle();
    }
  };
  return (
    <div className="bg-sidebar-surface-primary h-full border-r border-border hidden sm:flex flex-col overflow-hidden w-left-width">
      <div className="text-black mt-3 mx-0 flex items-center justify-between">
        <Button type="text" onClick={() => setSideOpen(false)}>
          <AiOutlineMenuFold className="size-6 text-text-primary" />
        </Button>
        <Link href="/chat" className="px-4" type="text" onClick={clickHandle}>
          <AiOutlineForm className="size-6 text-text-primary" />
        </Link>
      </div>
      <div className="flex mt-4 mb-1.5 px-3">
        <Link
          href="/chat"
          className="active:scale-[98%] border-[0.5px] w-full h-10 border-border-main flex items-center rounded-xl px-2 py-1.5 bg-main-light cursor-pointer"
          onClick={clickHandle}
        >
          <div className="size-6 flex justify-center items-center">
            <AiOutlinePlus className="size-4" />
          </div>
          <span className="text-sm font-semibold">新对话</span>
        </Link>
      </div>
      <div className="px-3 flex-1 overflow-y-auto">
        {Object.entries(historyList).map(([key, data], index) => {
          return (
            data.length !== 0 && (
              <div key={key}>
                <div
                  className={cls(
                    "px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary",
                    { "mt-5": index !== 0 }
                  )}
                  key={key}
                >
                  {key}
                </div>
                {data.map((item) => {
                  return (
                    <MenuItem
                      key={item.conversationId}
                      onDelete={() => getData()}
                      clickCallback={clickHandle}
                      item={item}
                    />
                  );
                })}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
