import Image from "next/image";
import micPng from "/public/img/mic.png";
import askPng from "/public/img/ask.png";
export default function ChatInput() {
  return (
    <div className="border w-full rounded-2xl h-14 p-3 shadow-md flex gap-2.5">
      <div className="size-8 flex items-center justify-center">
        <Image src={micPng} alt="" className="size-6" />
      </div>
      <input className="outline-none flex-1" placeholder="尽管来问我～" />
      <div className="size-8 flex items-center justify-center cursor-pointer">
        <Image src={askPng} alt="" className="size-8" />
      </div>
    </div>
  );
}
