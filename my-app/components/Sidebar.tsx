//conmponents/sidebar.tsx
import { FC, useState } from 'react';
import { useRouter } from 'next/router';

type Game = {
    id: number;
    name: string;
    icon: string;
};

type SidebarProps = {
    games: Game[];
};

const Sidebar: FC<SidebarProps> = ({ games }) => {
    const [isOpen, setIsOpen]  = useState(true);
    const router = useRouter(); //useRouterを使って遷移処理を実行する

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (gameId: number) => {
        router.push(`/game/${gameId}`);// ゲームIDに基づいて動的ページに遷移
    }

    return (
     <div style={({ width: isOpen ? '250px' : '500px', transition: 'width 0.3s'})}>
        <button onClick={toggleSidebar}>Toggle sidebar</button>
        <div>
            {games.map(game => (
                <div key={game.id} onClick={()=> handleClick(game.id)}>
                    <img src={game.icon} alt={game.name} />
                    {isOpen && <span>{game.name}</span>}
                </div>
            ))}
        </div>
     </div>
    )
}

export default Sidebar;