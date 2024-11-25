/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import serverRequest from "@/service/serverRequest";
import { getContent } from "@/utils/chat";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

const preSaveChat = async (
  question: string,
  conversationId: number,
  Headers: Headers
) => {
  const Authorization = Headers.get("Authorization");
  const resData = await serverRequest.post(
    "https://cxy.lianwo123.com/api/v1/conversation/question",
    { conversationId, question, answer: "", status: 0 },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    }
  );
  if (resData) {
    return resData;
  } else {
    return { msg: JSON.stringify(resData), code: -1 };
  }
};

const completeChat = async (
  data: { itemId: number; question: string; answer: string; status: 1 },
  Headers: Headers
) => {
  const Authorization = Headers.get("Authorization");
  const resData = await serverRequest.put(
    "https://cxy.lianwo123.com/api/v1/conversation/question",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    }
  );
  if (resData) {
    return resData;
  } else {
    return { msg: JSON.stringify(resData), code: -1 };
  }
};

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { messages, conversationId } = body;
  const question = messages[messages.length - 1].content;
  const targetUrl = "http://61.135.204.110:9997/v1/chat/completions";
  let answer = "";
  const reqBody = JSON.stringify({
    messages,
    model: "yantronic",
    temperature: 0.7,
    max_tokens: 16000,
    stream: true,
  });
  const options = {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      Authorization: "Bearer sk-ycd3516Cf7cG1",
      "Content-Type": "text/event-stream",
      "User-Agent": "okhttp/4.9.1",
    },
  };
  const targetResponse = await fetch(targetUrl, {
    ...options,
    body: reqBody,
  });
  const saveRes: any = await preSaveChat(question, conversationId, Headers);
  if (!targetResponse.ok) {
    return new Response("Error from target service", {
      status: targetResponse.status,
    });
  }

  const proxyHeaders = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const readableStreamDefaultWriter = new ReadableStream({
    start(controller) {
      const reader = targetResponse.body?.getReader();
      const decoder = new TextDecoder();
      controller.enqueue(
        `chatData: ${JSON.stringify({
          questionId: saveRes.data.questionId,
          conversationId: saveRes.data.conversationId,
        })}\n\n`
      );

      // 逐块读取数据并将其写入响应流
      function read() {
        reader
          ?.read()
          .then(({ done, value }) => {
            if (done) {
              controller.enqueue(
                `chatData: ${JSON.stringify({
                  questionId: saveRes.data.questionId,
                  conversationId: saveRes.data.conversationId,
                })}`
              );
              controller.close();
              completeChat(
                {
                  itemId: saveRes.data.questionId,
                  question,
                  answer,
                  status: 1,
                },
                Headers
              );
              return;
            }

            // 解码二进制数据并发送到客户端
            const chunk = decoder.decode(value, { stream: true });
            answer += getContent(chunk);
            controller.enqueue(chunk);

            // 继续读取
            read();
          })
          .catch((err) => {
            console.error("Error reading stream:", err);
            controller.error(err);
          });
      }

      // 启动读取过程
      read();
    },
  });

  return new Response(readableStreamDefaultWriter, { headers: proxyHeaders });
}

const readableStreamDefaultWriter = new ReadableStream({
  start(controller) {
    const encoder = new TextEncoder();
    controller.enqueue(
      encoder.encode(JSON.stringify({ code: 1, msg: "success" }))
    );
  },
});
