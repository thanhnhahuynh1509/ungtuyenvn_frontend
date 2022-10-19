import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const CHUYENMON = "/api/chuyen_mon";

export const layTatCaChuyenMon = async () => {
  const response = await axios.get(API_URL + CHUYENMON, getConfig());
  return response.data;
};

export const luuChuyenMon = async (data) => {
  const response = await axios.post(API_URL + CHUYENMON, data, getConfig());
  return response.data;
};

export const capNhapChuyenMon = async (data) => {
  const response = await axios.put(
    API_URL + CHUYENMON + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const xoaChuyenMon = async (id) => {
  const response = await axios.delete(
    API_URL + CHUYENMON + "/" + id,
    getConfig()
  );
  return response.data;
};
