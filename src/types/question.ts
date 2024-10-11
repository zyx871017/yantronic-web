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
