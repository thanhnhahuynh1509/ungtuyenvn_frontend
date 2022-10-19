import axios from "axios";
import { API_URL, getConfig } from "./common-api";
const LY_DO_LAM_VIEC = "/api/ly_do_lam_viec";

const luuLyDo = async (data) => {
  const response = await axios.post(API_URL + LY_DO_LAM_VIEC, data, config);
  return response.data;
};

const capNhatLyDo = async (data) => {
  const response = await axios.put(
    API_URL + LY_DO_LAM_VIEC + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

const xoaLyDo = async (id) => {
  const response = await axios.delete(
    API_URL + LY_DO_LAM_VIEC + "/" + id,
    getConfig()
  );
  return response.data;
};
