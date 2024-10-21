import serverRequest from "@/service/serverRequest";
import { userDataType } from "@/types/user";
import { NextResponse } from "next/server";

interface IResponse {
  code: number;
  data: userDataType;
  msg: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { phone, headers, code } = body;
  const resData: IResponse = await serverRequest.post(
    "https://cxy.lianwo123.com/api/v1/account/msg_login",
    {
      phone,
      source: "web",
      code,
      timestamp: new Date().getTime() + "",
      type: "login",
    },
    {
      headers: { ...headers },
    }
  );
  if (resData.code === 0) {
    return NextResponse.json({ msg: "success", data: resData.data, code: 0 });
  } else {
    return NextResponse.json({ msg: resData.msg, code: -1 });
  }
}
