import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

const RightContent = () => {
  const [value, setValue] = useState("console.log('hello world!');");

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark", // 基础主题
      inherit: true, // 是否继承基础主题
      rules: [],
      colors: {},
    });

    // 在定义主题后，设置编辑器的主题
    monaco.editor.setTheme("myCustomTheme");
  };

  return (
    <div className="code-editor">
      <div className="h-14 flex items-center justify-between p-3">
        <div className="flex items-center">
          <div className="size-10 flex justify-center items-center rounded-md hover:bg-main-surface-tertiary cursor-pointer">
            <AiOutlineClose className="size-6" />
          </div>
          <span className="ml-2.5 text-lg font-semibold">
            Resizable Split View
          </span>
        </div>
      </div>
      <Editor
        height="calc(100vh - 56px)"
        width="100%"
        language="javascript"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
        value={value}
        onChange={(v) => setValue(v || "")}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default RightContent;
