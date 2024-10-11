import { verifyCode } from "@/service/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { phone, code } = body;
  const resData = await verifyCode({
    phone,
    type: "reg",
    source: "web",
    code,
    timestamp: new Date().getTime() + "",
  });
  if (resData.code === 0) {
    return NextResponse.json({ msg: "success", code: 0 });
  } else {
    return NextResponse.json({ msg: resData.msg, code: -1 });
  }
}
