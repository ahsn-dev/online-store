import { Button, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import mouse from "../assets/products/mouse.png";
import { BsPlus } from "react-icons/bs";
import { BiMinus, BiTrash } from "react-icons/bi";
import { FcShop } from "react-icons/fc";
import { useState } from "react";

const Cart = () => {
  const { colorMode } = useColorMode();

  const [value, setValue] = useState(1);
  const handleInputChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div className="mt-12">
      <div className="mr-24 flex items-center gap-x-2">
        <FcShop className="text-4xl" />
        <h1 className="text-2xl font-bold">سبد خرید</h1>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-[2100px] flex-col items-start justify-center md:flex-row">
        <div>
          <div className="mx-auto w-full xl:max-w-[2100px]">
            <div className="flex flex-wrap items-center border-b-2 px-2 sm:my-4 sm:py-4">
              <div className="sm:min-w-[290px] lg:w-1/2">
                <Link
                  to="/"
                  className="flex flex-grow flex-wrap items-center justify-center sm:flex-nowrap"
                >
                  {/* <div className="sm:min-w-[100px] md:min-w-[130px]">
                    <span className="relative m-0 box-border inline-block h-auto w-auto max-w-full overflow-hidden border-0 bg-none p-0 opacity-100">
                      <Image
                        src={mouse}
                        className="absolute inset-0 m-auto box-border block h-0 max-h-full min-h-full w-0 min-w-full max-w-full border-0 object-contain p-0"
                      />
                    </span>
                  </div> */}
                  <div>
                    <Image src={mouse} width={200} />
                  </div>
                  <div className="mx-2 mb-2 w-full flex-grow text-left text-sm font-normal sm:mb-0">
                    Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse
                  </div>
                </Link>
              </div>
              <div className="mb-4 flex flex-grow flex-wrap sm:mb-0 md:items-center">
                <div className="my-2 flex-grow sm:my-0">
                  <div className="flex cursor-pointer items-center justify-start lg:justify-center">
                    <div onClick={() => setValue(value + 1)} className="p-2">
                      <BsPlus className="text-xl" />
                    </div>
                    <input
                      type="number"
                      className="mx-1 inline-block w-[65px] border border-gray-400 py-2 pr-7"
                      min="0"
                      max="10"
                      value={value}
                      onChange={handleInputChange}
                    />
                    <div className="p-2">
                      {value === 1 ? (
                        <BiTrash className="text-xl text-[#A71B4A]" />
                      ) : (
                        <BiMinus
                          className="text-xl"
                          onClick={() => setValue(value - 1)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mr-1 flex flex-grow flex-col font-normal">
                  <p>قیمت کل</p>
                  <div>
                    <div className="ustify-end mt-2 flex self-end text-left">
                      <div>
                        <div className="text-md flex flex-row-reverse items-center font-bold no-underline md:text-lg">
                          <sup className="mr-1 block"></sup>
                          <span>۳٬۴۴۷٬۰۰۰</span>
                          <sub className="ml-1 text-[10px]">تومان</sub>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sticky bottom-0 left-0 right-0 -mx-[1rem] mt-2 w-[100vw] flex-grow rounded-lg border-2  px-4 py-4 shadow-lg md:top-36 md:mx-4 md:w-auto md:min-w-[300px] md:max-w-[400px] xl:mx-8 xl:px-8 xl:py-12 ${
            colorMode === "dark"
              ? "border-white bg-[#1E293B]"
              : "border-gray-400 bg-white"
          }`}
        >
          <h3
            className={`text-md font-bold sm:text-lg md:text-xl ${
              colorMode === "dark" ? "text-white" : "text-[#424750]"
            }`}
          >
            خلاصه سفارش
          </h3>
          <div className="my-1 flex flex-col sm:my-2">
            <div className="flex items-center justify-between md:my-4">
              <p
                className={`text-sm font-bold  sm:text-base ${
                  colorMode === "dark"
                    ? "text-white"
                    : "text-[#6b7280] md:text-[#424750]"
                }`}
              >
                تعداد کل کالا‌ها
              </p>
              <p className="ml-1 font-bold">۱</p>
            </div>
            <div className="flex flex-grow flex-wrap items-baseline justify-between md:my-4">
              <p
                className={`text-sm font-bold sm:text-base ${
                  colorMode === "dark"
                    ? "text-white"
                    : "text-[#6b7280] md:text-[#424750]"
                }`}
              >
                قیمت کل
              </p>
              <div>
                <div className="mt-2 flex justify-end self-end text-left">
                  <div>
                    <div className="text-md flex flex-row-reverse items-center font-bold no-underline md:text-lg">
                      <sup className="mr-1 rtl:block"></sup>
                      <span className="font-bold">۳٬۴۴۷٬۰۰۰</span>
                      <sub className="ml-1 text-[10px]">تومان</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/">
            <Button
              style={{ backgroundColor: "#A71B4A" }}
              className="mx-auto block w-full rounded-lg py-3 text-center text-white shadow-lg md:mt-8"
            >
              ثبت سفارش
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
