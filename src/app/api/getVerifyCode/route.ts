import { getVerifyCode } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { phone, type } = body;
  const resData = await getVerifyCode({ phone, type });
  if (resData.code === 0) {
    return NextResponse.json({ msg: "success", code: 0 });
  } else {
    return NextResponse.json({ msg: resData.msg, code: -1 });
  }
  console.log(resData);
}
