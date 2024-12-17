import { userDataType } from "@/types/user";
import clientServer from "./clientRequest";
import { IResponse } from "@/types";

export async function getVerifyCode(params: {
  phone: string;
}): Promise<{ code: number; msg: string }> {
  return clientServer.post("/api/getVerifyCode", {
    ...params,
    type: "login",
  });
}

interface IVerifyCodeRes {
  code: number;
  msg: string;
  data: userDataType;
}

export async function verifyCode(params: {
  phone: string;
  type: string;
  code: string;
}): Promise<IVerifyCodeRes> {
  const res: IVerifyCodeRes = await clientServer.post(
    "/api/verifyCode",
    params
  );
  if (res.code === 0) {
    const { data } = res;
    console.log(res);
    localStorage.setItem("token", data.session_id);
    localStorage.setItem("avatar", data.avatar);
    localStorage.setItem("username", data.username);
    return res;
  }
  return res;
}

export async function fetchLogout(): Promise<IVerifyCodeRes> {
  const res: IVerifyCodeRes = await clientServer.post("/api/logout");
  return res;
}
type IUploadAvatar = IResponse<{
  avatar_url: string;
}>;
export async function updataAvatar(params: FormData) {
  const res: IUploadAvatar = await clientServer.post(
    "/api/updataAvatar",
    params
  );
  return res;
}
type IUpdataUserInfo = IResponse<{
  avatar: string;
  username: string;
}>;
export async function updateUserInfo(params: {
  username: string;
  avatar: string;
}) {
  const res: IUpdataUserInfo = await clientServer.post(
    "/api/accountUpdate",
    params
  );
  return res;
}
