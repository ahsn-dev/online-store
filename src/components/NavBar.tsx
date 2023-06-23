import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import ProductsGroup from "./ProductsGroup";
import useCartStore from "../store";

const NavBar = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const { colorMode } = useColorMode();

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <HStack
        padding="10px"
        gap={8}
        backgroundColor={colorMode === "dark" ? "#0f172a" : "#f3f4f5"}
      >
        <Link to="/homePage">
          <Image src={logo} boxSize="80px" objectFit="cover" borderRadius={4} />
        </Link>
        <ColorModeSwitch />
        <SearchInput />
        <Flex
          gap={2}
          paddingRight={{ base: "0px", lg: "80px" }}
          paddingLeft={{ base: "16px" }}
        >
          <Link to="/loginPanel">
            <Button
              leftIcon={<IoMdArrowForward />}
              colorScheme="cyan"
              variant="outline"
            >
              پنل مدیریت
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              leftIcon={<AiOutlineShoppingCart className="text-2xl" />}
              colorScheme="cyan"
              variant="solid"
              color={colorMode === "dark" ? "#0f172a" : "#f3f4f5"}
            >
              سبد خرید
              <span
                style={{ right: "5px" }}
                className="absolute -top-[5px] flex h-5 w-5 items-center justify-center rounded-full bg-red-400 pt-[0.1rem] text-[0.75rem] leading-3 text-white shadow-lg md:right-[1rem]"
              >
                {cartItems?.length || 0}
              </span>
            </Button>
          </Link>
        </Flex>
      </HStack>
      <ProductsGroup />
    </Box>
  );
};

export default NavBar;
