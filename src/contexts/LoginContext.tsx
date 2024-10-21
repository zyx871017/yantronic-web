"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextProps {
  loginOpen: boolean;
  setLoginOpen: (loading: boolean) => void;
}

const LoginOpenContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginOpenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LoginOpenContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </LoginOpenContext.Provider>
  );
};

export const useLoginOpen = () => {
  const context = useContext(LoginOpenContext);
  if (!context) {
    throw new Error("useLoginOpen must be used within a LoginOpenProvider");
  }
  return context;
};
