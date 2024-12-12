/* eslint-disable @typescript-eslint/no-explicit-any */
import serverRequest from "@/service/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

const completeChat = async (
  data: { itemId: number; question: string; answer: string; status: 1 },
  Headers: Headers
) => {
  const Authorization = Headers.get("Authorization");
  const resData = await serverRequest.put(
    "https://api.yantronic.com/api/v1/conversation/question",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    }
  );
  if (resData) {
    return resData;
  } else {
    return { msg: JSON.stringify(resData), code: -1 };
  }
};

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { messages, questionId } = body;
  const targetUrl = "http://61.135.204.110:9997/v1/chat/completions";
  const question = messages[messages.length - 1].content;
  const reqBody = JSON.stringify({
    messages,
    model: "protect",
    temperature: 0,
  });
  const targetResponse: any = await serverRequest.post(targetUrl, reqBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-ycd3516Cf7cG1",
    },
  });
  await completeChat(
    {
      itemId: questionId,
      question,
      answer: "我无法回答您此类问题",
      status: 1,
    },
    Headers
  );
  return NextResponse.json(targetResponse);
}
