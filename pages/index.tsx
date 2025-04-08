import { FC, useState } from 'react';
import MainContent from '../components/MainContent';

type Game = {
  id: number;
  name: string;
  icon: string;
};

const games: Game[] = [
  { id: 1, name: 'game1', icon: '/icons/game1.png' },
  { id: 2, name: 'game2', icon: '/icons/game2.png' },
];

const Home: FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="h-full"> {/* 高さを画面全体に設定 */}
      <MainContent selectedGame={selectedGame} />
    </div>
  );
};

export default Home;
