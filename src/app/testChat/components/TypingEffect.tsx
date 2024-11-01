/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ComponentPropsWithoutRef,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import CopyCodeButton from "./CopyCodeButton";
import Heading from "../../chat/components/Markdown/Heading";
import "highlight.js/styles/github.css"; // 使用 highlight.js 的 GitHub 样式（浅色主题）

interface TypingEffectProps {
  text: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isInCodeBlock, setIsInCodeBlock] = useState<boolean>(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (currentIndex >= text.length) return;
    // 定义所有需要处理的 Markdown 标记
    const inlineMarkers = [
      { marker: "`", type: "inlineCode" },
      { marker: "**", type: "bold" },
      { marker: "__", type: "bold" },
      { marker: "*", type: "italic" },
      { marker: "_", type: "italic" },
    ];
    // 辅助函数：检测并提取内联格式标记
    const handleInlineFormatting = (
      text: string,
      currentIndex: number
    ): { extractedText: string | null; newIndex: number } => {
      for (const { marker } of inlineMarkers) {
        if (text.substr(currentIndex, marker.length) === marker) {
          const endIndex = text.indexOf(marker, currentIndex + marker.length);
          if (endIndex !== -1) {
            const extractedText = text.substring(
              currentIndex,
              endIndex + marker.length
            );
            return { extractedText, newIndex: endIndex + marker.length };
          }
        }
      }
      return { extractedText: null, newIndex: currentIndex };
    };
    const timeout = setTimeout(() => {
      const char = text[currentIndex];

      // 优先判断是否为代码块 (```)
      if (text.substr(currentIndex, 3) === "```") {
        if (!isInCodeBlock) {
          // 开始代码块
          setIsInCodeBlock(true);
          setDisplayedText((prev) => prev + "```");
          setCurrentIndex(currentIndex + 3);

          // 提取语言（可选）
          const languageMatch = text
            .substring(currentIndex + 3)
            .match(/^(\w+)/);
          if (languageMatch) {
            const language = languageMatch[1];
            setDisplayedText((prev) => prev + `${language}\n`);
            setCurrentIndex(currentIndex + 3 + language.length + 1); // +1 为换行符
          }
        } else {
          // 结束代码块
          setIsInCodeBlock(false);
          setDisplayedText((prev) => prev + "```\n");
          setCurrentIndex(currentIndex + 3);
        }
        return;
      }

      // 处理粗体、斜体和内联代码
      if (!isInCodeBlock) {
        const { extractedText, newIndex } = handleInlineFormatting(
          text,
          currentIndex
        );
        if (extractedText) {
          setDisplayedText((prev) => prev + extractedText);
          setCurrentIndex(newIndex);
          return;
        }
      }

      // Handle Images (![alt](url))
      if (
        !isInCodeBlock &&
        char === "!" &&
        text.substr(currentIndex, 2) === "![" // 检查是否为图片格式
      ) {
        const endIndex = text.indexOf(")", currentIndex);
        if (endIndex !== -1) {
          const imageMarkdown = text.substring(currentIndex, endIndex + 1);
          setDisplayedText((prev) => prev + imageMarkdown);
          setCurrentIndex(endIndex + 1);
          return;
        }
      }

      // Handle Lists (- item)
      if (!isInCodeBlock && char === "-" && text[currentIndex + 1] === " ") {
        const endIndex = text.indexOf("\n", currentIndex);
        if (endIndex !== -1) {
          const listItem = text.substring(currentIndex, endIndex + 1);
          setDisplayedText((prev) => prev + listItem);
          setCurrentIndex(endIndex + 1);
          return;
        }
      }

      // Handle Tables (| cell | cell | cell |)
      if (!isInCodeBlock && char === "|") {
        const endIndex = text.indexOf("\n", currentIndex);
        if (endIndex !== -1) {
          const tableRow = text.substring(currentIndex, endIndex + 1);
          setDisplayedText((prev) => prev + tableRow);
          setCurrentIndex(endIndex + 1);
          return;
        }
      }

      // Handle Headers (#, ##, ###, etc.)
      if (!isInCodeBlock && char === "#") {
        const headerMatch = text.substring(currentIndex).match(/^(#{1,6})\s+/);
        if (headerMatch) {
          const headerPrefixLength = headerMatch[0].length;
          setDisplayedText((prev) => prev + headerMatch[1] + " ");
          setCurrentIndex(currentIndex + headerPrefixLength);
          return;
        }
      }

      // Default: Add one character
      setDisplayedText((prev) => prev + char);
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isInCodeBlock]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [displayedText]);

  // 动态生成 h1 到 h6 的组件映射
  const headingLevels = [1, 2, 3, 4, 5, 6];
  const componentsMap = headingLevels.reduce((acc, level) => {
    acc[`h${level}`] = ({ children, ...props }) => (
      <Heading
        data={{
          depth: level,
          children: [
            {
              text: children ? String(children) : "",
            },
          ],
        }}
        {...props}
      />
    );
    return acc;
  }, {} as Record<string, React.FC<any>>);
  const renderChild = (node: any, index: number) => {
    if (node.type === "element") {
      const { tagName, children, properties } = node;
      const nestedContent = children.map((child: any, childIndex: number) =>
        renderChild(child, childIndex)
      ); // 递归处理子节点
      // 根据 tagName 返回带有子节点的相应元素
      switch (tagName) {
        case "strong":
          return <strong key={index}>{nestedContent}</strong>;
        case "em":
          return <em key={index}>{nestedContent}</em>;
        case "code":
          return (
            <code
              key={index}
              className="bg-main-surface-tertiary px-1 py-0.5 rounded-[0.25rem] text-sm font-medium"
            >
              {nestedContent}
            </code>
          );
        case "img":
          return (
            <img
              key={index}
              src={properties?.src}
              alt={properties?.alt || ""}
              className="max-w-[48rem]"
            />
          );
        default:
          return <span>{nestedContent}</span>; // 处理其他未知标签
      }
    } else {
      // 如果节点不是元素，直接返回文本值
      return node?.value;
    }
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // 动态生成的头部组件
        ...componentsMap,
        img: ({ src, alt, ...props }) => (
          <img src={src} alt={alt} className="max-w-[48rem]" {...props} />
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-decimal pl-[26px]" {...props}>
            {children}
          </ul>
        ),
        li: ({ ...props }) => {
          const result = props.node?.children.map(renderChild);
          return <li className="pl-1.5 my-2">{result}</li>;
        },
        ol: ({ children, ...props }) => (
          <ol className="list-disc pl-[26px]" {...props}>
            {children}
          </ol>
        ),
        p: ({ ...props }) => {
          const result = props.node?.children.map(renderChild);
          return <p className="leading-8">{result}</p>;
        },
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

          let codeContent = children ? String(children).replace(/\n$/, "") : "";
          codeContent = codeContent.replace(/^`+|`+$/g, "");

          return !inline && match ? (
            <div className="border-[0.5px] border-token-border-medium rounded-md overflow-hidden">
              <CopyCodeButton language={language} content={codeContent} />
              <pre className="cai-code">
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
