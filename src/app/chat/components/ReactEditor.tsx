"use client";
import { Editor, EditorCommand, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";
export default function ReactEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorChange = (editorState: EditorState) =>
    setEditorState(editorState);
  const handleKEyCommand = (
    command: EditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      editorChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  return (
    <Editor
      editorState={editorState}
      handleKeyCommand={handleKEyCommand}
      onChange={editorChange}
    />
  );
}
