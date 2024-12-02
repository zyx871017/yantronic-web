import serverRequest from "@/service/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { conversationId, question, answer } = body;
  const resData: {
    code: number;
    data: { conversationId: number; questionId: number };
    msg: string;
  } = await serverRequest.post(
    "https://cxy.lianwo123.com/api/v1/conversation/question",
    { conversationId, question, answer, status: 0 },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Headers.get("Authorization"),
      },
    }
  );
  if (resData.code === 0) {
    return NextResponse.json(resData);
  } else {
    return NextResponse.json({ msg: resData.msg, code: -1 });
  }
}
