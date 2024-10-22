"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useRef } from "react";

const CodeElement = ({ children }: any) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <pre className="mb-1">
      <code ref={codeRef}>{children}</code>
    </pre>
  );
};

export default CodeElement;
