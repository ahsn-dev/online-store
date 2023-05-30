import ProductCard from "./ProductCard";
import mouse from "../assets/products/mouse.png";
import headphone from "../assets/products/headphone.png";
import earbuds from "../assets/products/earbuds.png";
import mechanicalKeyboard from "../assets/products/mechanicalKeyboard.png";
import surfacePro from "../assets/products/surfacePro.png";
import tablet from "../assets/products/tablet.png";
import ipad from "../assets/products/ipad.png";
import speaker from "../assets/products/speaker.png";

const LatestProducts = () => {
  return (
    <div className="mx-auto my-4 flex flex-col md:my-8 xl:max-w-[2130px]">
      <h2 className="mx-auto my-4 text-3xl font-bold md:my-8 lg:mt-10">
        جدیدترین کالا‌ها
      </h2>
      <div className="grid grid-cols-6 gap-4 pl-6 md:grid-cols-12 md:gap-2">
        <ProductCard
          image={mouse}
          name="Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse"
          price="۳٬۴۴۷٬۰۰۰"
        />
        <ProductCard
          image={headphone}
          name="Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones - Midnight Black"
          price="۱۲٬۹۲۶٬۰۰۰"
        />
        <ProductCard
          image={earbuds}
          name="Beats By Dr. Dre Flex In-Ear Bluetooth Headphones"
          price="۳٬۰۱۶٬۰۰۰"
        />
        <ProductCard
          image={mechanicalKeyboard}
          name="SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English"
          price="۱۰٬۲۸۳٬۰۰۰"
        />
        <ProductCard
          image={surfacePro}
          name="Microsoft Surface Pro 8 13inch 256GB Windows 11 Tablet w/ Intel i5/8GB RAM -Graphite -Exclusive Retail Partner"
          price="۵۵٬۷۰۰٬۰۰۰"
        />
        <ProductCard
          image={tablet}
          name="Samsung Galaxy Tab S6 Lite 10.4inch 64GB Android Tablet with Exynos 9611 8-Core Processor - Oxford Grey"
          price="۱۴٬۱۳۹٬۰۰۰"
        />
        <ProductCard
          image={ipad}
          name="Apple iPad 10.2inch 64GB with Wi-Fi (9th Generation) - Space Grey"
          price="۱۸٬۴۲۴٬۰۰۰"
        />
        <ProductCard
          image={speaker}
          name="JBL Charge 5 Waterproof Bluetooth Wireless Speaker - Blue"
          price="۱۰٬۲۸۳٬۰۰۰"
        />
      </div>
    </div>
  );
};

export default LatestProducts;
