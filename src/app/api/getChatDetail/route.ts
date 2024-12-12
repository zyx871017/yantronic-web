import serverRequest from "@/service/serverRequest";
import { ChatItemType } from "@/types/question";
import { NextResponse } from "next/server";

interface IChatDetailRes {
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
  const conversationId = searchParams.get("conversationId");
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const resData: IChatDetailRes = await serverRequest.get(
    "https://api.yantronic.com/api/v1/conversation/question/list",
    {
      params: {
        conversationId,
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
    return new Response(
      JSON.stringify({
        msg: "success",
        code: 0,
        data: resData.data,
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ msg: JSON.stringify(resData), code: -1 }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

export async function OPTIONS() {
  console.log('options');
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST() {
  return NextResponse.json({ message: "Hello from API Route!" });
}
