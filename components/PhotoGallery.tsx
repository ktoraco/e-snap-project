import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type PhotoGalleryProps = {
  photos: string[];
  onPhotoSelect: (photoUrl: string) => void;
};

const PhotoGallery: FC = () => {
  return (
    <div className="max-h-[300px] overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        direction="horizontal"
        cssMode={false}
        className="w-full"
      >
        <SwiperSlide className="w-[100px]">
          {" "}
          {/* スライド幅を固定 */}
          <div className="bg-pink-500 h-[80px] w-[100px] max-w-[100px]"></div>
        </SwiperSlide>
        <SwiperSlide className="w-[100px]">
          <div className="bg-blue-500 h-[80px] w-[100px] max-w-[100px]"></div>
        </SwiperSlide>
        <SwiperSlide className="w-[100px]">
          <div className="bg-green-500 h-[80px] w-[100px] max-w-[100px]"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
