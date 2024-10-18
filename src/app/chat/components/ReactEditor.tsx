"use client";
import { Button } from "antd";
import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type itemType = "paragraph";
export default function CaiEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = [
    {
      type: "paragraph" as itemType,
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  return (
    <div>
      <Button>加粗</Button>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable></Editable>
      </Slate>
    </div>
  );
}
