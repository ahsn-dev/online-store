import { TbHeartFilled, TbHeartPlus, TbShare } from "react-icons/tb";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Image } from "@chakra-ui/react";
import mouse from "../assets/products/mouse.png";
import { BsCartPlus } from "react-icons/bs";
import Info from "../components/Info";
import { useState } from "react";
const ProductPage = () => {
  const [like, setLike] = useState(false);
  const [value, setValue] = useState(1);

  const toggleLike = () => {
    setLike((prevState) => !prevState);
  };

  const handleInputChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <main className="flex-grow md:mt-10">
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
                        src={mouse}
                        className="absolute inset-0 right-32 top-12 h-80 max-w-full object-contain md:drop-shadow-xl"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-palette-card z-10 mt-8 flex w-[100vw] flex-grow flex-col self-center rounded-tl-[4rem] rounded-tr-[3rem] px-5 py-5 md:mt-0 md:w-auto md:bg-transparent md:py-0 lg:self-start lg:ltr:ml-4 lg:rtl:mr-4">
                <h2 className="text-palette-mute whitespace-normal text-center ltr:md:text-left rtl:md:text-right">
                  Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse
                </h2>
                <hr className="mt-1 hidden md:block" />
                <div className="relative flex flex-wrap items-start">
                  <div className="mr-80 mt-8 w-1/3">
                    <h2 className="pb-2 text-lg font-bold">توضیحات:</h2>
                    <span>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می
                      طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                      ایجاد کرد.
                    </span>
                  </div>
                  <div className="sticky top-10 mt-8 flex max-w-[350px] flex-grow flex-col items-center border-2 px-6 py-4 shadow-lg ltr:ml-auto rtl:mr-auto sm:p-4 md:top-36 xl:p-6 xl:rtl:ml-2">
                    <div className="flex w-full flex-col ">
                      <p className="text-lg">قیمت محصول</p>
                      <div className="mt-2 flex text-left ltr:self-start rtl:justify-end rtl:self-end">
                        <div className="flex flex-row-reverse items-center text-xl font-bold no-underline md:text-3xl">
                          <sup className="mr-1 rtl:block"></sup>
                          <span>۳٬۴۴۷٬۰۰۰</span>
                          <sub className="ml-1 text-[10px]">تومان</sub>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex cursor-pointer items-center justify-between">
                      <div onClick={() => setValue(value + 1)} className="p-2">
                        <AiOutlinePlus className="text-2xl" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="mx-1 inline-block w-[70px] border-[1px] border-gray-400 py-2 ltr:pl-7 rtl:pr-8 sm:mx-4"
                        value={value}
                        onChange={handleInputChange}
                      />
                      <div className="p-2">
                        <AiOutlineMinus
                          className="text-2xl"
                          onClick={() =>
                            setValue(value > 1 ? value - 1 : value)
                          }
                        />
                      </div>
                    </div>
                    <br />
                    <button className="text-palette-side flex cursor-pointer items-center gap-x-2 rounded-lg border-none bg-[#A71B4A]/90 px-3 py-4 text-[12px] text-white shadow-lg transition-colors duration-200 hover:bg-[#A71B4A]/100 sm:text-base lg:px-8">
                      <BsCartPlus className="text-white" />
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
