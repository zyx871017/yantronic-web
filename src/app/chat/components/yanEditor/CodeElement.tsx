import { RenderElementProps } from "slate-react";

const CodeElement = (props: RenderElementProps) => {
  console.log(props.children);
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeElement;
