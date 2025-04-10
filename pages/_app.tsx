import { AppProps } from "next/app";
import "../styles/global.css";
import Sidebar from "../components/Sidebar";
import { fetchGames } from "../lib/api";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      const gameData = await fetchGames(); // APIからゲームデータを取得
      setGames(gameData);
    };
    loadGames();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar games={games} onGameClick={() => {}} />
      <div className="flex-grow overflow-y-scroll h-full">
        <Component {...pageProps} games={games} />
      </div>
    </div>
  );
}
