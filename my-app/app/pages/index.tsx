// pages/inex.tsx

import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import 

type Game =import MainContent from '../../components/MainContent';
 {
    id: number;
    name: string;
    icon: string;
};

const games: Game[] = [
    { id:1, name: 'game1', icon: '/game1-icon.txt'},
    { id:2, name: 'game2', icon: '/game2-icon.txt'},
];

const Home: FC = () => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    return (
        <div style={{ display: 'flex'}}>
            <Sidebar games={games} onGameClick={gameId => setSelectedGame(games.find(game => game.id === gameId) || null)} />
            <MainContent selectedGame={selectedGame} />
        </div>
    );
}

export default Home;