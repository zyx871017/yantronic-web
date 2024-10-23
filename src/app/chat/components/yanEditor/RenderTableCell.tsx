import { MarkdownElementItemType } from "@/types/markdown";
import classNames from "classnames";
import { ReactNode } from "react";

interface IProps {
  element: MarkdownElementItemType;
  child: ReactNode | ReactNode[];
}

const RenderTableCell = (props: IProps) => {
  const { element, child } = props;
  if (element.head) {
    return (
      <th
        className={classNames({
          "text-left": element.align === "left",
          "text-center": element.align === "center",
          "text-right": element.align === "right",
        })}
      >
        {child}
      </th>
    );
  } else {
    return (
      <td
        className={classNames({
          "text-left": element.align === "left",
          "text-center": element.align === "center",
          "text-right": element.align === "right",
        })}
      >
        {child}
      </td>
    );
  }
};

export default RenderTableCell;
