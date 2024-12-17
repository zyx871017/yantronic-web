import React, { useState, useEffect } from "react";
import { Modal, Upload, message, Form, Input } from "antd";
import type { GetProp, UploadProps } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updataAvatar, updateUserInfo } from "@/service/user";
import Image from "next/image";

interface IProps {
  open: boolean;
  handleCancel?: () => void;
  submitHandle: (value: { avatar: string; username: string }) => void;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Personal: React.FC<IProps> = (props: IProps) => {
  const avatar = localStorage.getItem("avatar") || "/img/avatar.png";
  const { open, handleCancel = () => {}, submitHandle = () => {} } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(avatar);
  const [form] = Form.useForm();
  // 设置表单的初始值，仅在组件首次渲染时执行
  useEffect(() => {
    form.setFieldsValue({ username: localStorage.getItem("username") });
  }, [open, form]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      const params = {
        username: values.username as string,
        avatar: imageUrl,
      };
      const res = await updateUserInfo(params);
      setConfirmLoading(false);
      if (res.code === 0) {
        submitHandle(params);
        handleCancel();
        form.resetFields();
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const formData = new FormData();
      formData.append("file", file);
      setAvatarLoading(true);
      const { data } = await updataAvatar(formData);
      setImageUrl(data!.avatar_url as string);
      setAvatarLoading(false);
      onSuccess(data);
    } catch (error) {
      onError(error);
      message.error("Upload failed.");
    }
  };
  return (
    <>
      <Modal
        title="个人信息"
        centered
        cancelText="取 消"
        okText="确 定"
        open={open}
        onOk={handleOk}
        okButtonProps={{ disabled: avatarLoading }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-col items-center gap-8">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            disabled={avatarLoading}
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
          >
            <div className="w-[100px] h-[100px] relative overflow-hidden rounded-full">
              <Image
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                alt="avatar"
              />
              {avatarLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50 text-[24px] text-white">
                  <AiOutlineLoading3Quarters
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </Upload>
          <Form form={form} autoComplete="off" className="w-[350px]">
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Personal;
