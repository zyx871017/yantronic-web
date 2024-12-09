import MobileHeader from "./components/MobileHeader";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MobileHeader />
      {children}
    </div>
  );
}
