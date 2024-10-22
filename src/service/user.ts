import { userDataType } from "@/types/user";
import clientServer from "./clientRequest";

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
