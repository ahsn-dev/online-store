import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import beautyBanner from "../assets/sliderImages/beautyBanner.webp"
import digitalBanner from "../assets/sliderImages/digitalBanner.webp"
import fashionBanner from "../assets/sliderImages/fashionBanner.webp"
import houseBanner from "../assets/sliderImages/houseBanner.webp"
import stationeryBanner from "../assets/sliderImages/stationeryBanner.webp"
import toyBanner from "../assets/sliderImages/toyBanner.webp"
import { Image } from "@chakra-ui/react";
import "../index.css"


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
  }
};



const Slider = () => {
  return (
    <>
    <Carousel
  additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  className="z-10 w-[1300px] pt-8 mx-auto"
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
  <div className="relative">
    <Image src={beautyBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">مرغوبترین و مطرح‌ترین برندها</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">بدون آلرژی، افراد با انواع پوست می توانند محصولات مورد نیاز خود را پیدا کنند. تایید شده توسط سازمان بهداشت جهانی، محصولاتی از برندهای معتبر جهانی</p>
    </div>
  </div>
  <div>
    <Image src={digitalBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">درک بهترین تجربه</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">ما بهترین تجربه را با محبوب ترین برندها ارائه می دهیم. با گارانتی 18 ماهه می توانید از انتخاب خود مطمئن باشید.</p>
    </div>
  </div>
  <div>
    <Image src={fashionBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">زیبایی و راحتی</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">بهترین پارچه‌ها، بروزترین طرح‌ها و محبوب‌ترین برندها را با قیمت‌های مناسب پیدا خواهید کرد. بهترین ظاهر خود را داشته باشید و در میان جمعیت متمایز شوید.</p>
    </div>
  </div>
  <div>
    <Image src={houseBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">خانۀ مدرن</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">با محصولاتی که بر اساس جدیدترین و برجسته‌ترین سبک‌ها طراحی شده‌اند، از لحظات زیبای رضایت و آرامش در کنار عزیزان خود در خانه لذت ببرید.</p>
    </div>
  </div>
  <div>
    <Image src={stationeryBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">تنوع در انتخاب</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">وقتی صحبت از زیبایی و کارایی می‌شود. ارائه زیباترین و مرغوب‌ترین لوازم تحریر و ست‌های اداری، با قیمت مناسب.</p>
    </div>
  </div>
  <div>
    <Image src={toyBanner} width="100%" height="550px" />
    <div className="w-[50%] h-48 rounded-md p-8 shadow-lg absolute right-[25%] top-[45%] bg-[#1e293b] opacity-90">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-right text-white">سرگرمی و رشد خلاقیت</h3>
      <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 text-right text-white">بهترین اسباب‌بازی‌ها برای سرگرمی و رشد خلاقیت، محصولاتی با بهترین کیفیت و ضد حساسیت برای خلق لحظات شاد</p>
    </div>
  </div>
</Carousel>;
    </>
  )
}

export default Slider