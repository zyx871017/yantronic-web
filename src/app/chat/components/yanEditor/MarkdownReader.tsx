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
import RenderList from "./RenderList";
import RenderTable from "./RenderTable";
import RenderTableCell from "./RenderTableCell";
interface ITableCons {
  type: string;
  children: ITableCons[];
  align: string[] | string;
  head?: boolean;
}
const markdownToSlate = (markdown: string): Descendant[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rootNode: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToSlate)
    .processSync(markdown).result;
  return rootNode as Descendant[];
};

const formatElement = (node: ITableCons) => {
  if (node.children && node.children.length > 0) {
    const { children, align } = node;
    children.forEach((row, ri) => {
      if (ri === 0) {
        row.head = true;
        row.children.forEach((cell, ci) => {
          cell.head = true;
          cell.align = align[ci];
        });
      }
      row.children.forEach((cell, ci) => {
        cell.align = align[ci];
      });
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderElement = ({ element, children }: any) => {
  switch (element.type) {
    case "paragraph":
      return <Paragraph objList={element.children} child={children} />;
    case "listItem":
      return <li className="pl-1.5 my-2">{children}</li>;
    case "heading":
      return <Heading data={element} />;
    case "code":
      return <CodeElement element={element}>{children}</CodeElement>;
    case "list":
      return <RenderList element={element} child={children} />;
    case "table":
      formatElement(element);
      return <RenderTable element={element} child={children} />;
    case "tableRow":
      return <tr>{children}</tr>;
    case "tableCell":
      return <RenderTableCell element={element} child={children} />;
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="max-w-[48rem]" src={element.url} alt={element.alt} />
      );
    case "link":
      return (
        <a href={element.url} className="text-link" title={element.title}>
          {children}
        </a>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-2 border-quota-borders pl-4 py-2 font-semibold leading-tight">
          {children}
        </blockquote>
      );
    case "thematicBreak":
      return <hr />;
    default:
      return <p>{children}</p>;
  }
};
const MarkdownRenderer = (props: { text: string }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = markdownToSlate(props.text);
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable className="markdown" readOnly renderElement={renderElement} />
    </Slate>
  );
};

export default MarkdownRenderer;
