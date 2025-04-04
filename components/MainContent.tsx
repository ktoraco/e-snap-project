//components/MainContent.tsx
import { FC } from "react";

type Game = {
  id: number;
  name: string;
  icon: string;
};

type MainContentProps = {
  selectedGame: Game | null;
};

const MainContent: FC<MainContentProps> = ({ selectedGame }) => {
  //selectedGameがnullの状態 = つまりなにも選択されてない状態
  if (!selectedGame) {
    return (
      <div className="font-bold h-screen bg-stone-800 text-white flex items-center justify-center">
        Please select a game from the sidebar!
      </div>
    );
  }

  //selectedGameがGame型のオブジェクトの場合 = なんらかのGameが選択された状態
  return (
    <div>
      <h1>{selectedGame.name}</h1>
      {/*game の infoや photoをここに表示 */}
    </div>
  );
};

export default MainContent;
