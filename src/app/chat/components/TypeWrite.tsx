"use client";
import { useEffect, useState } from "react";

interface IProps {
  text: string;
  onTypingEnd: () => void;
}

const TypeWrite = (props: IProps) => {
  const { text, onTypingEnd } = props;
  const [textShow, setTextShow] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setTextShow((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      onTypingEnd();
    }
  }, [index, text]);

  return <>{textShow}</>;
};

export default TypeWrite;
