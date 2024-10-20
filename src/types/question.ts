export type ChatItemType = {
  type: string;
  id: number;
  content: string;
  user: string;
  time: string;
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
  choices: { id: number; text: string; finish_reason: string }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
  };
};
