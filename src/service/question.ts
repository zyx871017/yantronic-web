import { IResponse } from "@/types";
import clientRequest from "./clientRequest";
import { ChatItemType, IMessageItem } from "@/types/question";

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
  messages: IMessageItem[];
  questionId?: number;
}): Promise<IAskQuestionRes> {
  return clientRequest.post("/api/fetchAskJson", data);
}

export interface ISaveChatRes {
  code: number;
  msg: string;
  data: {
    conversationId: number;
    questionId: number;
  };
}
export async function saveChat(data: {
  conversationId?: string;
  question: string;
  answer: string;
}): Promise<ISaveChatRes> {
  return clientRequest.post("/api/saveChat", data);
}

export async function deleteConversation(data: {
  conversationId: number;
}): Promise<IResponse> {
  return clientRequest.post("/api/deleteConversation", data);
}

export async function testSentry() {
  return clientRequest.post("/api/getChatList");
}

export async function fetchUpOrDown(data: {
  questionId: number;
  upOrDown: string;
}): Promise<IResponse> {
  return clientRequest.post("/api/upOrDown", data);
}

export async function fetchCheck(data: {
  messages: IMessageItem[];
  questionId?: number;
}) {
  return clientRequest.post("/api/checkChat", data);
}
