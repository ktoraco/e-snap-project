"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter(); //useRouterを使って遷移処理を実行する
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (gameId: number) => {
    setSelectedGameId(gameId);
    onGameClick(gameId); // 親コンポーネントに通知
    router.push(`/game/${gameId}`); // 動的ページに遷移
  };

  return (
    <div className="flex h-screen sticky top-0 left-0"> {/* Sidebarを固定 */}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-10 left-4 z-100 text-white rounded-md md:hidden flex items-center justify-center w-12 h-12"
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
        <div className="flex flex-col justify-center items-center mt-2" onClick={() => router.push("/")}>
          {/*router.pushはURLに追加しているのではなく、現在のURL全体が "/" に変更される*/}
          <img className="w-12" src="/icons/mdi_fire.svg" alt="Logo" />
        </div>
        <div className="flex flex-col items-center cursor-pointer gap-3 mt-2 ">
          {games.map((game) => (
            <div key={game.id} onClick={() => handleClick(game.id)}>
              <img
                src={game.icon}
                alt={game.name}
                className={`rounded-full w-9 
                    ${
                      selectedGameId === game.id ? "opacity-100" : "opacity-80"
                    }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        {/* メインコンテンツ */}
        {/* 重複するメッセージを削除 */}
      </div>
    </div>
  );
};

export default Sidebar;
