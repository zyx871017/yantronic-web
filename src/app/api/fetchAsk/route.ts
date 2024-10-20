import { askQuestion } from "@/service/question";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;
  const resData = await askQuestion({ prompt });
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
