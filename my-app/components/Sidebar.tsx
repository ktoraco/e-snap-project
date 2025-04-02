//conmponents/sidebar.tsx
import { FC, useState } from 'react';

type Game = {
    id: number;
    name: string;
    icon: string;
};

type SidebarProps = {
    games: Game[];
    onGameClick: (gameId: number) => void;
};

const Sidebar: FC<SidebarProps> = ({ games, onGameClick}) => {
    const [isOpen, setIsOpen]  = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
     <div style={({ width: isOpen ? '250px' : '500px', transition: 'width 0.3s'})}>
        <button onClick={toggleSidebar}>Toggle sidebar</button>
        <div>
            {games.map(game => (
                <div key={game.id} onClick={()=> onGameClick(game.id)}>
                    <img src={game.icon} alt={game.name} />
                    {isOpen && <span>{game.name}</span>}
                </div>
            ))}
        </div>
     </div>
    )
}

export default Sidebar;