import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const BAOCAO = "/api/bao_cao";

export const luuBaoCao = async (id, data) => {
  const response = await axios.post(
    API_URL + BAOCAO + "/nguoi_dung/" + id,
    data,
    getConfig()
  );
  return response.data;
};
