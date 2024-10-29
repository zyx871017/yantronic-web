"use client";
import { useEffect, useRef, MouseEvent, useState } from "react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Input, Popover } from "antd";
import { oneDark } from "@codemirror/theme-one-dark";

const RightContent = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [popoverShow, setPopoverShow] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const selectionRef = useRef("");
  const [{ mouseX, mouseY }, setMousePos] = useState({ mouseX: 0, mouseY: 0 });
  useEffect(() => {
    if (domRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.selectionSet) {
              if (viewRef.current) {
                const selectedText = viewRef.current.state.sliceDoc(
                  viewRef.current.state.selection.main.from,
                  viewRef.current.state.selection.main.to
                );
                selectionRef.current = selectedText;
              }
            }
          }),
        ],
        parent: domRef.current,
      });
    }
  }, []);

  const onSelectEnd = (e: MouseEvent<HTMLDivElement>) => {
    if (selectionRef.current) {
      setMousePos({ mouseX: e.clientX, mouseY: e.clientY });
      setPopoverShow(true);
    }
  };

  const openInput = () => {
    setInputOpen(true);
  };

  return (
    <div className="code-editor">
      <div className="h-14 flex items-center justify-between p-3">
        <div className="flex items-center">
          <div className="size-10 flex justify-center items-center rounded-md hover:bg-main-surface-tertiary cursor-pointer">
            <AiOutlineClose className="size-6" />
          </div>
          <span className="ml-2.5 text-lg font-semibold">
            Resizable Split View
          </span>
        </div>
      </div>
      <div
        className="codemirror-content flex-1 h-[calc(100vh-56px)] overflow-y-auto pb-[50vh]"
        ref={domRef}
        onMouseUp={onSelectEnd}
      ></div>
      <Popover
        content={
          inputOpen ? (
            <div>
              <Input size="large" />
            </div>
          ) : (
            <div
              className="px-2.5 text-text-primary flex items-center"
              onClick={openInput}
            >
              <AiOutlinePlusCircle className="mr-1" />
              询问言创
            </div>
          )
        }
        open={popoverShow}
        trigger="click"
        arrow={false}
        onOpenChange={(v) => setPopoverShow(v)}
      >
        <span
          className="fixed bg-transparent w-1 h-1"
          style={{ left: mouseX, top: mouseY }}
        ></span>
      </Popover>
    </div>
  );
};

export default RightContent;
