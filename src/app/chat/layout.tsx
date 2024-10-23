import Link from "next/link";
import {
  AiOutlinePlus,
  AiOutlineMenuUnfold,
  AiOutlineForm,
} from "react-icons/ai";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import { Button } from "antd";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 bg-sidebar-surface-primary left-0 bottom-0 w-left-width border-r border-border hidden sm:flex flex-col">
        <div className="text-black mt-3 mx-0 flex items-center justify-between">
          <Button type="text">
            <AiOutlineMenuUnfold className="size-6 text-text-primary" />
          </Button>
          <Button type="text">
            <AiOutlineForm className="size-6 text-text-primary" />
          </Button>
        </div>
        <div className="flex mt-4 mb-1.5 px-3">
          <Link
            href="/chat"
            className="border-[0.5px] w-full h-10 border-border-main flex items-center rounded-xl px-2 py-1.5 bg-main-light cursor-pointer"
          >
            <div className="size-6 flex justify-center items-center">
              <AiOutlinePlus className="size-4" />
            </div>
            <span className="text-sm font-semibold">新对话</span>
          </Link>
        </div>
        <SideMenu />
      </div>
      <div className="pl-left-width size-full">
        <div className="size-full relative">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
