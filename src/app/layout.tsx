import type { Metadata } from "next";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import GlobalLoading from "@/components/GlobalLoading";
import { LoadingProvider } from "@/contexts/LoadingContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "言创智信",
  description:
    "言创智信是一家前瞻性的人工智能公司，专注于开发和应用通用人工智能（AGI）技术。我们相信，通过生成式AI的创新，可以推动智能技术的全面发展，实现智能与人类的深度协同。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>言创智信</title>
        <meta
          name="keywords"
          content="言创智信,AI对话,AI聊天,AI写作,AIGC,AI,AI图片生成"
        ></meta>
        <meta
          name="description"
          content="言创智信是一家前瞻性的人工智能公司，专注于开发和应用通用人工智能（AGI）技术。我们相信，通过生成式AI的创新，可以推动智能技术的全面发展，实现智能与人类的深度协同。"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <LoadingProvider>
            <GlobalLoading />
            {children}
          </LoadingProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
