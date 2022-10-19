import { layNguoiDung } from "./nguoi-dung-api";

export const API_URL = "//localhost:8080";

export const getConfig = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
    },
  };
  return config;
};

export const layNguoiDungVaCapNhatToken = async (token) => {
  const nguoiDung = await layNguoiDung(token);
  localStorage.setItem("nguoi-dung", JSON.stringify(nguoiDung));
  return nguoiDung;
};
