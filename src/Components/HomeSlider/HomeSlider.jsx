import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
<div className="grid grid-cols-1 lg:grid-cols-12 mt-14">
  {/* السلايدر الرئيسي */}
  <div className="sm:col-span-12 lg:col-span-8 h-full">
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 1200, disableOnInteraction: false }}
      loop={true}
      speed={1000}
      className="h-full w-full"
    >
      <SwiperSlide className="h-full w-full">
        <img
          src={sliderImg1}
          className="w-full h-full object-cover"
          alt="Slider 1"
        />
      </SwiperSlide>

      <SwiperSlide className="h-full">
        <img
          src={sliderImg2}
          className="w-full h-full object-cover"
          alt="Slider 2"
        />
      </SwiperSlide>

      <SwiperSlide className="h-full">
        <img
          src={sliderImg3}
          className="w-full h-full object-cover"
          alt="Slider 3"
        />
      </SwiperSlide>
    </Swiper>
  </div>

  {/* الصور الجانبية */}
<div className="col sm:col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col  lg:space-x-0 lg:mt-0">
  <img
    src={sliderImg2}
    className="lg:w-full  sm:w-1/2 h-full object-cover  sm:mb-0"
    alt="Image 2"
  />
  <img
    src={sliderImg3}
    className="lg:w-full sm:w-1/2 h-64 object-cover"
    alt="Image 3"
  />
</div>

</div>



    </>
  );
}
