/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import serverRequest from "@/service/serverRequest";
import { getContent } from "@/utils/chat";
import { IMessageItem } from "@/types/question";

export async function GET() {
  return NextResponse.json({ message: "Hello from API Route!" });
}

const completeChat = async (
  data: { itemId: number; question: string; answer: string; status: 1 },
  Headers: Headers
) => {
  const Authorization = Headers.get("Authorization");
  const resData = await serverRequest.put(
    "https://api.yantronic.com/api/v1/conversation/question",
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

const checkChat = async (messages: IMessageItem[]) => {
  const targetUrl = "http://61.135.204.110:9997/v1/chat/completions";
  const reqBody = JSON.stringify({
    messages,
    model: "protect",
  });
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-ycd3516Cf7cG1",
    },
  };
  const res: any = await serverRequest.post(targetUrl, reqBody, options);
  const content = res.choices?.[0].message.content;
  if (content.indexOf("unsafe") >= 0) {
    return false;
  } else {
    return true;
  }
};

export async function POST(request: Request) {
  const body = await request.json();
  const Headers = request.headers;
  const { messages, questionId } = body;
  const checkRes: boolean = await checkChat(messages);
  const question = messages[messages.length - 1].content;
  if (!checkRes) {
    completeChat(
      {
        itemId: questionId,
        question,
        answer: "我无法回答您此类问题",
        status: 1,
      },
      Headers
    );
    return NextResponse.json({
      msg: "我无法回答您此类问题",
      data: { answer: "我无法回答您此类问题" },
      code: -100,
    });
  }
  const targetUrl = "http://61.135.204.110:9997/v1/chat/completions";
  let answer = "";
  const reqBody = JSON.stringify({
    messages,
    model: "yantronic2",
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

      // 逐块读取数据并将其写入响应流
      function read() {
        reader
          ?.read()
          .then(({ done, value }) => {
            if (done) {
              controller.close();
              completeChat(
                {
                  itemId: questionId,
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
            controller.enqueue(value);

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
    cancel(reason) {
      completeChat(
        {
          itemId: questionId,
          question,
          answer,
          status: 1,
        },
        Headers
      );
      console.log("Stream canceled:", reason);
    },
  });

  return new Response(readableStreamDefaultWriter, { headers: proxyHeaders });
}
