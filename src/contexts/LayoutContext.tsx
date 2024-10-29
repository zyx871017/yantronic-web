"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LayoutContextProps {
  sideOpen: boolean;
  setSideOpen: (open: boolean) => void;
  canvasMode: boolean;
  setCanvasMode: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sideOpen, setSideOpen] = useState(false);
  const [canvasMode, setCanvasMode] = useState(true);

  return (
    <LayoutContext.Provider
      value={{ sideOpen, setSideOpen, canvasMode, setCanvasMode }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LoginOpenProvider");
  }
  return context;
};
