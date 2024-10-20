"use client";
import React from "react";
import { useLoading } from "../contexts/LoadingContext";
import { Spin } from "antd";

const GlobalLoading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black/20 z-10">
      <Spin
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        spinning={isLoading}
        size="large"
      ></Spin>
    </div>
  );
};

export default GlobalLoading;
