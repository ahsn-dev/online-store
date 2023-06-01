import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import beautyBanner from "../assets/sliderImages/beautyBanner.webp";
import digitalBanner from "../assets/sliderImages/digitalBanner.webp";
import fashionBanner from "../assets/sliderImages/fashionBanner.webp";
import houseBanner from "../assets/sliderImages/houseBanner.webp";
import stationeryBanner from "../assets/sliderImages/stationeryBanner.webp";
import toyBanner from "../assets/sliderImages/toyBanner.webp";
import { Image } from "@chakra-ui/react";
import "../index.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Slider = () => {
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2800}
        centerMode={false}
        className="sm z-10 mb-20 mr-32 w-[1024px] pt-8 lg:mx-auto lg:w-[1300px]"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={true}
        shouldResetAutoplay
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <div>
          <Image src={digitalBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              درک بهترین تجربه
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              ما بهترین تجربه را با محبوب ترین برندها ارائه می دهیم. با گارانتی
              18 ماهه می توانید از انتخاب خود مطمئن باشید.
            </p>
          </div>
        </div>
        <div className="relative">
          <Image src={beautyBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              مرغوبترین و مطرح‌ترین برندها
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              بدون آلرژی، افراد با انواع پوست می توانند محصولات مورد نیاز خود را
              پیدا کنند. تایید شده توسط سازمان بهداشت جهانی، محصولاتی از برندهای
              معتبر جهانی
            </p>
          </div>
        </div>
        <div>
          <Image src={fashionBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              زیبایی و راحتی
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              بهترین پارچه‌ها، بروزترین طرح‌ها و محبوب‌ترین برندها را با
              قیمت‌های مناسب پیدا خواهید کرد. بهترین ظاهر خود را داشته باشید و
              در میان جمعیت متمایز شوید.
            </p>
          </div>
        </div>
        <div>
          <Image src={houseBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              خانۀ مدرن
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              با محصولاتی که بر اساس جدیدترین و برجسته‌ترین سبک‌ها طراحی
              شده‌اند، از لحظات زیبای رضایت و آرامش در کنار عزیزان خود در خانه
              لذت ببرید.
            </p>
          </div>
        </div>
        <div>
          <Image src={stationeryBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              تنوع در انتخاب
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              وقتی صحبت از زیبایی و کارایی می‌شود. ارائه زیباترین و مرغوب‌ترین
              لوازم تحریر و ست‌های اداری، با قیمت مناسب.
            </p>
          </div>
        </div>
        <div>
          <Image src={toyBanner} width="100%" height="550px" />
          <div className="absolute right-[25%] top-[45%] h-48 w-[50%] rounded-md bg-[#1e293b] p-8 opacity-90 shadow-lg">
            <h3 className="text-right text-lg font-bold text-white md:text-2xl lg:text-3xl">
              سرگرمی و رشد خلاقیت
            </h3>
            <p className="mt-2 text-right text-[13px] text-white md:mt-4 md:text-lg lg:mt-8">
              بهترین اسباب‌بازی‌ها برای سرگرمی و رشد خلاقیت، محصولاتی با بهترین
              کیفیت و ضد حساسیت برای خلق لحظات شاد
            </p>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
