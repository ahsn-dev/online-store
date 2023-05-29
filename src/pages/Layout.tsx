import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import Slider from "../components/Slider";
import Info from "../components/Info";
import GoodsCategory from "../components/GoodsCategory";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Slider />
      <Info />
      <GoodsCategory />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
