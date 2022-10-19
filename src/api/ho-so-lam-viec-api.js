import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const HO_SO_LAM_VIEC = "/api/ho_so_lam_viec";

export const luuHoSoLamViec = async (data) => {
  const response = await axios.post(
    API_URL + HO_SO_LAM_VIEC,
    data,
    getConfig()
  );
  return response.data;
};

export const capNhapHoSoLamViec = async (data) => {
  const response = await axios.put(
    API_URL + HO_SO_LAM_VIEC + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const xoaHoSoLamViec = async (id) => {
  const response = await axios.delete(
    API_URL + HO_SO_LAM_VIEC + "/" + id,
    getConfig()
  );
  return response.data;
};
