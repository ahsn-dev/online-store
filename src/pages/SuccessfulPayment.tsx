import { Flex, Image, Text } from "@chakra-ui/react";
import close from "../assets/check.png";
import { useEffect } from "react";
import useCartStore from "../store";
import axios from "axios";
import { BASE_URL } from "../constants";

const SuccessfulPayment = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  const order = JSON.parse(localStorage.getItem("order") as string);

  axios.post(BASE_URL + "/orders", order);

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={16}
      marginTop={16}
    >
      <Image src={close} width={200} />
      <Text as="h1" fontSize={30} textAlign={"center"}>
        با تشکر از پرداخت شما
        <br />
        سفارش شما ثبت شده و جهت هماهنگی ارسال، با شما تماس گرفته خواهد شد
      </Text>
    </Flex>
  );
};

export default SuccessfulPayment;
