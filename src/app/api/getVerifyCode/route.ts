import { getVerifyCode } from "@/service/user";
import { NextResponse } from "next/server";
import serverRequest from "@/service/serverRequest";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { phone, headers } = body;
  const resData = await serverRequest.post(
    "https://cxy.lianwo123.com/api/v1/account/code",
    {
      phone,
      type: "login",
    },
    {
      headers: { ...headers },
    }
  );
  if (resData) {
    return NextResponse.json({
      msg: "success",
      code: 0,
      answer: resData,
    });
  } else {
    return NextResponse.json({ msg: JSON.stringify(resData), code: -1 });
  }
}
