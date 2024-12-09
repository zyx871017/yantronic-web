"use client";
import { Button, Drawer } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineForm,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { useConversation } from "@/contexts/ConversationContext";
import { ConversationItemType } from "@/types/question";
import cls from "classnames";
import dayjs from "dayjs";
import MenuItem from "./MenuItem";

type CategorizedData = {
  [key: string]: ConversationItemType[];
};
const MobileHeader: React.FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const { conversationList, updateConversation } = useConversation();
  const clickHandle = () => {
    setSideOpen(false);
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
  const categorizeData = (data: ConversationItemType[]): CategorizedData => {
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
  return (
    <div className="w-full flex h-[60px] items-center relative justify-center">
      <Button
        className="ml-3 !p-0 !absolute left-0"
        type="text"
        onClick={() => setSideOpen(true)}
      >
        <AiOutlineMenuUnfold className="size-6 text-text-primary" />
      </Button>
      <span>言创大模型</span>
      <Link href="/chat" className="!p-0 absolute mr-3 right-0" type="text">
        <AiOutlineForm className="size-6 text-text-primary" />
      </Link>

      <Drawer
        width="18rem"
        closeIcon={null}
        open={sideOpen}
        maskClosable
        onClose={() => setSideOpen(false)}
        className="p-0"
        styles={{ body: { padding: 0 } }}
        placement="left"
      >
        <div className="h-full bg-sidebar-surface-primary">
          <div className="h-[60px] flex justify-between items-center">
            <Button type="text" onClick={() => setSideOpen(false)}>
              <AiOutlineMenuFold className="size-6 text-text-primary" />
            </Button>
            <Link
              href="/m/chat"
              className="px-4"
              type="text"
              onClick={clickHandle}
            >
              <AiOutlineForm className="size-6 text-text-primary" />
            </Link>
          </div>
          <div className="text-text-primary">
            {Object.entries(categorizeData(conversationList)).map(
              ([key, data], index) => {
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
                            onDelete={() => updateConversation({})}
                            clickCallback={clickHandle}
                            item={item}
                          />
                        );
                      })}
                    </div>
                  )
                );
              }
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileHeader;
