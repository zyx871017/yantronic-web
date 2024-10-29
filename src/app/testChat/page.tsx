import TypingEffect from "./components/TypingEffect";
const markdownContent = `
# 欢迎来到打字机效果演示

这段文字将逐字显示，模拟打字机的效果。它包含普通文本段落和代码块。

- 支持 **加粗**、*斜体* 和其他 Markdown 语法。
- 适用于展示需要逐渐呈现的内容。

## 示例代码段

下面是一个代码块示例，包含 JavaScript 代码：

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');
\`\`\`

还有一些普通文本来说明代码的用途。

### 演示完毕
`;
export default function Home() {
  return (
    <div className="px-5">
      <TypingEffect text={markdownContent} speed={50} />
    </div>
  );
}
