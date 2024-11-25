"use client";
import hljs, { HighlightResult } from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useState } from "react";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeElement = ({ element }: any) => {
  const codeRef = useRef(null);
  const text = element.children?.[0].text;
  const [copied, setCopied] = useState(false);
  let parsedText: HighlightResult = hljs.highlight("", { language: "text" });
  try {
    parsedText = hljs.highlight(text, { language: element.lang });
  } catch (e) {
    console.log(e);
  }

  const copyCode = () => {
    navigator.clipboard
      .writeText(element.children[0].text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <pre className="mt-4 cai-code mb-4">
      <div className="border-[0.5px] border-token-border-medium rounded-md overflow-hidden">
        <div className="bg-main-surface-secondary text-text-secondary px-4 py-2 flex justify-between h-9">
          <div className="text-sm">{element.lang}</div>
          {copied ? (
            <div className="flex items-center gap-0.5 cursor-pointer">
              <AiOutlineCheck />
              <span className="text-sm">已复制</span>
            </div>
          ) : (
            <div
              onClick={copyCode}
              className="flex items-center gap-0.5 cursor-pointer"
            >
              <AiOutlineCopy />
              <span className="text-sm">复制代码</span>
            </div>
          )}
        </div>
        <code
          className="hljs"
          ref={codeRef}
          dangerouslySetInnerHTML={{ __html: parsedText.value }}
        ></code>
      </div>
    </pre>
  );
};

export default CodeElement;
