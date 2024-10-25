import { ChatProvider } from "@/contexts/ChatContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { LoginOpenProvider } from "@/contexts/LoginContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import GlobalLogin from "./GlobalLogin";
import GlobalLoading from "./GlobalLoading";
import { ReactNode } from "react";
import { LayoutProvider } from "@/contexts/LayoutContext";

const GlobalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <AntdRegistry>
      <LayoutProvider>
        <LoadingProvider>
          <LoginOpenProvider>
            <ChatProvider>
              <GlobalLogin />
              <GlobalLoading />
              {children}
            </ChatProvider>
          </LoginOpenProvider>
        </LoadingProvider>
      </LayoutProvider>
    </AntdRegistry>
  );
};

export default GlobalProvider;
