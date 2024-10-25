"use client";
import { Button } from "antd";
import { useCallback, useState } from "react";
import { createEditor, Editor, Transforms, Element } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import CodeElement from "./CodeElement";
import DefaultElement from "./DefaultElement";

type itemType = "paragraph" | "code";
export default function CaiEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = [
    {
      type: "paragraph" as itemType,
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
    <div>
      <Button>加粗</Button>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === "`" && event.ctrlKey) {
              Transforms.setNodes(
                editor,
                { type: "code" },
                {
                  match: (n) =>
                    Element.isElement(n) && Editor.isBlock(editor, n),
                }
              );
            }
          }}
        />
      </Slate>
    </div>
  );
}
