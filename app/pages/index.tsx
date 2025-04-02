// pages/index.tsx
import { FC, useState } from 'react';
import Sidebar from '../../components/Sidebar';  // 相対パスを修正
import MainContent from './MainContent';  // 相対パスを修正

type Game = {
    id: number;
    name: string;
    icon: string;
};

const games: Game[] = [
    { id: 1, name: 'game1', icon: '/game1-icon.png' },
    { id: 2, name: 'game2', icon: '/game2-icon.png' },
];

const Home: FC = () => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar games={games} onGameClick={gameId => setSelectedGame(games.find(game => game.id === gameId) || null)} />
            <MainContent selectedGame={selectedGame} />
        </div>
    );
}

export default Home;