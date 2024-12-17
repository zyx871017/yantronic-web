/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    domains: ["yantronic-avatar-1306173637.cos.ap-beijing.myqcloud.com"],
  },
  // trailingSlash: true, // 确保每个页面都有一个斜杠
  // images: {
  //   unoptimized: true, // 如果你不使用 Next.js 的优化，设置为 true
  // },
  // output: "export",
};

export default nextConfig;
