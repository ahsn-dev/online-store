import { Flex, Image, Text } from "@chakra-ui/react";
import close from "../assets/close.png";

const FailedPayment = () => {
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
        پرداخت موفقیت‌آمیز نبود
        <br />
        سفارش شما در انتظار پرداخت است
      </Text>
    </Flex>
  );
};

export default FailedPayment;
