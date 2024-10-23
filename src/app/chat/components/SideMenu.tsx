"use client";
import { getHistoryList } from "@/service/question";
import { QuestionItemType } from "@/types/question";
import cls from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideMenu() {
  const { id } = useParams();
  const [dataList, setDataList] = useState<QuestionItemType[]>([]);
  const getData = async () => {
    const { data } = await getHistoryList({ page: 1, pageSize: 30 });
    setDataList(data.items);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-3 flex flex-col gap-[2px] flex-1 overflow-y-auto">
      {dataList.map((item) => {
        return (
          <Link
            href={`/chat/${item.id}`}
            key={item.id}
            className={cls(
              "rounded-lg px-2.5 py-1.5 text-sm cursor-pointer",
              +id === item.id ? "bg-sidebar-surface-secondary" : ""
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
