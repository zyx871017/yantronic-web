import logo from "/public/img/logo.png";
import { getHistoryList } from "@/service/question";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import SideMenu from "./components/SideMenu";
import Link from "next/link";
import ChatInput from "./components/ChatInput";
import LoginButton from "../components/LoginButton";

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
          <div className="px-5 text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-full mb-10 text-4xl font-semibold text-center">
              有什么可以帮您？？
            </div>
            <ChatInput />
            <div className="flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
