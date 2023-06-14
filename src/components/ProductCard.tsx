import { Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  TbHeartFilled,
  TbHeartPlus,
  TbShare,
  TbShoppingCart,
} from "react-icons/tb";
import { useState } from "react";
import { formatPrice } from "../utils/formatPrice";

interface Props {
  image: string;
  name: string;
  price: string;
  ProductId: string;
}

const ProductCard = ({ image, name, price, ProductId }: Props) => {
  const { colorMode } = useColorMode();

  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prevState) => !prevState);
  };

  return (
    <div
      className={`relative col-span-6 my-1 flex rounded-xl ${
        colorMode === "dark" ? "bg-[#414E60]" : "bg-[#DDE0EA]"
      }  ml-1 shadow-xl sm:col-span-3 md:col-span-4 md:mx-6 md:my-4 lg:col-span-3 2xl:col-span-2`}
    >
      <Link
        to={`/productPage/${ProductId}`}
        className="relative flex w-full md:flex-col md:items-center"
      >
        <div className="relative order-2 flex w-1/2 flex-col items-center justify-between rounded-bl-xl rounded-tl-xl bg-slate-400/30 px-1 py-2 md:order-none md:w-full md:rounded-bl-none md:rounded-tr-xl md:px-6">
          <div className="flex h-full items-center">
            <Image
              src={image}
              className="object-contain py-2 drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        </div>
        <div
          className={`flex w-1/2 flex-grow flex-col justify-between rounded-bl-lg rounded-br-lg ${
            colorMode === "dark" ? "bg-[#1E293B]" : "bg-[#FCFBFF]"
          }  px-1 py-2 md:w-full md:px-3 md:py-4`}
        >
          <div className="flex flex-grow flex-col justify-center overflow-hidden md:justify-between">
            <h3
              className={`text-center text-sm font-semibold ${
                colorMode === "dark" ? "text-[#8c9aaf]" : "text-[#6B7280]"
              }  sm:text-[12px] md:text-sm`}
            >
              {name}
            </h3>
            <div>
              <div className="mt-2 flex justify-end self-end text-left">
                <div>
                  <div
                    className={`text-md flex flex-row-reverse items-center font-bold ${
                      colorMode === "dark" ? "text-[#E2E8F0]" : "text-[#424750]"
                    } no-underline md:text-lg`}
                  >
                    <sup className="mr-1 rtl:block"></sup>
                    <span>{formatPrice(+price)}</span>
                    <sub className="ml-1 text-[10px]">تومان</sub>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-palette-card/20 absolute bottom-2 left-0 mt-2 flex w-1/2 justify-around self-center rounded-lg p-2 shadow-lg backdrop-blur-[8px] backdrop-filter md:-left-1 md:-top-2 md:bottom-auto md:h-[130px] md:w-auto md:flex-col md:rounded-full ">
        <div
          onClick={toggleLike}
          className="transition-colors hover:text-rose-600 sm:px-3 md:px-0"
        >
          {like ? (
            <TbHeartFilled className="text-xl text-rose-600" />
          ) : (
            <TbHeartPlus className="text-xl" />
          )}
        </div>
        <div className="transition-colors hover:text-rose-600 sm:px-3 md:px-0">
          <TbShare className="text-xl" />
        </div>
        <div className="transition-colors hover:text-rose-600 sm:px-3 md:px-0">
          <TbShoppingCart className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
