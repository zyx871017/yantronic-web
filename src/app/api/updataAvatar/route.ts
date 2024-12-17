import { NextResponse } from "next/server";
import serverRequest from "@/service/serverRequest";
import { IResponse } from "@/types";

type IDataRes = IResponse<{
  avatar_url: string;
}>;

export async function POST(request: Request) {
  try {
    // 解析前端传递过来的请求体
    const formData = await request.formData(); // 获取上传的表单数据
    const file = formData.get("file"); // 假设前端通过 'file' 字段上传文件

    if (!file) {
      return NextResponse.json({ code: -1, msg: "参数缺失" }, { status: 400 });
    }
    // 将文件封装到 FormData 中，发送到外部 API
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    // 调用外部 API，发送数据
    const resData: IDataRes = await serverRequest.post(
      "https://api.yantronic.com/api/v1/account/upload-avatar", // 外部 API 地址
      uploadFormData, // 提交的数据
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: request.headers.get("Authorization"), // 从请求头获取 token
        },
      }
    );

    // 判断外部 API 返回结果
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
