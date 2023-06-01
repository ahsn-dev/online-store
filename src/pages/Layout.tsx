import { Outlet } from "react-router-dom";
import { Box, useColorMode } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
      <Box padding={5}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
