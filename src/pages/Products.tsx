import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { IconType } from "react-icons";
import * as MdIcons from "react-icons/md";
import { Category } from "../entities/ProductsPanel";
import ProductCard from "../components/ProductCard";
import Sort from "../components/Sort";
import { Product } from "../entities/Product";

const Products = () => {
  const { colorMode } = useColorMode();
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>("all");

  const location = useLocation();
  const categoryIdPath =
    location.search.split("category=")[1]?.split("&")[0] || "";

  const fetchProducts = async () => {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("category") || "";
    const subcategoryId = params.get("subcategory") || "";

    if (categoryId !== "") {
      let url = `http://localhost:8000/api/products?category=${categoryId}`;

      if (subcategoryId !== "") {
        url += `&subcategory=${subcategoryId}`;
      }

      url += "&limit=all";

      const response = await axios.get(url);
      return response.data.data.products;
    } else {
      const response = await axios.get(
        "http://localhost:8000/api/products?limit=all"
      );
      return response.data.data.products;
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:8000/api/categories");
    return response.data.data.categories;
  };

  const { data: products, refetch } = useQuery(["products"], fetchProducts);
  const { data: categories } = useQuery(["categories"], fetchCategories);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    refetch();
  });

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
  }

  const getIconComponent = (icon: string): IconType => {
    const IconComponent = MdIcons[icon as keyof typeof MdIcons];
    return IconComponent;
  };

  return (
    <div className="mt-16">
      <div className="mb-24 flex flex-col md:items-center">
        <h3 className="mb-3 text-center font-bold md:mb-6 md:text-2xl">
          دسته‌بندی‌ها
        </h3>
        <div className="flex flex-wrap justify-center">
          {categories?.map((category: Category) => {
            const IconComponent = getIconComponent(category.icon);

            const isActive = category._id === categoryIdPath;
            return (
              <Link
                key={category._id}
                to={`http://localhost:5173/products?category=${category?._id}`}
              >
                <div
                  className={`mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg px-2 py-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:px-6 md:py-4 ${
                    colorMode === "dark" ? "bg-[#1E293B]" : "bg-white"
                  } ${isActive && "bg-gray-600"}`}
                  onClick={() => {
                    refetch();
                  }}
                >
                  <div className="text-4xl">
                    <IconComponent />
                  </div>
                  <h4 className="text-center text-[12px] font-bold md:pt-3 md:text-base">
                    {category?.name}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mx-auto w-full px-16 xl:max-w-[2100px]">
        <div>
          <Sort
            selectedBtn={selectedRadioBtn}
            onChangeSelectedBtn={onChangeHandler}
          />
          <div className="grid grid-cols-6 gap-4 md:grid-cols-12 md:gap-2">
            {products?.map((product: Product) => (
              <ProductCard
                key={product._id}
                image={
                  product.images
                    ? `http://localhost:8000/images/${product.images[0]}`
                    : ""
                }
                name={product.name}
                price={product.price}
                productId={product._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
