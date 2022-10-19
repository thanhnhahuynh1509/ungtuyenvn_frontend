import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const DUAN = "/api/du_an";

export const xoaDuAn = async (id) => {
  const response = await axios.delete(API_URL + DUAN + "/" + id, getConfig());
  return response.data;
};
