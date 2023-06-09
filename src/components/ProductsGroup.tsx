import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, HStack, useColorMode } from "@chakra-ui/react";
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
import { MdOutlineToys } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { Category, Subcategory } from "../entities/ProductsPanel";
import { BASE_URL } from "../constants";

interface MyError extends Error {
  message: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(BASE_URL + "/categories");
  const data = await response.json();
  return data.data.categories;
}

async function fetchSubcategories(): Promise<Subcategory[]> {
  const response = await fetch(BASE_URL + "/subcategories?limit=all");
  const data = await response.json();
  return data.data.subcategories;
}

const ProductsGroup: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showChild, setShowChild] = useState(false);

  const toggleChild = () => {
    setShowChild((prevState) => !prevState);
  };

  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<Category[], MyError>(["categories"], fetchCategories);

  const {
    isLoading: subcategoriesLoading,
    error: subcategoriesError,
    data: subcategoriesData,
  } = useQuery<Subcategory[], MyError>(["subcategories"], fetchSubcategories);

  if (categoriesLoading || subcategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || subcategoriesError) {
    return (
      <div>
        Error: {categoriesError?.message || subcategoriesError?.message}
      </div>
    );
  }

  const getCategorySubcategories = (categoryId: string) => {
    return subcategoriesData?.filter(
      (subcategory) => subcategory.category === categoryId
    );
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
            <Flex justify={"space-between"} height="100%">
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
                  <div className="mb-8 flex items-center gap-x-4 hover:text-[#b4184f]">
                    <span>دیدن تمامی محصولات این دسته</span>
                    <BiChevronLeft />
                  </div>
                </Link>
                <Flex gap="4rem">
                  {categoriesData?.map((category) => (
                    <ul key={category._id}>
                      <li
                        className="flex flex-col gap-4"
                        style={{ alignItems: "flex-start" }}
                        key={category._id}
                      >
                        <Flex direction="column" gap="12px" width="100%">
                          <Link
                            to={`https://ahsn-online-store.vercel.app/products?category=${category._id}`}
                          >
                            <span className="goodsSpan hover:text-[#b4184f]">
                              {category.name}
                            </span>
                          </Link>
                        </Flex>
                        <ul className="flex flex-col gap-y-4">
                          {getCategorySubcategories(category._id)?.map(
                            (subcategory) => (
                              <li
                                key={subcategory._id}
                                className="flex flex-col items-start hover:text-[#b4184f]"
                              >
                                <Link
                                  to={`https://ahsn-online-store.vercel.app/products?category=${category._id}&subcategory=${subcategory._id}`}
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    </ul>
                  ))}
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
