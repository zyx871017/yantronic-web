"use client";
import request from "@/service/fetch";
import { Button, Checkbox, message, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
export default function LoginButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const openLogin = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    if (countDown > 0) {
      const timerId = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countDown]);
  const confirmPhone = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      message.error("请输入正确的手机号");
      return;
    }
    if (!check) {
      message.error("请阅读并同意彩小言的“使用协议”和“隐私协议”");
      return;
    }
    const res: { code: number; msg: string } = await request.post(
      "/api/getVerifyCode",
      {
        phone,
        type: "login",
      }
    );
    console.log(res);
    setCountDown(60);

    if (res.code === 0) {
      setCodeOpen(true);
    } else {
      message.error(res.msg);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeCodeModal = () => {
    setCodeOpen(false);
  };
  const handleCheck = (e: CheckboxChangeEvent) => {
    setCheck(e.target.checked);
  };
  const phoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const codeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setCode("");
    }
    if (!/^\d+$/.test(value)) {
      return;
    }
    setCode(e.target.value);
    if (value.length === 6) {
      const res: { code: number; msg: string } = await request.post(
        "/api/verifyCode",
        {
          phone,
          code: value,
        }
      );
      if (res.code === 0) {
        setCodeOpen(true);
      } else {
        message.error(res.msg);
      }
    }
  };
  return (
    <>
      <Button type="primary" className="w-[196px] !h-[60px] mt-[80px] !text-2xl" onClick={openLogin}>
        立即体验
      </Button>
      <Modal
        onCancel={closeModal}
        footer={null}
        width={400}
        centered
        open={modalOpen}
      >
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-10">手机号登陆</div>
          <input
            className="outline-none border-none w-full h-12 bg-slate-100 rounded-full px-4 mb-4"
            placeholder="请输入手机号"
            onChange={phoneChange}
          />
          <Button
            type="primary"
            className="w-full !rounded-full !h-12 !font-bold !text-base mb-8"
            onClick={confirmPhone}
            disabled={!phone}
          >
            下一步
          </Button>
          <div className="mb-4">
            <Checkbox onChange={handleCheck} className="!mr-2" />
            <span className="mr-1">已阅读并同意豆包的</span>
            <Link className="mr-1" href="">
              使用协议
            </Link>
            <span className="mr-1">和</span>
            <Link href="">隐私政策</Link>
          </div>
        </div>
      </Modal>
      <Modal
        onCancel={closeCodeModal}
        footer={null}
        width={400}
        centered
        open={codeOpen}
      >
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold">输入6位验证码</div>
          <div className="text-slate-500 mb-6">验证码已发送至{phone}</div>
          <input
            className="outline-none border-none w-full h-12 bg-slate-100 rounded-full px-4 mb-4"
            placeholder="请输入验证码"
            onChange={codeChange}
            value={code}
          />
          <Button
            type="primary"
            className="w-full !rounded-full !h-12 !font-bold !text-base mb-8"
            onClick={confirmPhone}
            disabled={countDown > 0}
          >
            重新发送{countDown > 0 ? `(${countDown}s)` : ""}
          </Button>
        </div>
      </Modal>
    </>
  );
}
