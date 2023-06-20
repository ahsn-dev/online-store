import { TbHeartFilled, TbHeartPlus, TbShare } from "react-icons/tb";
import { Image } from "@chakra-ui/react";
import { BsCartPlus, BsPlus } from "react-icons/bs";
import Info from "../components/Info";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../utils/formatPrice";
import { BiMinus, BiTrash } from "react-icons/bi";
import useCartStore, { CartItem } from "../store";

const ProductPage = () => {
  const [like, setLike] = useState(false);
  const [response, setResponse] = useState({});
  const [counter, setCounter] = useState(0);

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  const toggleLike = () => {
    setLike((prevState) => !prevState);
  };

  const location = useLocation();
  const productIdPath = location.pathname.split("/")[2];

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/${productIdPath}`
      );
      setResponse(response.data.data.product);
      return response.data.data.product;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    setCounter((prev) => prev + 1);
    const item: CartItem = {
      id: response._id,
      name: response.name,
      image: `http://localhost:8000/images/${response.images[0]}`,
      price: response.price,
      // quantity: 1,
    };
    addToCart(item);
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", productIdPath], fetchProduct);

  const pageTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pageTopRef?.current?.scrollIntoView();
  }, []);

  const checkExist = () => {
    cartItems.map((item) => {
      if (item.id === response._id) {
        setCounter(item.quantity);
      }
    });
  };

  useEffect(() => {
    checkExist();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    const errorMessage = (error as Error).message;
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <>
      <main className="flex-grow md:mt-10" ref={pageTopRef}>
        <div className="flex flex-col">
          <div className="mx-auto w-full xl:max-w-[2100px]">
            <div className="relative mb-32 mt-8 flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap md:items-start">
              <div className="md:w-auto">
                <div className="mr-16 flex flex-col md:static">
                  <div
                    onClick={toggleLike}
                    className="px-2 py-3 transition-colors hover:text-rose-600 md:px-6"
                  >
                    {like ? (
                      <TbHeartFilled className="text-2xl text-rose-600" />
                    ) : (
                      <TbHeartPlus className="text-2xl" />
                    )}
                  </div>
                  <div className="px-2 py-3 transition-colors hover:text-rose-600 md:px-6">
                    <TbShare className="text-2xl" />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center md:w-auto">
                  <div className="flex flex-grow md:ml-3">
                    <span className="inline-block max-w-full overflow-hidden">
                      <Image
                        src={`http://localhost:8000/images/${product.images[0]}`}
                        className="absolute inset-0 right-32 top-12 h-80 w-80 max-w-full object-contain md:drop-shadow-xl"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-palette-card z-10 mt-8 flex w-[100vw] flex-grow flex-col self-center rounded-tl-[4rem] rounded-tr-[3rem] px-5 py-5 md:mt-0 md:w-auto md:bg-transparent md:py-0 lg:self-start lg:ltr:ml-4 lg:rtl:mr-4">
                <h2 className="text-palette-mute whitespace-normal text-center text-xl font-bold ltr:md:text-left rtl:md:text-right">
                  {product.name}
                </h2>
                <hr className="mt-1 hidden md:block" />
                <div className="relative flex flex-wrap items-start">
                  <div className="mr-80 mt-8 w-1/3">
                    <h2 className="pb-2 text-lg font-bold">توضیحات:</h2>
                    <span>{product.description}</span>
                  </div>
                  <div className="sticky top-10 mt-8 flex max-w-[350px] flex-grow flex-col items-center border-2 px-6 py-4 shadow-lg ltr:ml-auto rtl:mr-auto sm:p-4 md:top-36 xl:p-6 xl:rtl:ml-2">
                    <div className="flex w-full flex-col ">
                      <p className="text-lg">قیمت محصول</p>
                      <div className="mt-2 flex text-left ltr:self-start rtl:justify-end rtl:self-end">
                        <div className="flex flex-row-reverse items-center text-xl font-bold no-underline md:text-3xl">
                          <sup className="mr-1 rtl:block"></sup>
                          <span>{formatPrice(+product.price)}</span>
                          <sub className="ml-1 text-[10px]">تومان</sub>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-6 flex cursor-pointer items-center justify-between">
                      <div className="p-2">
                        <AiOutlinePlus className="text-2xl" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="mx-1 inline-block w-[70px] border-[1px] border-gray-400 py-2 ltr:pl-7 rtl:pr-8 sm:mx-4"
                      />
                      <div className="p-2">
                        <AiOutlineMinus className="text-2xl" />
                      </div>
                    </div> */}
                    <div
                      className={`my-2 flex-grow sm:my-0 ${
                        counter > 0 ? "flex" : "hidden"
                      }`}
                    >
                      <div className="flex cursor-pointer items-center justify-start lg:justify-center">
                        <div className="p-2" onClick={handleAddToCart}>
                          <BsPlus className="text-xl" />
                        </div>
                        <input
                          type="number"
                          className="mx-1 inline-block w-[65px] border border-gray-400 py-2 pr-7"
                          min="0"
                          max="10"
                          value={counter}
                        />
                        <div className="p-2">
                          {counter === 1 ? (
                            <BiTrash
                              className="text-xl text-[#A71B4A]"
                              onClick={() => handleRemoveFromCart(product.id)}
                            />
                          ) : (
                            <BiMinus
                              className="text-xl"
                              onClick={() => handleRemoveFromCart(product.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                    <button
                      onClick={handleAddToCart}
                      className={`text-palette-side flex cursor-pointer items-center gap-x-2 rounded-lg border-none bg-[#A71B4A]/90 px-3 py-4 text-[12px] text-white shadow-lg transition-colors duration-200 hover:bg-[#A71B4A]/100 sm:text-base lg:px-8 ${
                        counter === 0 ? "block" : "hidden"
                      }`}
                    >
                      <BsCartPlus className="text-2xl text-white" />
                      اضافه به سبد خرید
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-[80%] border-2 py-8">
              <Info />
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
