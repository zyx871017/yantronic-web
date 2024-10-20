import { Spin } from "antd";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loading: React.FC<any> = (props) => {
  return (
    <div className="fixed inset-0 bg-slate-700">
      <Spin spinning={true}>{props.children}</Spin>
    </div>
  );
};

export default Loading;
