import serverRequest from "@/service/serverRequest";
import { QuestionAnswerType } from "@/types/question";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;
  const resData: QuestionAnswerType = await serverRequest.post(
    "http://61.135.204.124:8000/v1/completions",
    {
      prompt,
      model: "Llama-3.1-70B-Instruct",
      max_tokens: 512,
      temperature: 0,
    },
    {
      headers: {
        Authorization: "Bearer yc_70btest",
        "Content-Type": "application/json",
      },
    }
  );
  if (resData.choices.length) {
    return NextResponse.json({
      msg: "success",
      code: 0,
      answer: resData.choices[0].text,
    });
  } else {
    return NextResponse.json({ msg: JSON.stringify(resData), code: -1 });
  }
}
