"use client";
import { getChatDetail } from "@/service/question";
import ChatInput from "../components/ChatInput";
import { useEffect, useState } from "react";
import { ChatItemType } from "@/types/question";

export default function ChatDetail({ params }: { params: { id: string } }) {
  const [dataList, setData] = useState<ChatItemType[]>([]);
  const initData = async () => {
    const res = await getChatDetail({
      page: 1,
      pageSize: 10,
      conversationId: +params.id,
    });
    if (res.code === 0) {
      setData(res.data.items);
    }
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <>
      <div className="p-6">
        {dataList.map((item) => (
          <div key={item.id}>
            <div className="flex flex-col items-end px-5 py-4">
              <div className="px-5 py-2.5 rounded-3xl bg-slate-100">{item.question}</div>
            </div>
            <div className="px-5 py-4 text-base leading-7">{item.answer}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <ChatInput id={params.id} />
      </div>
    </>
  );
}
