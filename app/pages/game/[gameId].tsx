//動的ページ
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainContent from '../MainContent';

type Game = {
    id: number;
    name: string;
    icon: string;
    description: string;
};

const GamePage: FC = () => {
    const router = useRouter();
    const { gameId } = router.query; //URLパラメータからgameIdを取得する
    const [game, setGame] = useState<Game | null>(null);

    //gameのデータを取得する処理
    //gameIdが切り替わったとき、つまりゲームが選択されたとき、自動的に取得される
    useEffect(() => {
        if(gameId) {
            const fetchedGame = {
                id: Number(gameId),
                name: `Game ${gameId}`,
                icon: `/game${gameId}-icon.jpg`,
                description: `Description of Game of ${gameId}`
            };
            setGame(fetchedGame);
        }
    }, [gameId]);

    if(!game) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <MainContent selectedGame={game} />
        </div>
    );
};

export default GamePage;