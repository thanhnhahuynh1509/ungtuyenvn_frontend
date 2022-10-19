import axios from "axios";
import { API_URL } from "./common-api";

const TAI_KHOAN = "/api/tai_khoan";
const DANG_NHAP = "/dang_nhap";
const DANG_KY = "/dang_ky";

export const dangKy = async (data) => {
  const response = await axios.post(API_URL + TAI_KHOAN + DANG_KY, data);
  return response.data;
};

export const dangNhap = async (data) => {
  console.log(`${API_URL}${TAI_KHOAN}${DANG_NHAP}`);
  const response = await axios.post(API_URL + TAI_KHOAN + DANG_NHAP, data);
  return response.data;
};
