import Image from "next/image";
import { Anchor } from "antd";
import Link from "antd/es/anchor/AnchorLink";

export default async function Home() {
  return (
    <div className="w-full bg-slate-200">
      <div className="fixed bg-slate-200 flex z-10 top-0 items-center h-[50px] w-full justify-between">
        <div className="w-[924px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image width={34} height={34} src="/img/logo.png" alt="" />
            <span className="ml-2 font-bold text-lg">言创智信</span>
          </div>
          <Anchor direction="horizontal" targetOffset={80}>
            <Link className="mr-10 text-sm" href="#1" title="首页" />
            <Link className="mr-10 text-sm" href="#2" title="解决方案" />
            <Link className="text-sm" href="#3" title="关于我们" />
          </Anchor>
        </div>
      </div>
      <div
        id="1"
        className="w-full h-[100vh] bg-center bg-cover relative pt-14"
      >
        <div className="w-[90vw] h-[80vh] bg-[url('/img/firstBack.jpeg')] bg-cover mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="font-bold text-6xl text-white">言创智信</div>
            <div className="text-2xl mt-5 text-white w-[90vw]">
              通过开创性生成式AI，实现智能技术与人类社会的深度融合
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-[120px]" id="2">
        <div className="text-3xl text-center font-extrabold">解决方案</div>
        <div className="flex gap-3 justify-center mt-10">
          <div className="text-lg flex flex-col justify-between text-white p-4 bg-[url('/img/imgGen.jpeg')] bg-cover bg-center w-[300px] h-[420px] rounded-[5px]">
            <div>图像生成</div>
            <div>推送图像创意产业的发展</div>
          </div>
          <div className="text-lg flex flex-col justify-between text-white p-4 bg-[url('/img/document.jpeg')] bg-cover bg-center w-[300px] h-[420px] rounded-[5px]">
            <div>文本创作</div>
            <div>提升行业创造力和生产力</div>
          </div>
          <div className="text-lg flex flex-col justify-between text-white p-4 bg-[url('/img/data.jpeg')] bg-cover bg-center w-[300px] h-[420px] rounded-[5px]">
            <div>数据模拟</div>
            <div>提供数据驱动的智能解决方案</div>
          </div>
        </div>
      </div>
      <div className="w-full" id="3">
        <div className="text-3xl text-center font-extrabold">关于我们</div>
        <div className="w-[41vw] mx-auto mt-6 text-center">
          言创智信是一家前瞻性的人工智能公司，专注于开发和应用通用人工智能（AGI）技术。我们相信，通过生成式AI的创新，可以推动智能技术的全面发展，实现智能与人类的深度协同。
        </div>
        <div className="bg-[url('/img/about.jpeg')] rounded-md w-[924px] h-[45vh] bg- bg-cover mx-auto mt-5"></div>
      </div>
      <div className="bg-white h-[180px] w-full mt-[50px] flex items-center">
        <div className="w-[41vw] mx-auto flex justify-between items-center">
          <div>
            <div className="mb-1 text-md font-extrabold text-lg">联系我们</div>
            <div className="mb-1">地址：北京市环球贸易中心A座1702</div>
            <div className="mb-1">电话：13911535863</div>
            <div>邮箱：vip@yantronic.com</div>
          </div>
          <div>
            <div className="bg-[url('/img/qrcode.jpg')] w-[88px] h-[88px] bg-cover bg-center"></div>
            <div className="text-center text-sm">公众号</div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[40px] w-ful text-center text-sm text-white leading-[40px]">
        言创智信 Copyright © 2023-2024 版权所有
      </div>
    </div>
  );
}
