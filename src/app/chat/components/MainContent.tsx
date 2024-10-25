"use client";
import { ReactNode } from "react";
import Header from "./Header";
import { useLayout } from "@/contexts/LayoutContext";

const MainContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sideOpen } = useLayout();
  return (
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
  );
};

export default MainContent;
