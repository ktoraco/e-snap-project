import { FC, useState } from 'react';
import Image, { ImageProps } from 'next/image';

type OptimizedImageProps = Omit<ImageProps, 'onLoadingComplete' | 'onError'> & {
  rounded?: boolean;
};

const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  rounded = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };
  
  // エラー時はデフォルト画像を表示
  const imageSrc = error ? '/icons/default-icon.png' : src;
  
  return (
    <div className="relative w-full h-full">
      {/* ローディング中のプレースホルダー表示 */}
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-stone-800 animate-pulse ${rounded ? 'rounded-full' : 'rounded-md'}`}
        />
      )}
      
      {/* 実際の画像 */}
      <Image
        src={imageSrc}
        alt={alt || 'Image'}
        className={`${className} ${rounded ? 'rounded-full' : ''} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;