export type ChatItemType = {
  itemId: number;
  conversationId: number;
  question: string;
  createTime: string;
  answer: string;
  status: 0 | 1;
};

export interface IMessageItem {
  role: "user" | "assistant";
  content: string;
}

export type ConversationItemType = {
  question: string;
  conversationId: number;
  children?: ChatItemType[];
  createTime: string;
};

export type ConversationAnswerType = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    id: number;
    message: IMessageItem;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
  };
};
