import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";

type Photo = { id: string; url: string; game: string };

type PhotoGalleryProps = {
  photos: string[] | Photo[];
  onPhotoSelect: (photoUrl: string) => void;
  selectedPhotoUrl?: string;
  gameId?: number;
};

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos, onPhotoSelect, selectedPhotoUrl, gameId }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const photoObjects = Array.isArray(photos) && typeof photos[0] === "string" 
    ? (photos as string[]).map((url, index) => ({ id: `${index}`, url, game: "" })) 
    : (photos as Photo[]);

  // ゲームIDが変わった場合のみ初期写真を選択
  useEffect(() => {
    if (photoObjects.length > 0 && (initialLoad || gameId)) {
      // 既に選択されている写真URLと一致するものを探す
      const matchingPhoto = selectedPhotoUrl 
        ? photoObjects.find(p => p.url === selectedPhotoUrl) 
        : null;
      
      // 一致する写真があればそれを選択、なければ1枚目を選択
      if (matchingPhoto) {
        setSelectedPhotoId(matchingPhoto.id);
      } else {
        // 最初の写真を選択する
        const firstPhoto = photoObjects[0];
        setSelectedPhotoId(firstPhoto.id);
        onPhotoSelect(firstPhoto.url);
      }
      
      setInitialLoad(false);
    }
  }, [gameId, photoObjects]); // 依存配列から selectedPhotoUrl を除外

  // 写真がない場合
  if (photoObjects.length === 0) {
    return (
      <div className="text-white bg-stone-700/50 p-6 rounded-lg text-center">
        写真がありません
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode, EffectCoverflow]}
        className="w-full rounded-lg"
        style={{ padding: '0 5px' }}
      >
        {photoObjects.map((photo) => (
          <SwiperSlide key={photo.id} className="!w-auto">
            <div
              className={`relative h-20 w-28 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedPhotoId === photo.id ? "ring-2 ring-blue-500 scale-105" : "opacity-70"
              }`}
              onClick={() => {
                setSelectedPhotoId(photo.id);
                onPhotoSelect(photo.url);
              }}
            >
              <Image
                src={photo.url}
                alt={`Photo ${photo.id}`}
                fill
                sizes="(max-width: 768px) 30vw, 15vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGallery;