import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalProvider from "@/components/GlobalProvider";
import Script from "next/script";

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
        <title>悟东</title>
        <meta
          name="keywords"
          content="言创智信,AI对话,AI聊天,AI写作,AIGC,AI,AI图片生成"
        />
        <meta
          name="description"
          content="悟东是一家前瞻性的人工智能公司，专注于开发和应用通用人工智能（AGI）技术。我们相信，通过生成式AI的创新，可以推动智能技术的全面发展，实现智能与人类的深度协同。"
        ></meta>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var isDarkMode = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              var rootElement = document.documentElement;

              if (isDarkMode) {
                rootElement.classList.add("dark");
              } else {
                rootElement.classList.remove("dark");
              }
              var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              var handleChange = (e) => {
                if (e.matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              };
              mediaQuery.addEventListener('change', handleChange);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <div id="watermark" className="watermark"></div> */}
        <GlobalProvider>{children}</GlobalProvider>
      </body>
      <Script id="custom-inline-script" strategy="afterInteractive">
        {`function createWatermark(text) {
            const container = document.getElementById('watermark');
            const rowCount = Math.ceil(window.innerHeight / 100); // 每行的高度间隔
            const colCount = Math.ceil(window.innerWidth / 200); // 每列的宽度间隔

            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < colCount; j++) {
                    const watermark = document.createElement('div');
                    watermark.className = 'watermark-text';
                    watermark.textContent = text;
                    watermark.style.top = \`\${i * 150}px\`;
                    watermark.style.left = \`\${j * 250}px\`;
                    container.appendChild(watermark);
                }
            }
        }

        // 创建水印
        createWatermark('言创AI生成')`}
      </Script>
    </html>
  );
}
