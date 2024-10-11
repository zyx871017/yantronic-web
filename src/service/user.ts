import { userInfo } from "@/mock/user";
import request from "./fetch";

export async function fetchLogin() {
  return { code: 200, msg: "", data: userInfo };
}

export async function getVerifyCode(params: {
  phone: string;
  type: string;
}): Promise<{ code: number; msg: string }> {
  return request.post("https://cxy.lianwo123.com/api/v1/account/code", params);
}

interface IVerifyCode {
  phone: string;
  type: string;
  source: string;
  code: string;
  timestamp: string;
}
export async function verifyCode(
  params: IVerifyCode
): Promise<{ code: number; msg: string }> {
  return request.post(
    "https://cxy.lianwo123.com/api/v1/account/msg_login",
    params
  );
}
