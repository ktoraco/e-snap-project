import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiInfo } from "react-icons/fi";

type PhotoViewerProps = {
  photoUrl: string;
};

const PhotoViewer: FC<PhotoViewerProps> = ({ photoUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (photoUrl) {
      setIsLoading(true);
      // window.Image を使用して名前の衝突を解決
      const img = new window.Image();
      img.src = photoUrl;
      img.onload = () => setIsLoading(false);
    }
  }, [photoUrl]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <motion.div
      layout
      className={`relative rounded-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 bg-black/90" : "w-full"
      }`}
      style={{ height: isFullscreen ? "100vh" : "200px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {photoUrl ? (
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-800 flex items-center justify-center"
            >
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <Image
                src={photoUrl}
                alt="Selected Game Screenshot"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover"
                onClick={() => setIsFullscreen(isFullscreen ? false : true)}
              />
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
          <motion.div 
            className="absolute bottom-3 right-3 flex space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleInfo}
              className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full"
            >
              <FiInfo />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full"
            >
              {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 画像情報オーバーレイ */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm text-white p-3 text-sm"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <h3 className="font-bold">Sunset Over the Mountains</h3>
            <p className="text-xs text-gray-300">Captured in Virtual World - Region 5</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhotoViewer;