import serverRequest from "@/service/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { questionId, upOrDown } = body;
  const resData = await serverRequest.post(
    "https://api.yantronic.com/api/v1/conversation/upOrDown",
    { questionId, upOrDown },
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
