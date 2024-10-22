export type ChatItemType = {
  id: number;
  conversationId: number;
  question: string;
  createTime: string;
  answer: string;
};

export type QuestionItemType = {
  title: string;
  id: number;
  children: ChatItemType[];
};

export type QuestionAnswerType = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    id: number;
    message: {
      role: string;
      content: string;
      tool_calls: [];
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
  };
};
