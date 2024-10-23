"use client";
import React, { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkToSlate } from "remark-slate-transformer";
import CodeElement from "./CodeElement";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
const markdownToSlate = (markdown: string): Descendant[] => {
  const rootNode = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToSlate)
    .processSync(markdown).result;
  return rootNode as Descendant[];
};

const renderHeading = (data: {
  depth: number;
  children: { text: string }[];
}) => {
  switch (data.depth) {
    case 1:
      return (
        <h1 className="text-4xl font-bold leading-snug mb-8 tracking-tighter">
          {data.children[0].text}
        </h1>
      );
    case 2:
      return (
        <h2 className="text-2xl font-semibold leading-snug mt-8 mb-4">
          {data.children[0].text}
        </h2>
      );
    case 3:
      return (
        <h3 className="text-xl font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h3>
      );
    case 4:
      return (
        <h4 className="text-base font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h4>
      );
    case 5:
      return (
        <h5 className="text-base font-semibold leading-relaxed">
          {data.children[0].text}
        </h5>
      );
    case 6:
      return (
        <h6 className="text-base leading-relaxed">{data.children[0].text}</h6>
      );
    default:
      return (
        <h4 className="text-lg font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h4>
      );
  }
};
const renderElement = ({ element, children }: any) => {
  switch (element.type) {
    case "paragraph":
      return <Paragraph objList={element.children} />;
    case "ol_list":
      return <ol className="mb-1">{children}</ol>;
    case "listItem":
      return <li>{children}</li>;
    case "heading":
      return <Heading data={element} />;
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
      <div>{props.text}</div>
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
};

export default MarkdownRenderer;
