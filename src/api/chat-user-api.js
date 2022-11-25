import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const CHAT_USER = "/api/chatusers";

export const luuChatUser = async (data) => {
  const response = await axios.post(API_URL + CHAT_USER, data, getConfig());
  return response.data;
};

export const layChatUser = async (ownerId) => {
  const response = await axios.get(
    API_URL + CHAT_USER + "/all/" + ownerId,
    getConfig()
  );
  return response.data;
};

export const layChatTuChatUser = async (id) => {
  const response = await axios.get(
    API_URL + CHAT_USER + "/chat/" + id,
    getConfig()
  );
  return response.data;
};
