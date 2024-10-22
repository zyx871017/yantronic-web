"use client";

import { useEffect } from "react";

function DarkModeHandler() {
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const rootElement = document.documentElement;

    if (isDarkMode) {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
  }, []);

  return null;
}

export default DarkModeHandler;
