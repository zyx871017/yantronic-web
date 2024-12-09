import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const url = req.nextUrl;

  // 检测是否为移动端
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  if (isMobile && url.pathname === "/chat") {
    // 如果是移动端且访问桌面页面，重定向到移动端页面
    return NextResponse.redirect(new URL("/m/chat", req.url));
  }

  if (isMobile && /^\/chat/.test(url.pathname)) {
    // 如果是移动端且访问桌面页面，重定向到移动端页面
    return NextResponse.redirect(new URL(`/m${url.pathname}`, req.url));
  }
  return NextResponse.next(); // 继续正常处理
}
