"use client";
import Image from "next/image";
import micPng from "/public/img/mic.png";
import askPng from "/public/img/ask.png";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { message } from "antd";
import request from "@/service/fetch";
import { useLoading } from "@/contexts/LoadingContext";
export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const { setIsLoading } = useLoading();

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchQuestion();
    }
  };
  const fetchQuestion = async () => {
    if (!inputValue) {
      message.error("您还没有向我提问");
      return;
    }
    setIsLoading(true);
    const res = await request.post("/api/fetchAsk", { prompt: inputValue });
    console.log(res);
    const saveRes = await request.post("/api/saveChat", {});
    console.log(saveRes);
    setIsLoading(false);
  };
  return (
    <div className="border w-full rounded-2xl h-14 p-3 shadow-md flex gap-2.5">
      <div className="size-8 flex items-center justify-center">
        <Image src={micPng} alt="" className="size-6" />
      </div>
      <input
        onChange={inputChange}
        onKeyDown={keyDown}
        className="outline-none flex-1"
        placeholder="尽管来问我～"
      />
      <div
        onClick={fetchQuestion}
        className="size-8 flex items-center justify-center cursor-pointer"
      >
        <Image src={askPng} alt="" className="size-8" />
      </div>
    </div>
  );
}
