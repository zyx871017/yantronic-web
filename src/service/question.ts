import { historyList } from "@/mock/question";

export async function getHistoryList() {
  return { code: 200, msg: "", data: historyList };
}
