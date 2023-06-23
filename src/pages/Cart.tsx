import { Button, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiMinus, BiTrash } from "react-icons/bi";
import { FcShop } from "react-icons/fc";
import useCartStore, { CartItem } from "../store";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const { colorMode } = useColorMode();

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <div className="mt-10">
      <div className="mr-8 flex items-center gap-x-2">
        <FcShop className="text-5xl" />
        <h1 className="text-3xl font-bold">سبد خرید</h1>
      </div>
      <div className="relative mx-auto mt-16 flex max-w-[2100px] flex-col items-start justify-center p-4 md:flex-row">
        <div>
          <div className="mx-auto w-full xl:max-w-[2100px]">
            {cartItems?.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center border-b-2 px-2 sm:my-4 sm:py-4"
              >
                <div className="sm:min-w-[290px] lg:w-1/2">
                  <Link
                    to={`/productPage/${item.id}`}
                    className="flex flex-grow flex-wrap items-center justify-center sm:flex-nowrap"
                  >
                    <div>
                      <Image src={item.image} width={200} />
                    </div>
                    <div className="mx-2 mb-2 w-full flex-grow text-left text-sm font-normal sm:mb-0">
                      {item.name}
                    </div>
                  </Link>
                </div>
                <div className="mb-4 flex flex-grow flex-wrap sm:mb-0 md:items-center">
                  <div className="my-2 flex-grow sm:my-0">
                    <div className="flex cursor-pointer items-center justify-start lg:justify-center">
                      <div
                        className="p-2"
                        onClick={() => handleAddToCart(item)}
                      >
                        <BsPlus className="text-xl" />
                      </div>
                      <input
                        type="number"
                        className="mx-1 inline-block w-[65px] border border-gray-400 py-2 pr-7"
                        min="0"
                        max="10"
                        value={item.quantity}
                        readOnly
                      />
                      <div className="p-2">
                        {item.quantity === 1 ? (
                          <BiTrash
                            className="text-xl text-[#A71B4A]"
                            onClick={() => handleRemoveFromCart(item.id)}
                          />
                        ) : (
                          <BiMinus
                            className="text-xl"
                            onClick={() => handleRemoveFromCart(item.id)}
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
                            <sub className="mr-2 text-sm">تومان</sub>
                            <span className="mt-2">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                className={`text-sm font-bold sm:text-base ${
                  colorMode === "dark"
                    ? "text-white"
                    : "text-[#6b7280] md:text-[#424750]"
                }`}
              >
                تعداد کل کالا‌ها
              </p>
              <p className="ml-1 font-bold">{cartItems?.length}</p>
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
                    <div className="text-md flex flex-row-reverse items-start font-bold no-underline md:text-lg">
                      <sup className="mr-1 rtl:block"></sup>
                      <sub className="mr-2 text-sm">تومان</sub>
                      <span className="font-bold">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/finalizePurchase">
            <Button
              style={{ backgroundColor: "#A71B4A", color: "white" }}
              className="mx-auto mt-4 block w-full"
            >
              نهایی کردن سفارش
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
