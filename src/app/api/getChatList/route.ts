import serverRequest from "@/service/serverRequest";
import { ChatItemType } from "@/types/question";
import { NextResponse } from "next/server";

interface IChatListRes {
  code: number;
  msg: string;
  data: {
    hasMore: boolean;
    items: ChatItemType[];
    total: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const Headers = request.headers;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const resData: IChatListRes = await serverRequest.get(
    "https://cxy.lianwo123.com/api/v1/conversation/list",
    {
      params: {
        page,
        pageSize,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: Headers.get("Authorization"),
      },
    }
  );
  if (resData.code === 0) {
    return NextResponse.json({
      msg: "success",
      code: 0,
      data: resData.data,
    });
  } else {
    return NextResponse.json({ msg: JSON.stringify(resData), code: -1 });
  }
}

export async function POST() {
  return NextResponse.json({ message: "Hello from API Route!" });
}