import MainContent from "./components/MainContent";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainContent>{children}</MainContent>;
}
