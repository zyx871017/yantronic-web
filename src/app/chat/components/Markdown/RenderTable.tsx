import { MarkdownElementItemType } from "@/types/markdown";
import { ReactNode } from "react";

interface IProps {
  element: MarkdownElementItemType;
  child: ReactNode | ReactNode[];
}

const RenderTable = (props: IProps) => {
  const { child } = props;
  const [head, ...body] = child as ReactNode[];

  return (
    <table className="">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default RenderTable;
