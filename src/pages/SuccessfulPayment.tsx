import { Flex, Image, Text } from "@chakra-ui/react";
import close from "../assets/check.png";

const SuccessfulPayment = () => {
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
