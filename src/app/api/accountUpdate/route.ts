import { NextResponse } from "next/server";
import serverRequest from "@/service/serverRequest";
import { IResponse } from "@/types";
type IDataRes = IResponse<{
  avatar: string;
  username: string;
}>;
export async function POST(request: Request) {
  try {
    console.log("hello");
    const body = await request.json();
    const { username, avatar } = body;
    const resData: IDataRes = await serverRequest.post(
      "https://api.yantronic.com/api/v1/account/update",
      {
        username: username,
        avatar: avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization"), // 从请求头获取 token
        },
      }
    );
    if (resData.code === 0) {
      return NextResponse.json({
        code: 0,
        msg: "提交成功",
        data: resData.data, // 返回外部 API 数据
      });
    } else {
      return NextResponse.json({
        code: -1,
        msg: resData.msg || "外部 API 请求失败",
      });
    }
  } catch {
    return NextResponse.json(
      { code: -1, msg: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
