import { BsLaptop } from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { FiMonitor } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import mouse from "../assets/products/mouse.png";
import headphone from "../assets/products/headphone.png";
import earbuds from "../assets/products/earbuds.png";
import mechanicalKeyboard from "../assets/products/mechanicalKeyboard.png";
import { useState } from "react";
import Sort from "../components/Sort";
import { useColorMode } from "@chakra-ui/react";

const Products = () => {
  const { colorMode } = useColorMode();

  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>("all");
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
  }

  return (
    <div className="mt-16">
      <div className="mb-6 flex flex-col md:items-center">
        <h3 className="mb-3 text-center font-bold md:mb-6 md:text-2xl">
          دسته‌بندی‌ها
        </h3>
        <div className="flex flex-wrap justify-center">
          <div
            className={`mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg px-2 py-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:px-6 md:py-4 ${
              colorMode === "dark" ? "bg-[#1E293B]" : "bg-white"
            }`}
          >
            <BsLaptop className="text-4xl" />
            <h4 className="text-center text-[12px] font-bold md:pt-3 md:text-base">
              لپ تاپ و لوازم جانبی
            </h4>
          </div>
          <div
            className={`mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg px-2 py-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:px-6 md:py-4 ${
              colorMode === "dark" ? "bg-[#1E293B]" : "bg-white"
            }`}
          >
            <ImMobile className="text-4xl" />
            <h4 className="text-center text-[12px] font-bold md:pt-3 md:text-base">
              گوشی موبایل و لوازم جانبی
            </h4>
          </div>
          <div
            className={`mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg px-2 py-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:px-6 md:py-4 ${
              colorMode === "dark" ? "bg-[#1E293B]" : "bg-white"
            }`}
          >
            <FiMonitor className="text-4xl" />
            <h4 className="text-center text-[12px] font-bold md:pt-3 md:text-base">
              کامپیوتر و لوازم جانبی
            </h4>
          </div>
          <div
            className={`mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg px-2 py-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:px-6 md:py-4 ${
              colorMode === "dark" ? "bg-[#1E293B]" : "bg-white"
            }`}
          >
            <FaHeadphonesAlt className="text-4xl" />
            <h4 className="text-center text-[12px] font-bold md:pt-3 md:text-base">
              موارد دیگر
            </h4>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full px-16 xl:max-w-[2100px]">
        <div>
          <Sort
            selectedBtn={selectedRadioBtn}
            onChangeSelectedBtn={onChangeHandler}
          />
          <div className="grid grid-cols-6 gap-4 md:grid-cols-12 md:gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
