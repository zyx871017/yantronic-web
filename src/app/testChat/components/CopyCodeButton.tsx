import React, { useState } from "react";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

interface CopyCodeButtonProps {
  language: string;
  content: string;
}

const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({
  language,
  content,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // 处理复制代码的逻辑
  const copyCode = () => {
    navigator.clipboard.writeText(content).then(() => {
      console.log("----");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="bg-main-surface-secondary text-text-secondary px-4 py-2 flex justify-between h-9">
      <span className="text-sm">{language}</span>
      {copied ? (
        <div className="flex items-center gap-0.5 cursor-pointer">
          <AiOutlineCheck />
          <span className="text-sm">Copied</span>
        </div>
      ) : (
        <div
          onClick={copyCode}
          className="flex items-center gap-0.5 cursor-pointer"
        >
          <AiOutlineCopy />
          <span className="text-sm">Copy code</span>
        </div>
      )}
    </div>
  );
};

export default CopyCodeButton;
