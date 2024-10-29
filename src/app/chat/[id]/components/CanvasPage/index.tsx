"use client";
import { useRef, useState, MouseEvent, useEffect } from "react";
import LeftContent from "./LeftContent";
import { useChatList } from "@/contexts/ChatContext";
import { useLoading } from "@/contexts/LoadingContext";
import RightContent from "./RightContent";

const CanvasPage = () => {
  const [leftWidth, setLeftWidth] = useState(400);
  const { updateChatList } = useChatList();
  const { setIsLoading } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const initData = async () => {
    setIsLoading(true);
    await updateChatList();
    setIsLoading(false);
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const newLeftWidth = e.clientX - (containerRect?.left || 0);
    if (newLeftWidth > 400 && newLeftWidth < (containerRect?.width || 0) - 50) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="flex h-full w-full relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div style={{ width: leftWidth }} className="relative flex-shrink-0">
        <LeftContent />
      </div>
      <div
        className="h-full border-l-[4px] border-main-surface-tertiary cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>
      <div className="flex-1 bg-main-surface-secondary">
        <RightContent />
      </div>
    </div>
  );
};

export default CanvasPage;
