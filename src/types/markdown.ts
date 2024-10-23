export type MarkdownElementItemType = {
  type: string;
  children: MarkdownElementItemType[];
  text: string;
  head?: boolean;
  align?: string;
};
