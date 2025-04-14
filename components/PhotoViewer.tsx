import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiInfo } from "react-icons/fi";

type PhotoViewerProps = {
  photoUrl: string;
  gameId?: number; // ゲーム切り替えを検知するためのid
};

const PhotoViewer: FC<PhotoViewerProps> = ({ photoUrl, gameId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 画像の縦横比情報を保存するstate
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // キーを使って強制的に再レンダリングさせる
  const [imageKey, setImageKey] = useState(0);

  // ゲームID変更時に状態をリセット
  useEffect(() => {
    // ゲームが切り替わったらモーダルと情報パネルを閉じる
    setIsModalOpen(false);
    setShowInfo(false);
    setImageKey((prev) => prev + 1);
  }, [gameId]);

  useEffect(() => {
    if (photoUrl) {
      setIsLoading(true);
      // photoUrlが変わったら、imageKeyを更新して強制的に再レンダリング
      setImageKey((prev) => prev + 1);

      // window.Image を使用して名前の衝突を解決
      const img = new window.Image();
      img.src = photoUrl;
      img.onload = () => {
        setIsLoading(false);
        // 画像の縦横比情報を保存
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  }, [photoUrl]);

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  // モーダル外をクリックした時にモーダルを閉じる
  const handleBackdropClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* サムネイル表示部分 */}
      <motion.div 
        layout 
        className="relative rounded-lg overflow-hidden w-full" 
        style={{ 
          aspectRatio: "16/9",  
          maxHeight: "600px" }} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.3 }}
      >
        {photoUrl ? (
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : (
              <motion.div key={`image-${imageKey}-game-${gameId || 0}`} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <Image key={`${photoUrl}-${gameId}`} src={photoUrl} alt="Selected Game Screenshot" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority className="object-cover" onClick={() => setIsModalOpen(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
            <p className="text-lg font-medium">No Image Available</p>
          </div>
        )}

          {/* コントロールボタン */}
          <AnimatePresence>
          {photoUrl && !isLoading && (
            <motion.div className="absolute bottom-3 right-3 flex space-x-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleInfo} className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full">
                <FiInfo />
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleModal} className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full">
                <FiMaximize2 />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 画像情報オーバーレイ */}
        <AnimatePresence>
          {showInfo && (
            <>
              {/* 透明なオーバーレイ - クリックで情報を閉じる */}
              <motion.div className="absolute inset-0 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleInfo} />

              <motion.div
                className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm text-white p-3 text-sm z-20"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                onClick={(e) => e.stopPropagation()} // 情報パネル自体のクリックが親に伝播しないようにする
              >
                <h3 className="font-bold">Sunset Over the Mountains</h3>
                <p className="text-xs text-gray-300">Captured in Virtual World - Region 5</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      

      {/* モーダル表示部分 */}
      <AnimatePresence>
        {isModalOpen && photoUrl && (
          <>
            {/* 半透明の黒背景オーバーレイ */}
            <motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleBackdropClick}>
              {/* モーダル内のコンテンツ */}
              <motion.div className="relative w-11/12 h-11/12 md:w-4/5 md:h-4/5 max-w-5xl rounded-lg overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()}>
                <Image src={photoUrl} alt="Selected Game Screenshot" fill sizes="(max-width: 768px) 100vw, 80vw" priority className="object-contain" />

                {/* モーダル内のコントロールボタン */}
                <motion.div className="absolute bottom-3 right-3 flex space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleInfo} className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full">
                    <FiInfo />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleModal} className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full">
                    <FiMinimize2 />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>)}
      </AnimatePresence>
      </>
  );
} 
export default PhotoViewer;