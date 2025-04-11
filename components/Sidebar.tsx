"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomIcon from "./CustomIcon";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRef } from 'react';

type Game = {
  id: number;
  name: string;
  icon: string | { url: string };
};

type SidebarProps = {
  games: Game[];
  onGameClick: (gameId: number) => void;
};

const Sidebar: FC<SidebarProps> = ({ games, onGameClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 画面幅に応じたレスポンシブ調整
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  //外部クリック検知用のイベントリスナー
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      //サイドバーが開いていて、かつクリックされた要素がサイドバーにない場合
      if(isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if(isOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
      document.addEventListener("touchstart", handleClickOutSide as any);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide as any);
    }
  },[isOpen]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (gameId: number) => {
    setSelectedGameId(gameId);
    onGameClick(gameId);
    router.push(`/game/${gameId}`);
    setIsOpen(false);
  };

  // モバイル用とデスクトップ用のサイズ調整（固定幅を設定）
  const sidebarWidth = isMobile ? "w-[72px]" : "w-[160px]"; // 元のままの幅を維持
  const iconSize = isMobile ? "w-12 h-12" : "w-14 h-14";
  const gameIconSize = isMobile ? "w-11 h-11" : "w-14 h-14"; // モバイルでもう少し大きく

  // URLのパスからゲームIDを抽出する関数
  useEffect(() => {
    if (pathname.startsWith('/game/')) {
      const id = parseInt(pathname.split('/').pop() || '0', 10);
      if (!isNaN(id)) {
        setSelectedGameId(id);
      }
    }
  }, [pathname]);

  return (
    <>
      {/* 半透明オーバーレイ - サイドバー開閉状態によって表示/非表示を制御 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* サイドバー本体 */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen bg-stone-900 z-20 ${!isOpen ? "w-0" : sidebarWidth} transition-all duration-300 ease-in-out`}
        style={{ 
          boxShadow: !isOpen ? 'none' : '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* サイドバーのトグルボタン */}
        <button 
          onClick={toggleSidebar} 
          className={`absolute ${isMobile ? "bottom-24" : "bottom-28"} left-4 z-50 text-white rounded-md flex items-center justify-center ${iconSize}`}
          style={{ transition: 'left 0.3s ease-in-out' }}
        >
          <Image src={!isOpen ? "/icons/sclose.svg" : "/icons/sopen.svg"} alt={!isOpen ? "Close" : "Open"} width={48} height={48} className={`rounded-full ${iconSize}`} />
        </button>

        {/* サイドバーのコンテンツ */}
        <div className={`h-full flex flex-col items-center text-white ${!isOpen ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}>
          {/* ホームアイコン */}
          <motion.div 
            className="flex flex-col justify-center items-center mt-6 mb-2 rounded-full cursor-pointer" 
            onClick={() => {
              setSelectedGameId(null);
              router.push("/");
              setIsOpen(false);
            }} 
            whileTap={{ scale: 0.9 }} 
            whileHover={{ scale: 1.1 }}
          >
            <CustomIcon isGradient={pathname === "/"} size={isMobile ? 34 : 38} />
          </motion.div>

          {/* ゲームアイコンリスト */}
          <div className="flex flex-col items-center cursor-pointer gap-5 mt-4 px-2 w-full overflow-y-auto">
            {games.map((game) => {
              return (
                <motion.div 
                  key={game.id} 
                  onClick={() => handleClick(game.id)} 
                  whileTap={{ scale: 0.9 }} 
                  whileHover={{ scale: 1.1 }} 
                  className={`relative ${gameIconSize} rounded-full overflow-hidden`}
                >
                  <Image 
                    src={typeof game.icon === "string" ? game.icon : game.icon?.url || "/icons/default-icon.png"} 
                    alt={game.name} 
                    fill 
                    sizes="100%" 
                    className={`object-cover ${selectedGameId === game.id ? "opacity-100 border-2 border-blue-400" : "opacity-80"}`} 
                    style={{ borderRadius: "50%" }} 
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;