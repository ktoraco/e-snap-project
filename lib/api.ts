import axios from "axios";
import { Game } from "./types";


const API_URL = "https://vj05j46ftp.microcms.io/api/v1";
const API_KEY = process.env.MICROCMS_API_KEY; // 環境変数からAPIキーを取得

if (!API_KEY) {
  throw new Error("MICROCMS_API_KEY is not defined in environment variables.");
}

console.log("MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY);

export const fetchGames = async () => {
  const response = await axios.get(`${API_URL}/games`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
    },
  });
  return response.data.contents; // 取得したgameのデータを返す
};

export const fetchPhotos = async () => {
  const response = await axios.get(`${API_URL}/photos`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
    },
  });
  return response.data.contents; // 取得したphotoのデータを返す
};
