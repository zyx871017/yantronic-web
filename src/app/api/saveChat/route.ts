import { saveChat } from "@/service/question";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { conversationId, question, answer } = body;
  const resData = await saveChat({ conversationId, question, answer });
  console.log(resData);
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
