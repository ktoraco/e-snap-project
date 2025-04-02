'use client';

import { ReactNode, useState } from 'react';
import "../styles/global.css";
import MainContent from './pages/MainContent';
import Sidebar from '../components/Sidebar';
import { metadata } from '../lib/metadata'; // metadata をインポート


const games = [
  { id: 1, name: 'Game 1', icon: '/icons/game1.png' },
  { id: 2, name: 'Game 2', icon: '/icons/game2.png' },
  { id: 3, name: 'Game 3', icon: '/icons/game3.png' }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  // 選択したゲームを保持するステート
  const [selectedGame, setSelectedGame] = useState<{ id: number; name: string } | null>(null);

  // ゲームがクリックされた時の処理
  const handleGameClick = (gameId: number) => {
    const game = games.find(game => game.id === gameId);
    setSelectedGame(game || null);
  };

  return (
    <html lang='jp'>
      <body>
        <div className="layout-container">
          <Sidebar games={games} onGameClick={handleGameClick} />
        </div>
        <div className="main-content-">
          {children}
        </div>
      </body>
    </html>
  );
}
