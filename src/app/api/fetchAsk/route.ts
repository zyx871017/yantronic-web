import serverRequest from "@/service/serverRequest";
import { QuestionAnswerType } from "@/types/question";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { messages } = body;
  const resData: QuestionAnswerType = await serverRequest.post(
    "http://61.135.204.124:8000/v1/chat/completions",
    {
      messages,
      model: "Llama-3.1-70B-Instruct",
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: "Bearer yc_70btest",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(resData.choices[0]);
  if (resData.choices.length) {
    return NextResponse.json({
      msg: "success",
      code: 0,
      answer: resData.choices[0].message.content,
    });
  } else {
    return NextResponse.json({ msg: JSON.stringify(resData), code: -1 });
  }
}
