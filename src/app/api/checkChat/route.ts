/* eslint-disable @typescript-eslint/no-explicit-any */
import serverRequest from "@/service/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { messages } = body;
  const targetUrl = "http://61.135.204.110:9997/v1/chat/completions";
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

  return NextResponse.json(targetResponse);
}
