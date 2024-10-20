import { historyList } from "@/mock/question";
import request from "./fetch";
import { QuestionAnswerType } from "@/types/question";

export async function getHistoryList() {
  return { code: 200, msg: "", data: historyList };
}

export async function askQuestion(data: {
  prompt: string;
}): Promise<QuestionAnswerType> {
  return request.post(
    "http://61.135.204.124:8000/v1/completions",
    {
      ...data,
      model: "Llama-3.1-70B-Instruct",
      max_tokens: 512,
      temperature: 0,
    },
    {
      headers: {
        Authorization: "Bearer yc_70btest",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function saveChat(data: {
  conversationId?: string;
  question: string;
  answer: string;
}) {
  return request.post(
    "https://cxy.lianwo123.com/api/v1/conversation/question",
    {
      ...data,
      model: "Llama-3.1-70B-Instruct",
      max_tokens: 512,
      temperature: 0,
    },
    {
      headers: {
        Authorization: "Bearer yc_70btest",
        "Content-Type": "application/json",
      },
    }
  );
}
