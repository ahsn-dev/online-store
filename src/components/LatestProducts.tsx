import axios from "axios";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../entities/Product";

const fetchProducts = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/products?limit=8"
  );
  return response.data.data.products;
};

const LatestProducts = () => {
  const { data, isLoading, isError } = useQuery(["products"], fetchProducts);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }

  return (
    <>
      <div className="mx-auto my-4 flex flex-col md:my-8 xl:max-w-[2130px]">
        <h2 className="mx-auto my-4 text-3xl font-bold md:my-8 lg:mt-10">
          جدیدترین کالا‌ها
        </h2>
        <div className="grid grid-cols-6 gap-4 pl-6 md:grid-cols-12 md:gap-2">
          {data.map((product: Product) => (
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
      <Link to="/products" className="mx-auto mt-24 flex w-min">
        <Button style={{ backgroundColor: "#A71B4A", color: "white" }}>
          مشاهده محصولات بیشتر
        </Button>
      </Link>
    </>
  );
};

export default LatestProducts;
