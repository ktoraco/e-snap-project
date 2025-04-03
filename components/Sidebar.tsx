'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const [isOpen, setIsOpen]  = useState(true);
    const router = useRouter(); //useRouterを使って遷移処理を実行する

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (gameId: number) => {
        onGameClick(gameId); // 親コンポーネントに通知
        router.push(`/game/${gameId}`); // 動的ページに遷移
    };

    return (
     <div style={({ width: isOpen ? '250px' : '500px', transition: 'width 0.3s'})}>
        <button onClick={toggleSidebar}>Toggle sidebar</button>
        <div>
            {games.map(game => (
                <div key={game.id} onClick={()=> handleClick(game.id)} className="bg-gray-900 w-30 ">
                    <img src={game.icon} alt={game.name} className='rounded-full w-10' />
                    {isOpen && <span>{game.name}</span>}
                </div>
            ))}
        </div>
     </div>
    )
}

export default Sidebar;