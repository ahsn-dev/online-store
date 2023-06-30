import Slider from "../components/Slider";
import Info from "../components/Info";
import ProductsCategory from "../components/ProductsCategory";
import LatestProducts from "../components/LatestProducts";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  return (
    <>
      <Slider />
      <Info />
      <ProductsCategory />
      <LatestProducts />
    </>
  );
};

export default HomePage;
