import SideMenu from "./components/SideMenu";
import MainContent from "./components/MainContent";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex relative">
      <SideMenu />
      <MainContent>{children}</MainContent>
    </div>
  );
}
