import logo from "/public/img/logo.png";
import { getHistoryList } from "@/service/question";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import SideMenu from "./components/SideMenu";
import Link from "next/link";
import ChatInput from "./components/ChatInput";
import LoginButton from "./components/LoginButton";

export default async function Home() {
  const { data } = await getHistoryList();
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
        <SideMenu data={data}></SideMenu>
      </div>
      <div className="pl-left-width size-full">
        <div className="size-full relative">
          <LoginButton />
          <div className="text-center w-[318px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src={logo}
              alt=""
              className="h-28 inline-block mb-10"
            ></Image>
            <div className="text-black mb-10">
              <div>Hi~很高兴遇见你！🎉🎉🎉</div>
              <div className="max-w-[318px]">
                我是彩小言，一个专注于彩票信息的智能聊天助手，我的目标是为您提供最新、最准确的彩票数据和分析，帮助您更好地了解彩票的世界。
              </div>
            </div>
            <div className="mb-2.5 text-sm">你可以这样问:</div>
            <div className="mb-2.5 px-2.5 inline-block w-fit border text-sm h-12 leading-[48px] text-black rounded-[24px] cursor-pointer">
              💡你能介绍一些常见的彩票种类吗？
            </div>
            <div className="mb-2.5 px-2.5 inline-block w-fit border text-sm h-12 leading-[48px] text-black rounded-[24px] cursor-pointer">
              💡不同彩票的中奖概率有多大？？
            </div>
            <div className="px-2.5 inline-block w-fit border text-sm h-12 leading-[48px] text-black rounded-[24px] cursor-pointer">
              💡如何查询最新的彩票开奖结果？？
            </div>
          </div>
          <div className="absolute bottom-5 left-6 right-6">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}
