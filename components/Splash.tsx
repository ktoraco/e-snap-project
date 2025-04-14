import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CustomIcon from './CustomIcon';

type SplashProps = {
  onComplete: () => void;
  minimumDisplayTime?: number;
};

const Splash: FC<SplashProps> = ({ onComplete, minimumDisplayTime = 2000 }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const startTime = Date.now();
    
    // 最小表示時間を確保するためのタイマー
    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);
      
      setTimeout(() => {
        setAnimationComplete(true);
      }, remainingTime);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [minimumDisplayTime]);
  
  // アニメーション完了時にコールバック実行
  useEffect(() => {
    if (animationComplete) {
      onComplete();
    }
  }, [animationComplete, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: animationComplete ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        if (animationComplete) onComplete();
      }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: 1
        }}
        transition={{ 
          duration: 1.2,
          times: [0, 0.6, 1]
        }}
      >
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-500 rounded-full opacity-60" style={{ filter: "blur(15px)", transform: "scale(1.2)" }} />
          <CustomIcon isGradient={true} size={120} />
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-red-400 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        E-Snap Project
      </motion.h1>
      
      <motion.div 
        className="mt-12 w-64 max-w-[400px]" // 最大幅を追加
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="w-full h-1 bg-stone-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Splash;