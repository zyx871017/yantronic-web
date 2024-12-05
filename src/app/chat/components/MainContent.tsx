"use client";
import { ReactNode } from "react";
import Header from "./Header";
import { useLayout } from "@/contexts/LayoutContext";
import SideMenu from "./SideMenu";
import { isMobile } from "@/utils";

const MainContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sideOpen } = useLayout();

  return (
    <div className="w-full h-full flex relative">
      <SideMenu />
      <div
        className="h-full absolute right-0 bg-main-surface-primary transition-left"
        style={{
          left: sideOpen && !isMobile() ? "clamp(160px, 25vw, 280px)" : 0,
        }}
      >
        <div className="size-full relative">
          <Header />
          {children}
          <div className="absolute bottom-0 text-sm text-text-tertiary text-center w-full">内容由言创AI大模型生成，仅供您参考</div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
