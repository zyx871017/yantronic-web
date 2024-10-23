import { ReactNode } from "react";

interface IListItemEle {
  type: string;
  children: IListItemEle[];
  text?: string;
}

interface IProps {
  element: {
    type: "list";
    ordered: boolean;
    spread: boolean;
    children: IListItemEle[];
  };
  child: ReactNode;
}

const RenderList = (props: IProps) => {
  const { element, child } = props;
  if (element.ordered) {
    return <ol className="list-decimal pl-[26px]">{child}</ol>;
  } else {
    return <ul className="list-disc pl-[26px]">{child}</ul>;
  }
};

export default RenderList;
