"use client";
import { useLoginOpen } from "@/contexts/LoginContext";
import { fetchLogout } from "@/service/user";
import { isLogin } from "@/utils";
import { Button, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const { setLoginOpen } = useLoginOpen();
  const router = useRouter();
  const hasLogin = isLogin();
  const username = localStorage.getItem("username");
  const logout = async () => {
    const res = await fetchLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    router.push("/chat");
  };
  const items: MenuProps["items"] = [
    { label: <span>{username}</span>, key: 0 },
    { label: <span onClick={logout}>登出</span>, key: 1 },
  ];
  const onDropClick: MenuProps["onClick"] = ({ key }) => {
    console.log(key);
    if (key === "1") {
      logout();
    }
  };
  const avatar =
    localStorage.getItem("avatar") === "null"
      ? "/img/avatar.png"
      : localStorage.getItem("avatar") || "/img/avatar.png";
  return (
    <div className="h-14 p-3 flex justify-between items-center">
      <div className="font-semibold text-lg text-text-secondary">言创大模型</div>
      {hasLogin ? (
        <div className="cursor-pointer">
          <Dropdown menu={{ items, onClick: onDropClick }} trigger={["click"]}>
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
    </div>
  );
};
export default Header;
