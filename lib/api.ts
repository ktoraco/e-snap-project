import axios from "axios";
import { Game } from "./types";

const API_URL = "https://vj05j46ftp.microcms.io/api/v1"
const API_KEY = "lV4KxBavo0tUme2ptY61ay6xAzUZ564UrCTP";

export const fetchGames = async ( ) => {
  const response = await axios.get(`${API_URL}/games`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
    },
  });
  return response.data.contents;//取得したgameのデータを返す
};

export const fetchPhotos = async ( ) => {
  const response = await axios.get(`${API_URL}/photos`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
    },
  });
  return response.data.contents; //取得したphotoのデータを返す
}
