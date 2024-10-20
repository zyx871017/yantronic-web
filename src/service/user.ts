import request from "./fetch";

export async function fetchLogin(data: {
  phone: string;
  type: string;
  code: string;
}) {
  return request.post("https://cxy.lianwo123.com/api/v1/account/msg_login", {
    ...data,
    source: "web",
    timestamp: new Date().getTime + "",
  });
}

export async function getVerifyCode(params: {
  phone: string;
  type: string;
}): Promise<{ code: number; msg: string }> {
  return request.post("https://cxy.lianwo123.com/api/v1/account/code", params);
}
