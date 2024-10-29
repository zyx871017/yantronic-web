"use client";
import { ReactNode } from "react";
import Header from "../../components/Header";
import { useLayout } from "@/contexts/LayoutContext";
import SideMenu from "../../components/SideMenu";
import CanvasPage from "./CanvasPage";

const MainContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sideOpen, canvasMode } = useLayout();
  if (canvasMode) {
    return <CanvasPage></CanvasPage>;
  }
  return (
    <div className="w-full h-full flex relative">
      <SideMenu />
      <div
        className="h-full absolute right-0 bg-main-surface-primary transition-left"
        style={{
          left: sideOpen ? "clamp(160px, 25vw, 280px)" : 0,
        }}
      >
        <div className="size-full relative">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
