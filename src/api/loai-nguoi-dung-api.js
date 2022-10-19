import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const LOAI_NGUOI_DUNG = "/api/loai_nguoi_dung";

export const luuLoaiNguoiDung = async (data) => {
  const response = await axios.post(
    API_URL + LOAI_NGUOI_DUNG,
    data,
    getConfig()
  );
  return response.data;
};

export const capNhatLoaiNguoiDung = async (data) => {
  const response = await axios.put(
    API_URL + LOAI_NGUOI_DUNG + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const xoaLoaiNguoiDung = async (id) => {
  const response = await axios.delete(
    API_URL + LOAI_NGUOI_DUNG + "/" + id,
    getConfig()
  );
  return response.data;
};

export const layTatCaLoaiNguoiDung = async () => {
  const response = await axios.get(API_URL + LOAI_NGUOI_DUNG, getConfig());
  return response.data;
};
