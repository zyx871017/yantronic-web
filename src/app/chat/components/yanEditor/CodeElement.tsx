"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeElement = ({ children, element }: any) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

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
    <pre className="mt-2 cai-code">
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
        <code ref={codeRef}>{children}</code>
      </div>
    </pre>
  );
};

export default CodeElement;
