import ChatInput from "./components/ChatInput";

export default async function Home() {
  return (
    <div className="px-5 text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full mb-10 text-4xl font-semibold text-center">
        有什么可以帮您？？
      </div>
      <ChatInput />
      <div className="flex"></div>
    </div>
  );
}
