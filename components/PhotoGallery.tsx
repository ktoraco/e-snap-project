import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

type PhotoGalleryProps = {
  photos: string[];
  onPhotoSelect: (photoUrl: string) => void;
};

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos, onPhotoSelect }) => {
  console.log("Photos in PhotoGallery:", photos); // デバッグ用ログ

  if (photos.length === 0) {
    return <div className="text-white">No photos available</div>;
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        direction="horizontal"
        cssMode={false}
        className="w-full z-30"
        grid={{
          rows: 2,
        }}
      >
        {photos.map((photoUrl, index) => (
          <SwiperSlide key={index} style={{ width: "150px" }}>
            <img
              src={photoUrl}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => onPhotoSelect(photoUrl)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
