import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    console.log(config);
    const token = localStorage.getItem("token");
    // @ts-expect-error no need check
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      return response?.data;
    } else {
      return {
        code: -1,
        msg: "未知错误",
        data: null,
      };
    }
  },
  (error) => Promise.reject(error)
);

export default request;
