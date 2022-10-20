import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const NGUOI_DUNG = "/api/nguoi_dung";

export const layTatCaNguoiDung = async () => {
  const response = await axios.get(API_URL + NGUOI_DUNG);
  return response.data;
};

export const capNhapNguoiDung = async (data) => {
  const response = await axios.put(
    API_URL + NGUOI_DUNG + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const layNguoiDung = async (token) => {
  const response = await axios.post(
    API_URL + NGUOI_DUNG + "/get_by_token",
    token,
    getConfig()
  );
  return response.data;
};

export const themChuyenMon = async (id, maChuyenMon) => {
  const response = await axios.post(
    API_URL + NGUOI_DUNG + "/" + id + "/chuyen_mon/" + maChuyenMon,
    getConfig()
  );
  return response.data;
};

export const xoaChuyenMon = async (id, maChuyenMon) => {
  const response = await axios.delete(
    API_URL + NGUOI_DUNG + "/" + id + "/chuyen_mon/" + maChuyenMon,
    getConfig()
  );
  return response.data;
};

export const capNhatHinhAnhNguoiDung = async (id, data) => {
  const response = await axios.post(
    API_URL + NGUOI_DUNG + "/" + id,
    data,
    getConfig()
  );
  return response.data;
};

export const luuDuAnNguoiDung = async (id, data) => {
  const response = await axios.post(
    API_URL + NGUOI_DUNG + "/" + id + "/du_an",
    data,
    getConfig()
  );
  return response.data;
};

export const capNhatDuAnNguoiDung = async (id, maDuAn, data) => {
  const response = await axios.post(
    API_URL + NGUOI_DUNG + "/" + id + "/du_an/" + maDuAn,
    data,
    getConfig()
  );
  return response.data;
};
