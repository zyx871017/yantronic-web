"use client";
import { useEffect, useState } from "react";
import logo from "/public/img/logo.png";
import { getHistoryList } from "@/service/question";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import SideMenu from "../components/SideMenu";
import Link from "next/link";
import ChatInput from "../components/ChatInput";
import dynamic from "next/dynamic";
import { QuestionItemType } from "@/types/question";
const ReactEditor = dynamic(() => import("../components/ReactEditor"), {
  ssr: false,
});

export default function Home({ params }: { params: { id: string } }) {
  const [dataList, setDataList] = useState<QuestionItemType[]>([]);
  const getData = async () => {
    const { data } = await getHistoryList();
    setDataList(data);
  };
  useEffect(() => {
    getData();
  });
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 bg-left-bg left-0 bottom-0 w-left-width border-r border-border hidden sm:block">
        <div className="text-black mt-3 mr-2.5 ml-4 flex items-center">
          <Image src={logo} alt="" className="h-9 w-[96px]" />
        </div>
        <div className="flex mt-4 mb-1.5 px-3">
          <Link
            href="/chat"
            className="border-[0.5px] w-full h-10 border-border-main flex items-center rounded-xl px-2 py-1.5 bg-main-light cursor-pointer"
          >
            <div className="size-6 flex justify-center items-center">
              <AiOutlinePlus className="text-main size-4" />
            </div>
            <span className="text-main text-sm font-semibold">新对话</span>
          </Link>
        </div>
        <SideMenu data={dataList} currentId={+params.id}></SideMenu>
      </div>
      <div className="pl-left-width size-full">
        <div className="size-full relative">
          <ReactEditor />
          <div className="absolute bottom-5 left-6 right-6">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}