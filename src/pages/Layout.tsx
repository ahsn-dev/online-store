import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, useColorMode } from "@chakra-ui/react";
// import Slider from "../components/Slider";
// import Info from "../components/Info";
// import ProductsCategory from "../components/ProductsCategory";
// import LatestProducts from "../components/LatestProducts";
import Footer from "../components/Footer";
import Cart from "./Cart";
// import ProductPage from "./ProductPage";

const Layout = () => {
  const { colorMode } = useColorMode();

  return (
    <div
      style={
        colorMode === "dark"
          ? { backgroundColor: "#0f172a" }
          : { backgroundColor: "#f3f4f5" }
      }
    >
      <NavBar />
      <Cart />
      {/* <ProductPage /> */}
      {/* <Slider />
      <Info />
      <ProductsCategory />
      <LatestProducts /> */}
      <Box padding={5}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
