import { Box, Flex, HStack, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import {
  BsBook,
  BsHeartPulse,
  BsLaptop,
  BsList,
  BsPercent,
} from "react-icons/bs";
import { RiFireLine } from "react-icons/ri";
import { BiChevronLeft, BiHome } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineToys } from "react-icons/md";
import { CgGym } from "react-icons/cg";

const ProductsGroup = () => {
  const { colorMode } = useColorMode();
  const [showChild, setShowChild] = useState(false);

  const toggleChild = () => {
    setShowChild((prevState) => !prevState);
  };

  return (
    <HStack
      gap={4}
      padding={4}
      paddingTop={0}
      display={{ base: "none", md: "flex" }}
      backgroundColor={colorMode === "dark" ? "#0f172a" : "#f3f4f5"}
    >
      <Flex
        align="center"
        gap={1}
        fontWeight={"bold"}
        cursor="pointer"
        position="relative"
        onMouseOver={toggleChild}
        className="z-50"
      >
        <BsList className="text-2xl" />
        <span>دسته بندی کالاها</span>
        {showChild && (
          <Box
            className={`fade absolute top-8 h-[430px] w-[1374px] rounded-bl rounded-br ${
              colorMode === "dark"
                ? "bg-[#1E293B] text-white"
                : "bg-[white] text-slate-700"
            }`}
            onMouseOver={toggleChild}
            onMouseLeave={toggleChild}
          >
            <Flex justify={"space-between"}>
              <ul
                className={`flex flex-col justify-between gap-y-6 border-l-2 ${
                  colorMode === "dark" ? "border-l-white" : "border-l-gray-400"
                } p-4`}
              >
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <BsLaptop className="text-2xl" />
                    <span>کالای دیجیتال</span>
                  </Flex>
                  <BiChevronLeft />
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <IoShirtOutline className="text-2xl" />
                    <span>پوشاک</span>
                  </Flex>
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <MdOutlineToys className="text-2xl" />
                    <span>اسباب بازی، کودک و نوزاد</span>
                  </Flex>
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <BsHeartPulse className="text-2xl" />
                    <span>آرایشی و بهداشتی</span>
                  </Flex>
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <BiHome className="text-2xl" />
                    <span>لوازم خانه و آشپزخانه</span>
                  </Flex>
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <CgGym className="text-2xl" />
                    <span>ورزش و سفر</span>
                  </Flex>
                </li>
                <li className="goodsList">
                  <Flex align={"center"} gap={4}>
                    <BsBook className="text-2xl" />
                    <span>کتاب، لوازم‌التحریر و هنر</span>
                  </Flex>
                </li>
              </ul>
              <div className="w-full px-8 py-4">
                <Link to="/products">
                  <div className="hoverTextColor mb-8 flex items-center gap-x-4">
                    <span>دیدن تمامی محصولات این دسته</span>
                    <BiChevronLeft />
                  </div>
                </Link>
                <Flex>
                  <Flex direction="column" gap="12px" width="100%">
                    <span className="goodsSpan hoverTextColor">
                      لپتاپ و لوازم جانبی
                    </span>
                    <ul className="laptopList flex flex-col gap-y-4">
                      <li>اپل</li>
                      <li>ایسوس</li>
                      <li>لنوو</li>
                      <li>دل</li>
                      <li>ام اس آی</li>
                      <li>ایسر</li>
                      <li>اچ پی</li>
                      <li>سونی</li>
                    </ul>
                  </Flex>
                  <Flex direction="column" gap="12px" width="100%">
                    <span className="goodsSpan hoverTextColor">
                      موبایل و لوازم جانبی
                    </span>
                    <ul className="mobileList flex flex-col gap-y-4">
                      <li>اپل</li>
                      <li>سامسونگ</li>
                      <li>شیائومی</li>
                      <li>نوکیا</li>
                      <li>سونی</li>
                      <li>بلک بری</li>
                    </ul>
                  </Flex>
                  <Flex direction="column" gap="12px" width="100%">
                    <span className="goodsSpan hoverTextColor">
                      کامپیوتر و لوازم جانبی
                    </span>
                    <ul className="mobileList flex flex-col gap-y-4">
                      <li>مانیتور</li>
                      <li>ماوس</li>
                      <li>کیبورد</li>
                      <li>هارد، فلش و SSD</li>
                    </ul>
                  </Flex>
                  <Flex direction="column" gap="12px" width="100%">
                    <span className="goodsSpan hoverTextColor">موارد دیگر</span>
                    <ul className="mobileList flex flex-col gap-y-4">
                      <li>تبلت</li>
                      <li>پاوربانک</li>
                      <li>اسپیکر بلوتوث و با سیم</li>
                      <li>هدفون، هدست و هندزفری</li>
                    </ul>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Box>
        )}
      </Flex>
      <Link to="/discounts">
        <Flex
          align="center"
          gap={1}
          fontWeight={"bold"}
          borderRightWidth={2}
          borderRightColor={colorMode === "dark" ? "white" : "gray.400"}
        >
          <BsPercent className="mr-4 text-xl" />
          <span>پیشنهادات و تخفیف‌های ویژه</span>
        </Flex>
      </Link>
      <Link to="/bestSeller">
        <Flex align="center" gap={1} fontWeight={"bold"}>
          <RiFireLine className="text-xl" />
          <span>پرفروش‌ترین‌ها</span>
        </Flex>
      </Link>
    </HStack>
  );
};

export default ProductsGroup;
