// Add the "use client" directive at the top of the file
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
import hljs from "highlight.js";

import "highlight.js/styles/github.css"; // 使用 highlight.js 的 GitHub 样式（浅色主题）

interface TypingEffectProps {
  text: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [buffer, setBuffer] = useState(""); // 用于存储暂时不输出的反引号字符
  const codeRef = useRef(null);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        const currentChar = text[index];

        // 检查当前字符是否为反引号
        if (currentChar === "`") {
          // 将反引号暂存在缓冲区中
          setBuffer((prevBuffer) => prevBuffer + currentChar);
        } else {
          // 如果缓冲区中有反引号，先将其输出
          if (buffer.length > 0) {
            setDisplayedText((prev) => prev + buffer + currentChar);
            setBuffer(""); // 清空缓冲区
          } else {
            // 否则直接输出当前字符
            setDisplayedText((prev) => prev + currentChar);
          }
        }

        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, buffer]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [displayedText, copied]);

  // 处理复制代码的逻辑
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <ReactMarkdown
      components={{
        code({
          inline,
          className,
          children,
          ...props
        }: ComponentPropsWithoutRef<"code"> & {
          inline?: boolean;
        }) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          // 如果 children 为空或 undefined，直接使用空字符串
          let codeContent = children ? String(children).replace(/\n$/, "") : "";
          // 去除开头和结尾的反引号符号（如 ``` 或 ``）
          if (codeContent.startsWith("```") || codeContent.startsWith("`")) {
            codeContent = codeContent.replace(/^`+|`+$/g, "");
          }
          return !inline && match ? (
            <div className="border-[0.5px] border-token-border-medium rounded-md overflow-hidden">
              {/* 顶部语言标签和复制按钮 */}
              <div className="bg-main-surface-secondary text-text-secondary px-4 py-2 flex justify-between h-9">
                <span className="text-sm">{language}</span>
                {copied ? (
                  <div className="flex items-center gap-0.5 cursor-pointer">
                    <AiOutlineCheck />
                    <span className="text-sm">已复制</span>
                  </div>
                ) : (
                  <div
                    onClick={() => copyCode(codeContent)}
                    className="flex items-center gap-0.5 cursor-pointer"
                  >
                    <AiOutlineCopy />
                    <span className="text-sm">复制代码</span>
                  </div>
                )}
              </div>

              {/* 代码块 */}
              <pre>
                <code
                  ref={codeRef}
                  className={`hljs language-${language}`}
                  {...props}
                >
                  {codeContent}
                </code>
              </pre>
            </div>
          ) : (
            <code className={className} {...props}>
              {codeContent}
            </code>
          );
        },
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};

export default TypingEffect;
