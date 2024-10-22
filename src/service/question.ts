import clientRequest from "./clientRequest";
import { ChatItemType, QuestionAnswerType } from "@/types/question";

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
interface IMessageItem {
  role: "user" | "assistant";
  content: string;
}
export async function askQuestion(data: {
  messages: IMessageItem[];
}): Promise<IAskQuestionRes> {
  return clientRequest.post("/api/fetchAsk", data);
}

interface ISaveChatRes {
  code: number;
  msg: string;
  answer: {
    code: number;
    msg: string;
    data: {
      conversationId: number;
      questionId: number;
    };
  };
}
export async function saveChat(data: {
  conversationId?: string;
  question: string;
  answer: string;
}): Promise<ISaveChatRes> {
  return clientRequest.post("/api/saveChat", data);
}
