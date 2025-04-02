//components/MainContent.tsx
import { FC } from 'react';

type Game = {
  id: number;
  name: string;
  icon: string;
};

type MainContent = {
  selectGame: Game | null;
};

const MainContent: FC<MainContentProps> = ({ selectGame }) => {
  if(!selectGame) {
    return <div>Please select a game from the sidebar!</div>;
  }

  return (
    <div>
      <h1>{selectGame.name}</h1>
      {/*game の infoや photoをここに表示 */}
    </div>
  );
}

export default MainContent;