import { AppProps } from "next/app";
import "../styles/global.css";
import Sidebar from "../components/Sidebar";
import { fetchGames } from "../lib/api";
import { useEffect, useState } from "react";
import Splash from "../components/Splash";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ゲームデータの読み込み
  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameData = await fetchGames(); // APIからゲームデータを取得
        setGames(gameData);
      } catch (error) {
        console.error("Failed to load games:", error);
      }
    };
    
    loadGames();
  }, []);
  
  // 重要な画像のプリロード
  useEffect(() => {
    const preloadImages = [
      '/icons/sclose.svg', 
      '/icons/sopen.svg',
      '/icons/default-icon.png'
    ];
    
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  // スプラッシュ画面を閉じる処理
  const handleSplashComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <title>Esna</title>
        <link rel="preload" href="/icons/sclose.svg" as="image" />
        <link rel="preload" href="/icons/sopen.svg" as="image" />
        <link rel="preload" href="/icons/default-icon.png" as="image" />
      </Head>
      
      {/* スプラッシュ画面 */}
      {loading && <Splash onComplete={handleSplashComplete} minimumDisplayTime={2500} />}
      
      {/* メインアプリのレイアウト */}
      <div 
        className="flex h-screen bg-stone-800"
        style={{ 
          opacity: loading ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out', 
          visibility: loading ? 'hidden' : 'visible'
        }}
      >
        <Sidebar games={games} onGameClick={() => {}} />

         <main className="flex-1 overflow-y-auto bg-stone-800">
          <div className="max-w-[768px] mx-auto w-full sm:px-6 md:px-8">
            <Component {...pageProps} games={games} />
          </div>
        </main>
      </div>
    </>
  );
}