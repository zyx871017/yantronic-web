import MarkdownRenderer from "@/components/Markdown/MarkdownReader";
import path from "path";
import fs from "fs";
const terms = () => {
  const filePath = path.join(process.cwd(), "public", "terms.md");
  const content = fs.readFileSync(filePath, "utf8");
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-center mb-3">用户协议</div>
      <MarkdownRenderer text={content} />
    </div>
  );
};

export default terms;
