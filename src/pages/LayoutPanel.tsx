import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  FcExport,
  FcInspection,
  FcMoneyTransfer,
  FcMultipleDevices,
} from "react-icons/fc";
import { Link, Outlet, NavLink } from "react-router-dom";

const LayoutPanel = () => {
  return (
    <Grid
      templateAreas={`"header header"
                      "nav    main"
                      "nav    main"`}
      gridTemplateRows={"100px 1fr 30px"}
      gridTemplateColumns={"350px 1fr"}
      h="100vh"
      fontWeight="bold"
    >
      <GridItem pl="2" area={"header"} className="bg-[#1B262C]">
        <Flex className="items-baseline justify-between">
          <Text
            as="h1"
            className="mt-8 pr-16 text-center text-2xl font-bold text-white"
          >
            پنل مدیریت وب‌سایت
          </Text>
          <Link to="/homePage">
            <Button>بازگشت به سایت</Button>
          </Link>
        </Flex>
      </GridItem>
      <GridItem pl="2" area={"nav"} className="h-full bg-[#3282B8]">
        <Flex className="h-full items-center justify-evenly">
          <Flex className="h-full flex-col items-center justify-evenly">
            <NavLink
              to="/panel/productsPanel"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-x-2 rounded-full border  bg-[#92C5FD] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
                  : "flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
              }
            >
              <Box className="mx-auto flex items-center gap-x-2">
                <FcMultipleDevices className="text-3xl" />
                <span>کالاها</span>
              </Box>
            </NavLink>
            <NavLink
              to="/panel/InventoryPanel"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-x-2 rounded-full border bg-[#92C5FD] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
                  : "flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
              }
            >
              <Box
                className="mx-auto flex items-center gap-x-2"
                style={{ inlineSize: "max-content" }}
              >
                <FcMoneyTransfer className="text-3xl" />
                <span>موجودی و قیمت‌ها</span>
              </Box>
            </NavLink>
            <NavLink
              to="/panel/ordersPanel"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-x-2 rounded-full border bg-[#92C5FD] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
                  : "flex items-center gap-x-2 rounded-full border bg-[#0F4C75] px-16 py-2 text-white transition-colors hover:bg-sky-700 hover:transition-colors"
              }
            >
              <Box className="mx-auto flex items-center gap-x-2">
                <FcInspection className="text-3xl" />
                <span>سفارش‌ها</span>
              </Box>
            </NavLink>
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
        <Box padding={5}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default LayoutPanel;
