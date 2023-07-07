import { Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  TbHeartFilled,
  TbHeartPlus,
  TbShare,
  TbShoppingCart,
} from "react-icons/tb";
import { useState } from "react";
import { formatPriceFa } from "../utils/formatPrice";
import { Product } from "../entities/Product";
import useCartStore, { CartItem } from "../store";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ResponseData } from "../entities/ResponseData";
import { BASE_URL, IMAGE_URL } from "../constants";

const ProductCard = ({ image, name, price, productId }: Product) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const cartItemQuantity = cartItems.find(
    (item: CartItem) => item.id === productId
  );

  const initial = cartItemQuantity?.quantity || 0;
  const [counter, setCounter] = useState(initial);

  const [response, setResponse] = useState<ResponseData>({
    _id: "",
    name: "",
    images: [],
    price: 0,
    quantity: 0,
  });

  const { colorMode } = useColorMode();

  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prevState) => !prevState);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(BASE_URL + `/products/${productId}`);
      setResponse(response.data.data.product);
      return response.data.data.product;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    if (counter < product.quantity) {
      setCounter((prev) => prev + 1);
      const item: CartItem = {
        id: response._id,
        name: response.name,
        image: IMAGE_URL + `/${response.images[0]}`,
        price: response.price,
        quantity: counter,
      };
      addToCart(item);
      toast("🛍️ محصول با موفقیت به سبد خرید اضافه شد", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: `${colorMode === "dark" ? "dark" : "light"}`,
      });
    } else {
      toast(
        `${
          product.quantity > 0
            ? `از این محصول فقط ${product.quantity} عدد در انبار موجود است`
            : "در حال حاضر، این کالا موجود نیست"
        }`,
        {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: `${colorMode === "dark" ? "dark" : "light"}`,
        }
      );
    }
  };

  const { data: product } = useQuery(["product", productId], fetchProduct);

  return (
    <div
      className={`relative col-span-6 my-1 flex rounded-xl ${
        colorMode === "dark" ? "bg-[#414E60]" : "bg-[#DDE0EA]"
      }  ml-1 shadow-xl sm:col-span-3 md:col-span-4 md:mx-6 md:my-4 lg:col-span-3 2xl:col-span-2`}
    >
      <Link
        to={`/productPage/${productId}`}
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
                    className={`text-md flex items-center gap-x-1.5 font-bold ${
                      colorMode === "dark" ? "text-[#E2E8F0]" : "text-[#424750]"
                    } no-underline md:text-lg`}
                  >
                    <sup className="mr-1 rtl:block"></sup>
                    <span>{formatPriceFa(+price)}</span>
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
          className="cursor-pointer transition-colors hover:text-rose-600 sm:px-3 md:px-0"
        >
          {like ? (
            <TbHeartFilled className="text-xl text-rose-600" />
          ) : (
            <TbHeartPlus className="text-xl" />
          )}
        </div>
        <div className="cursor-pointer transition-colors hover:text-rose-600 sm:px-3 md:px-0">
          <TbShare className="text-xl" />
        </div>
        <div
          onClick={handleAddToCart}
          className="cursor-pointer transition-colors hover:text-rose-600 sm:px-3 md:px-0"
        >
          <TbShoppingCart className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
