import serverRequest from "@/service/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { conversationId, question, answer } = body;
  const resData = await serverRequest.post(
    "https://cxy.lianwo123.com/api/v1/conversation/question",
    { conversationId, question, answer },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Headers.get("Authorization"),
      },
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
