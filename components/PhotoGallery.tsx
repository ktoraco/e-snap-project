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
    <div className="max-h-[300px] w-full"> {/* スクロール可能に */}
      <Swiper
        slidesPerView="auto" // 各スライドの幅を自動調整
        spaceBetween={16} // スライド間の余白を16pxに設定
        direction="horizontal"
        cssMode={false}
        className="w-full z-30"
      >
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を120pxに固定 */}
          <div className="bg-pink-500 w-[150px] h-[100px] w-full"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を150pxに固定 */}
          <div className="bg-blue-500 h-[100px] w-full"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を100pxに固定 */}
          <div className="bg-green-500 h-[100px] w-full"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を100pxに固定 */}
          <div className="bg-green-500 h-[100px] w-full"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
