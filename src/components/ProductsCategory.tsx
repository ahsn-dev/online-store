import { Button, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import digitalCategory from "../assets/categoriesImages/digitalCategory.png";
import fashionCategory from "../assets/categoriesImages/fashionCategory.png";
import beautyCategory from "../assets/categoriesImages/beautyCategory.png";
import sportCategory from "../assets/categoriesImages/sportCategory.png";
import houseCategory from "../assets/categoriesImages/houseCategory.png";
import toyCategory from "../assets/categoriesImages/toyCategory.png";
import stationeryCategory from "../assets/categoriesImages/stationeryCategory.png";

const ProductsCategory = () => {
  const { colorMode } = useColorMode();

  return (
    <div className="mt-16 p-16">
      <h2 className="mb-8 text-center text-3xl font-bold">دسته‌بندی کالاها</h2>
      <div className="grid-rows-9 mx-auto hidden w-full grid-cols-2 gap-4 md:grid-cols-9 lg:grid xl:max-w-[2100px]">
        <div
          className={`col-span-3 row-span-6 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#0C4C76]" : "bg-[#ade8f4]"
          }  px-4 py-10 shadow-lg`}
        >
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">محصولات دیجیتال</h3>
            <p className="mt-2 text-sm font-bold">
              بروزترین محصولات با مناسب‌ترین قیمت
            </p>
            <Link to="/products">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 text-sm shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={digitalCategory}
              style={{ width: "100%" }}
              boxSize="220px"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
        <div
          className={`col-span-3 row-span-6 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#882A18]" : "bg-[#ffddd2]"
          }  px-4 py-10 shadow-lg`}
        >
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">مد و پوشاک</h3>
            <p className="mt-2 text-sm font-bold">
              محبوب‌ترین برندها با مناسب‌ترین قیمت
            </p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 text-sm shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={fashionCategory}
              style={{ width: "100%" }}
              boxSize="220px"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
        <div
          className={`col-span-3 row-span-3 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#6C2F5F]" : "bg-[#ddd92a]"
          }  px-4 py-2 shadow-lg`}
        >
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">آرایشی و بهداشتی</h3>
            <p className="mt-2 text-sm font-bold">
              محصولات ضد حساسیت مناسب انواع پوست از برندهای معتبر
            </p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={beautyCategory}
              style={{ width: "100%" }}
              boxSize="100px"
              objectFit="cover"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
        <div
          className={`col-span-3 row-span-3 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#650607]" : "bg-[#ffd60a]"
          }  px-4 py-2 shadow-lg`}
        >
          <div>
            <Image
              src={sportCategory}
              style={{ width: "100%" }}
              boxSize="140px"
              objectFit="cover"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">ورزش و سفر</h3>
            <p className="mt-2 text-sm font-bold">محصولات مرغوب و مقاوم</p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
        </div>
        <div
          className={`col-span-5 row-span-2 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#164C4B]" : "bg-[#ccd5ae]"
          }  px-4 shadow-lg`}
        >
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">خانه و آشپزخانه</h3>
            <p className="mt-2 text-sm font-bold">
              مطابق با طراحی‌های روز دنیا
            </p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={houseCategory}
              style={{ width: "100%" }}
              boxSize="240px"
              objectFit="cover"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
        <div
          className={`col-span-2 row-span-2 flex flex-col items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#6C3D4B]" : "bg-[#cce3de]"
          } px-4 py-2 shadow-lg`}
        >
          <div className="mx-2 flex flex-col items-center">
            <h3 className="text-xl font-bold 2xl:text-2xl">
              اسباب‌بازی، کودک و نوزاد
            </h3>
            <p className="mt-2 text-sm font-bold">
              سرگرمی در کنار پرورش خلاقیت
            </p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={toyCategory}
              style={{ width: "100%" }}
              boxSize="100px"
              objectFit="cover"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
        <div
          className={`col-span-2 row-span-2 flex items-center justify-around overflow-hidden rounded-md ${
            colorMode === "dark" ? "bg-[#694203]" : "bg-[#fbb13c]"
          }  px-4 py-2 shadow-lg`}
        >
          <div className="mx-2">
            <h3 className="text-xl font-bold 2xl:text-2xl">
              کتاب، لوازم تحریر و هنر
            </h3>
            <p className="mt-2 text-sm font-bold">تنوع در انتخاب</p>
            <Link to="/">
              <Button
                fontSize={13}
                className="mt-4 inline-block rounded-lg px-2 py-3 shadow-xl transition-transform duration-300 hover:scale-105"
              >
                دیدن همه محصولات
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={stationeryCategory}
              style={{ width: "100%" }}
              boxSize="180px"
              objectFit="cover"
              className="drop-shadow-lg transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;
