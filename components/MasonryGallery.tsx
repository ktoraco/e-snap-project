import { FC, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGames, fetchPhotos } from '../lib/api';
import { FiFilter, FiX } from 'react-icons/fi';
import PhotoViewer from '../components/PhotoViewer';

// 型定義
type Game = {
  id: string;
  title: string;
  description: string;
  icon: string | { url: string };
};

type Photo = {
  id: string;
  url: Array<{ url: string }>;
  game: { id: string, title: string };
  tags?: string[];
};

type GalleryPhoto = {
  id: string;
  url: string;
  gameId: string;
  gameTitle: string;
  tags: string[];
};

const MasonryGallery: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // すべてのタグを抽出
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    galleryPhotos.forEach(photo => {
      if (photo.tags) {
        photo.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [galleryPhotos]);
  
  // すべてのゲームをフィルターオプションとして使用
  const gameOptions = useMemo(() => {
    return games.map(game => ({
      id: game.id,
      title: typeof game.title === 'string' ? game.title : '不明なゲーム'
    }));
  }, [games]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gameData, photoData] = await Promise.all([
          fetchGames(),
          fetchPhotos()
        ]);
        
        setGames(gameData);
        setPhotos(photoData);
        
        // 画像データを整形
        const formattedPhotos: GalleryPhoto[] = [];
        photoData.forEach(photo => {
          // 各photoのurl配列を展開
          photo.url.forEach((urlObj, index) => {
            formattedPhotos.push({
              id: `${photo.id}-${index}`,
              url: urlObj.url,
              gameId: photo.game?.id || '',
              gameTitle: photo.game?.title || '不明なゲーム',
              tags: photo.tags || []
            });
          });
        });
        
        setGalleryPhotos(formattedPhotos);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    
    loadData();
  }, []);
  
  // フィルター適用
  const filteredPhotos = useMemo(() => {
    if (activeFilters.length === 0) return galleryPhotos;
    
    return galleryPhotos.filter(photo => {
      // ゲームIDでフィルター
      const gameMatch = activeFilters.some(filter => {
        return photo.gameId === filter;
      });
      
      // タグでフィルター
      const tagMatch = activeFilters.some(filter => {
        return photo.tags?.includes(filter);
      });
      
      return gameMatch || tagMatch;
    });
  }, [galleryPhotos, activeFilters]);
  
  // フィルターの切り替え
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  // フィルターのリセット
  const resetFilters = () => {
    setActiveFilters([]);
  };
  
  // 写真クリック時の処理
  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  return (
      <div className="min-h-screen bg-stone-900 text-white p-4 md:p-6">
        <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-stone-400">Super View</h1>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-full"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <FiX /> : <FiFilter />}
          </motion.button>
        </div>
        
        {/* フィルターパネル */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-stone-800 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Games</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {gameOptions.map(game => (
                  <button
                    key={game.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.includes(game.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-stone-700 hover:bg-stone-600'
                    }`}
                    onClick={() => toggleFilter(game.id)}
                  >
                    {game.title}
                  </button>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.includes(tag)
                        ? 'bg-green-500 text-white'
                        : 'bg-stone-700 hover:bg-stone-600'
                    }`}
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              {activeFilters.length > 0 && (
                <button
                  className="text-sm text-red-400 hover:text-red-300"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>
        )}
        
        {/*写真を表示する部分*/}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {filteredPhotos.map(photo => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid rounded-lg overflow-hidden shadow-lg bg-stone-800 cursor-pointer group"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={photo.url}
                  alt={`${photo.gameTitle}の写真`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>
              <div className="p-3">
                <div className="text-sm text-stone-400">{photo.gameTitle}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {photo.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-stone-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 写真がない場合のメッセージ */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p>No photos match your criteria</p>
            <button
              className="mt-4 text-red-400 hover:text-stone-300"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* 写真の詳細表示モーダル */}
      {selectedPhoto && (
        <PhotoViewer
          photoUrl={selectedPhoto.url}
          gameId={parseInt(selectedPhoto.gameId, 10)}
        />
      )}
    </div>
  );
};

export default MasonryGallery;