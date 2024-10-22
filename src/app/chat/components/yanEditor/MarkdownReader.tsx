"use client";
import React, { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkToSlate } from "remark-slate-transformer";
import CodeElement from "./CodeElement";
const markdownToSlate = (markdown: string): Descendant[] => {
  const rootNode = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToSlate)
    .processSync(markdown).result;
  return rootNode as Descendant[];
};

interface IChildren {
  inlineCode?: boolean;
  strong?: boolean;
  text: string;
}
const renderParagraph = (objList: IChildren[]) => {
  return (
    <p className="leading-8 mb-1">
      {objList.map((obj, index) => {
        if (obj.inlineCode) {
          return (
            <code className="bg-slate-200 px-1 py-1 rounded-sm" key={index}>
              {obj.text}
            </code>
          );
        }
        if (obj.strong) {
          return (
            <strong key={index} className="font-semibold">
              {obj.text}
            </strong>
          );
        }
        return obj.text;
      })}
    </p>
  );
};
const renderElement = ({ element, children }: any) => {
  switch (element.type) {
    case "paragraph":
      return renderParagraph(element.children);
    case "ol_list":
      return <ol className="mb-1">{children}</ol>;
    case "listItem":
      return <li>{children}</li>;
    case "heading":
      return <h1 className="mb-1">{children}</h1>;
    case "heading_four":
      return <h4 className="mb-1">{children}</h4>;
    case "code":
      return <CodeElement>{children}</CodeElement>;
    case "list":
      return <ul className="mb-1">{children}</ul>;
    case "heading_three":
      return <h3 className="mb-1">{children}</h3>;
    case "table":
      return (
        <table>
          <tbody>{children}</tbody>
        </table>
      );
    case "tableRow":
      return <tr>{children}</tr>;
    case "tableCell":
      return <td>{children}</td>;
    default:
      console.log(element.type);
      return <p className="mb-1">{children}</p>;
  }
};
const MarkdownRenderer = (props: { text: string }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = markdownToSlate(props.text);
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
};

export default MarkdownRenderer;
