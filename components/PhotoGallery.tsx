import { FC, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, EffectCoverflow } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";

type Photo = { id: string; url: string; game: string };

type PhotoGalleryProps = {
  photos: string[] | Photo[];
  onPhotoSelect: (photoUrl: string) => void;
  selectedPhotoUrl?: string; // 追加: 現在選択されている写真のURL
};

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos, onPhotoSelect, selectedPhotoUrl }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const photoObjects = Array.isArray(photos) && typeof photos[0] === "string" ? (photos as string[]).map((url, index) => ({ id: `${index}`, url, game: "" })) : (photos as Photo[]);

  if (photoObjects.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white bg-stone-700/50 p-6 rounded-lg text-center">
        No photos available
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        centeredSlides={true}
        effect="coverflow"
        initialSlide={1}
        loop={photoObjects.length > 3}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        grabCursor={true}
        modules={[FreeMode, EffectCoverflow]}
        className="w-full z-30"
      >
        {photoObjects.map((photo, index: number) => {
          const isSelected = selectedPhotoUrl === photo.url;

          return (
            <SwiperSlide key={photo.id} className="!w-auto flex items-center justify-center">
              <motion.div whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} layoutId={`photo-${photo.id}`} className={`flex items-center justify-center h-32 ${isSelected ? "ring-2 ring-blue-400 shadow-lg shadow-blue-400/50" : ""}`}>
                <Image
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className={`h-full w-auto object-contain cursor-pointer rounded-md shadow-lg transition-all ${isSelected ? "brightness-110" : "hover:brightness-105"}`}
                  onClick={() => {
                    setSelectedPhotoId(photo.id);
                    onPhotoSelect(photo.url); // 選択された写真のURLをPhotoViewerに渡す
                  }}
                  width={150}
                  height={150}
                />
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <AnimatePresence>
        {selectedPhotoId && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 bg-stone-800 p-2 rounded-md">
            <p className="text-xs text-gray-400">Selected Photo ID: {selectedPhotoId}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
