"use client";
import { useLoginOpen } from "@/contexts/LoginContext";
import { Button } from "antd";

const Header = () => {
  const { setLoginOpen } = useLoginOpen();
  return (
    <div className="h-14 p-3 flex justify-between">
      <div className="font-semibold text-2xl text-slate-500">言创大模型</div>
      <Button onClick={() => setLoginOpen(true)} type="primary">
        登录
      </Button>
    </div>
  );
};
export default Header;
