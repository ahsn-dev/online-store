import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import Slider from "../components/Slider";
import Info from "../components/Info";
import ProductsCategory from "../components/ProductsCategory";
import LatestProducts from "../components/LatestProducts";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Slider />
      <Info />
      <ProductsCategory />
      <LatestProducts />
      <Box padding={5}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
