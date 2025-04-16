//components/MainContent.tsx
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

type Game = {
  id: number;
  name: string;
  icon: string;
};

type MainContentProps = {
  selectedGame: Game | null;
};

const MainContent: FC<MainContentProps> = ({ selectedGame }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // 初回訪問かどうかを確認し、localStorageに記録
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  //selectedGameがnullの状態 = つまりなにも選択されてない状態
  if (!selectedGame) {
    return (
      <div className="font-bold h-screen bg-stone-800 text-white flex flex-col items-center justify-center relative">
        <div className="mb-4">Please select a game from the sidebar!</div>
        
        {/* 初回訪問の場合のみ表示するガイド */}
        {isFirstVisit && (
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-blue-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              サイドバーを開いてゲームを選択してください
            </motion.div>
            
            <motion.div 
              className="fixed bottom-24 left-24 flex items-center"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.div
                className="w-16 h-1 bg-blue-500 mr-2"
                animate={{ width: [16, 64, 16], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <div className="text-blue-400">← こちらをタップ</div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  //selectedGameがGame型のオブジェクトの場合 = なんらかのGameが選択された状態
  return (
    <div className="h-full overflow-y-auto"> {/* 縦スクロール可能に */}
      <h1>{selectedGame.name}</h1>
      {/*game の infoや photoをここに表示 */}
    </div>
  );
};

export default MainContent;
