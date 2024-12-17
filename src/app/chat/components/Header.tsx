"use client";
import { useConversation } from "@/contexts/ConversationContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useLoginOpen } from "@/contexts/LoginContext";
import { fetchLogout } from "@/service/user";
import { isLogin, isMobile } from "@/utils";
import { Button, Drawer, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineForm, AiOutlineMenuUnfold } from "react-icons/ai";
import Personal from "./Personal";

const Header = () => {
  const { setLoginOpen, loginOpen } = useLoginOpen();
  const { updateConversation } = useConversation();
  const [hasLogin, setHasLogin] = useState(false);
  const [hasPersonal, setHasPersonal] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const { sideOpen, setSideOpen } = useLayout();
  const logout = async () => {
    await fetchLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    updateConversation({});
    router.push("/chat");
    setHasLogin(false);
  };
  const setup = () => {
    setHasPersonal(true);
  };
  const handleCancel = () => {
    setHasPersonal(false);
  };
  const submitHandle = (value: { avatar: string; username: string }) => {
    const { username, avatar } = value;
    setUsername(username);
    setAvatar(avatar);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("username", username);
  };
  const items: MenuProps["items"] = [
    { label: username, key: 0 },
    { label: "登出", key: 1 },
    { label: "设置", key: 2 },
  ];
  const itemEvent: {
    [key: string]: () => void;
  } = {
    1: logout,
    2: setup,
  };
  const onDropClick: MenuProps["onClick"] = ({ key }) => {
    itemEvent[key]();
  };

  useEffect(() => {
    setHasLogin(isLogin());
    const currentUsername = localStorage.getItem("username") || "";
    setUsername(currentUsername);
    const currentAvatar =
      localStorage.getItem("avatar") === "null"
        ? "/img/avatar.png"
        : localStorage.getItem("avatar") || "/img/avatar.png";
    setAvatar(currentAvatar);
  }, []);
  useEffect(() => {
    setHasLogin(isLogin());
  }, [loginOpen]);
  return (
    <div className="h-14 p-3 flex justify-between items-center">
      <Button
        className="hidden md:block !p-0"
        type="text"
        onClick={() => setSideOpen(true)}
      >
        <AiOutlineMenuUnfold className="size-6 text-text-primary" />
      </Button>
      <div className="font-semibold text-lg text-text-secondary flex items-center text-center">
        {sideOpen ? null : (
          <>
            <Button
              className="!px-2 !h-10 !border-none"
              type="text"
              onClick={() => setSideOpen(true)}
            >
              <AiOutlineMenuUnfold className="size-6 text-text-primary" />
            </Button>
            <Link href="/chat" className="!px-2" type="text">
              <AiOutlineForm className="size-6 text-text-primary" />
            </Link>
          </>
        )}
        言创大模型
      </div>
      {hasLogin ? (
        <div className="cursor-pointer">
          <Dropdown
            menu={{ items, onClick: onDropClick }}
            trigger={["click"]}
            overlayStyle={{ width: "200px" }}
          >
            <Image
              className="rounded-full"
              alt=""
              src={avatar}
              width={32}
              height={32}
            ></Image>
          </Dropdown>
        </div>
      ) : (
        <Button onClick={() => setLoginOpen(true)} type="primary">
          登录
        </Button>
      )}
      <Drawer
        width="20rem"
        closeIcon={null}
        open={isMobile() ? sideOpen : false}
        placement="left"
      ></Drawer>
      <Personal
        open={hasPersonal}
        handleCancel={handleCancel}
        submitHandle={submitHandle}
      />
    </div>
  );
};
export default Header;
