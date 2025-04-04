import axios from "axios";
import { Game } from "./tapes";

const API_URL = "https://your-microcms-endpoint";
const API_KEY = "your-api-key";

export const fetchGames = async (): Promise<Game[]> => {
  const response = await axios.get(`${API_URL}/games`, {
    headers: { "X-API-KEY": API_KEY },
  });
  return response.data.contens;
};
