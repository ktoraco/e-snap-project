import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PlaceholderSwiper = () => {
  return (
    <Swiper spaceBetween={10} slidesPerView={3}>
      {[...Array(5)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-48 bg-red-300 flex items-center justify-center">
            Placeholder {index + 1}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlaceholderSwiper;
