import axios from "axios";
import { API_URL, getConfig } from "./common-api";
const KY_NANG = "/api/ky_nang";

const luuLyDo = async (data) => {
  const response = await axios.post(API_URL + KY_NANG, data, getConfig());
  return response.data;
};

const capNhatLyDo = async (data) => {
  const response = await axios.put(
    API_URL + KY_NANG + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

const xoaLyDo = async (id) => {
  const response = await axios.delete(
    API_URL + KY_NANG + "/" + id,
    getConfig()
  );
  return response.data;
};
