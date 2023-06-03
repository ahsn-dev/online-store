import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  FcAlphabeticalSortingAz,
  FcExport,
  FcInspection,
  FcMoneyTransfer,
  FcMultipleDevices,
} from "react-icons/fc";
import { Link, Outlet } from "react-router-dom";

const PanelLayout = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav main"`}
      gridTemplateRows={"100px 1fr 30px"}
      gridTemplateColumns={"350px 1fr"}
      h="100vh"
      fontWeight="bold"
    >
      <GridItem pl="2" area={"header"} className="bg-[#1B262C]">
        <Text
          as="h1"
          className="mt-8 text-center text-2xl font-bold text-white"
        >
          پنل مدیریت وبسایت
        </Text>
      </GridItem>
      <GridItem pl="2" area={"nav"} className="bg-[#3282B8]">
        <Flex className="h-full items-center justify-evenly">
          <Flex className="h-full flex-col items-center justify-evenly">
            <Link to="panel/productsPanel">
              <Box className="flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors">
                <FcMultipleDevices className="text-3xl" />
                <span>کالاها</span>
              </Box>
            </Link>
            <Link to="/instock">
              <Box
                className="flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
                style={{ inlineSize: "max-content" }}
              >
                <FcMoneyTransfer className="text-3xl" />
                <span>موجودی و قیمت‌ها</span>
              </Box>
            </Link>
            <Link to="/orders">
              <Box className="flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors">
                <FcInspection className="text-3xl" />
                <span>سفارش‌ها</span>
              </Box>
            </Link>
            <Link to="/categories">
              <Box className="flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors">
                <FcAlphabeticalSortingAz className="text-3xl" />
                <span>دسته بندی‌ها</span>
              </Box>
            </Link>
            <Link to="/loginPanel">
              <Box className="flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors">
                <FcExport className="text-3xl" />
                <span>خروج</span>
              </Box>
            </Link>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem pl="2" area={"main"} className="bg-[#BBE1FA]">
        {/* <ProductsPanel /> */}
        <Box padding={5}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PanelLayout;