import { historyList } from "@/mock/question";
import clientRequest from "./clientRequest";

export async function getHistoryList() {
  return { code: 200, msg: "", data: historyList };
}

interface IAskQuestionRes {
  msg: string;
  code: number;
  answer: string;
}
export async function askQuestion(data: {
  prompt: string;
}): Promise<IAskQuestionRes> {
  return clientRequest.post("/api/fetAsk", data);
}

export async function saveChat(data: {
  conversationId?: string;
  question: string;
  answer: string;
}) {
  return clientRequest.post("/api/saveChat", data);
}
