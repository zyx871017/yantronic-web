import MarkdownRenderer from "@/components/Markdown/MarkdownReader";
import fs from "fs";
import path from "path";

const terms = () => {
  const filePath = path.join(process.cwd(), "public", "privacy.md");
  const content = fs.readFileSync(filePath, "utf8");
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-center mb-3">隐私政策</div>
      <MarkdownRenderer text={content} />
    </div>
  );
};

export default terms;
