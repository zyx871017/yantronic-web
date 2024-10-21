"use client";
import { useLoginOpen } from "@/contexts/LoginContext";
import { Button } from "antd";

const LoginButton = () => {
  const { setLoginOpen } = useLoginOpen();
  return (
    <Button
      onClick={() => setLoginOpen(true)}
      type="primary"
      className="!absolute top-4 right-4"
    >
      登录
    </Button>
  );
};

export default LoginButton;
