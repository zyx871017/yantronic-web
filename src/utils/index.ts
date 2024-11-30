"use client";
export const isLogin = () => {
  return !!localStorage.getItem("token");
};

export const isMobile = () => {
  if (typeof window !== "undefined") {
    return window?.innerWidth < 768;
  }
  return false;
};
