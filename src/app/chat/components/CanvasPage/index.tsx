"use client";
import { useRef, useState, MouseEvent } from "react";

const CanvasPage = () => {
  const [leftWidth, setLeftWidth] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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
      <div style={{ width: leftWidth }}>Left Content</div>
      <div
        className="h-full border-l-[4px] border-main-surface-tertiary cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>
      <div>Right Content</div>
    </div>
  );
};

export default CanvasPage;
