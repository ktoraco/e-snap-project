"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomIcon from "./CustomIcon";
import { usePathname } from "next/navigation";
import Image from "next/image";

// SidebarProps 型定義
interface SidebarProps {
  games: Array<{
    id: number;
    name: string;
    icon: string | { url: string };
  }>;
  onGameClick: (gameId: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ games, onGameClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null); // トグルボタン用のref追加

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
      // トグルボタンのクリックは無視する
      if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target as Node)) {
        return;
      }
      
      if(isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // グローバルなクリックイベントを監視
    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide as any);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide as any);
    }
  },[isOpen]);

  const toggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault(); // デフォルトの動作を防止
    e.stopPropagation(); // イベントの伝播を停止
    
    // 状態を更新する前に少し遅延を設ける（競合を防ぐため）
    setTimeout(() => {
      setIsOpen(prevState => !prevState);
    }, 10);
  };

  const handleClick = (gameId: number) => {
    setSelectedGameId(gameId);
    onGameClick(gameId);
    router.push(`/game/${gameId}`);
    setIsOpen(false);
  };

  // モバイル用とデスクトップ用のサイズ調整（固定幅を設定）
  const sidebarWidth = isMobile ? "w-[72px]" : "w-[160px]"; 
  const iconSize = isMobile ? "w-12 h-12" : "w-14 h-14";
  const gameIconSize = isMobile ? "w-11 h-11" : "w-14 h-14"; 

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
        className={`fixed top-0 left-0 h-screen bg-stone-900 z-20 ${isOpen ? sidebarWidth : "w-0"} transition-all duration-300 ease-in-out`}
        style={{ 
          boxShadow: isOpen ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className={`h-full flex flex-col items-center text-white ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
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
            {games && games.map((game) => {
              // アイコンのURLを取得
              const iconUrl = typeof game.icon === "string" 
                ? game.icon 
                : game.icon?.url || "/icons/default-icon.png";
              
              return (
                <motion.div 
                  key={game.id} 
                  onClick={() => handleClick(game.id)} 
                  whileTap={{ scale: 0.9 }} 
                  whileHover={{ scale: 1.1 }} 
                  className={`relative ${gameIconSize} rounded-full overflow-hidden`}
                >
                  <Image 
                    src={iconUrl}
                    alt={game.name}
                    fill 
                    sizes="100%" 
                    className={`object-cover ${selectedGameId === game.id ? "border-2 border-blue-400" : "opacity-80"}`}
                    style={{ borderRadius: '50%' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/icons/default-icon.png";
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* サイドバーのトグルボタン - サイドバー外に配置して常に表示されるようにする */}
      <button 
        ref={toggleButtonRef}
        onClick={toggleSidebar} 
        className="fixed bottom-24 left-4 z-50 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-lg"
        style={{ width: '48px', height: '48px' }}
        onMouseDown={(e) => e.stopPropagation()} // マウスダウンイベントも阻止
      >
        <Image 
          src={isOpen ? "/icons/sClose.svg" : "/icons/sOpen.svg"} 
          alt={isOpen ? "閉じる" : "開く"} 
          width={32} 
          height={32} 
          className="rounded-full pointer-events-none" // 子要素でのクリックイベントを無効化
        />
      </button>
    </>
  );
};

export default Sidebar;