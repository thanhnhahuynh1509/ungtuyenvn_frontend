import axios from "axios";
import { API_URL, getConfig } from "./common-api";
const THONG_TIN_LIEN_LAC = "/api/thong_tin_lien_lac";

const luuThongTin = async (data) => {
  const response = await axios.post(
    API_URL + THONG_TIN_LIEN_LAC,
    data,
    getConfig()
  );
  return response.data;
};

const capNhapThongTin = async (data) => {
  const response = await axios.put(
    API_URL + THONG_TIN_LIEN_LAC + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

const xoaThongTin = async (id) => {
  const response = await axios.delete(
    API_URL + THONG_TIN_LIEN_LAC + "/" + id,
    getConfig()
  );
  return response.data;
};
