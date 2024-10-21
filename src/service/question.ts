import { historyList } from "@/mock/question";
import clientRequest from "./clientRequest";
import { ChatItemType } from "@/types/question";

export async function getHistoryList(params: {
  page: number;
  pageSize: number;
}) {
  return clientRequest.get("/api/getChatList", { params });
}

export async function getChatDetail(params: {
  page: number;
  pageSize: number;
  conversationId: number;
}): Promise<{
  code: number;
  msg: string;
  data: { hasMore: boolean; items: ChatItemType[]; total: number };
}> {
  return clientRequest.get("/api/getChatDetail", { params });
}

interface IAskQuestionRes {
  msg: string;
  code: number;
  answer: string;
}
export async function askQuestion(data: {
  prompt: string;
}): Promise<IAskQuestionRes> {
  return clientRequest.post("/api/fetchAsk", data);
}

export async function saveChat(data: {
  conversationId?: string;
  question: string;
  answer: string;
}) {
  return clientRequest.post("/api/saveChat", data);
}
