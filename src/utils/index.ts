"use client";
export const isLogin = () => {
  return !!localStorage.getItem("token");
};

export const isMobile = () => {
  if (window) {
    return window?.innerWidth < 768;
  }
  return false;
};
