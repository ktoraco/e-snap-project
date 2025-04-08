"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // framer-motion をインポート
import CustomIcon from "./CustomIcon";
import { usePathname } from "next/navigation"; // 現在のパスを取得するためのフックをインポート

type Game = {
  id: number;
  name: string;
  icon: string;
};

type SidebarProps = {
  games: Game[];
  onGameClick: (gameId: number) => void;
};

const Sidebar: FC<SidebarProps> = ({ games, onGameClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (gameId: number) => {
    setSelectedGameId(gameId);
    onGameClick(gameId);
    router.push(`/game/${gameId}`);
  };

  return (
    <motion.div
      className="flex h-screen relative"
      initial={{ width: isOpen ? "0px" : "56px" }} // 初期状態
      animate={{ width: isOpen ? "0px" : "56px" }} // アニメーション
      transition={{ duration: 0.3 }} // アニメーションの速度
    >
      <button
        onClick={toggleSidebar}
        className="absolute bottom-10 left-4 z-50 text-white rounded-md flex items-center justify-center w-12 h-12"
      >
        <img
          src={isOpen ? "/icons/sclose.svg" : "/icons/sopen.svg"}
          alt={isOpen ? "Close" : "Open"}
          className="w-12 h-12 rounded-full"
        />
      </button>
      <div
        className={`transition-width duration-300 h-full bg-stone-900 justify-center text-white ${
          isOpen ? "w-0" : "w-14"
        }`}
      >
        <motion.div
          className="flex flex-col justify-center items-center mt-2 rounded-full cursor-pointer"
          onClick={() => router.push("/")}
          whileTap={{ scale: 0.9 }} // クリック時に縮小
          whileHover={{ scale: 1.1 }} // ホバー時に拡大
        >
          <CustomIcon isGradient={pathname === "/"} /> {/* ホームの場合にグラデーション */}
        </motion.div>
        <div className="flex flex-col items-center cursor-pointer gap-3 mt-2">
          {games.map((game) => (
            <motion.div
              key={game.id}
              onClick={() => handleClick(game.id)}
              whileTap={{ scale: 0.9 }} // クリック時に縮小
              whileHover={{ scale: 1.1 }} // ホバー時に拡大
            >
              <img
                src={game.icon}
                alt={game.name}
                className={`rounded-full w-9 ${
                  selectedGameId === game.id ? "opacity-100" : "opacity-80"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
