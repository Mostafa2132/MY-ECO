/* eslint-disable react/jsx-no-duplicate-props */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import Loading from "../Loading/Loading";
import useCategory from "../../hooks/useCategory";

export default function CategorySlider() {
  let { data, isLoading, isError } = useCategory();

  return (
    <>
      {isLoading && <Loading />}
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 1200, disableOnInteraction: false }}
          speed={1000}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {data?.data?.data?.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="img h-66 ">
                <img
                  src={category.image}
                  className="w-full h-full object-cover"
                  alt={category.name}
                />
              </div>
              <h3 className="text-center font-semibold  text-sky-600">
                {category.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
    
    </>
  );
}
