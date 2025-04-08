import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

type PhotoGalleryProps = {
  photos: string[];
  onPhotoSelect: (photoUrl: string) => void;
};

const PhotoGallery: FC = () => {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto" // スライド幅を自動調整
        spaceBetween={16} // スライド間の余白を16pxに設定
        direction="horizontal"
        cssMode={false}
        className="w-full z-30"
        grid={{
          rows: 2, // 縦に2行表示
        }}
      >
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を150pxに固定 */}
          <div className="bg-pink-500 w-[150px] h-[100px]"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を150pxに固定 */}
          <div className="bg-blue-500 w-[150px] h-[100px]"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を150pxに固定 */}
          <div className="bg-green-500 w-[150px] h-[100px]"></div>
        </SwiperSlide>
        <SwiperSlide style={{ width: "150px" }}> {/* スライド幅を150pxに固定 */}
          <div className="bg-orange-500 w-[150px] h-[100px]"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
