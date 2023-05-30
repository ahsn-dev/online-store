import { Box, Flex, Image } from "@chakra-ui/react";
import deliveryTruck from "../assets/infoImages/deliveryTruck.png";
import cashOnDelivery from "../assets/infoImages/cashOnDelivery.png";
import headphones from "../assets/infoImages/headphones.png";
import bestSeller from "../assets/infoImages/bestSeller.png";

const Info = () => {
  return (
    <Flex justifyContent={"space-around"}>
      {/* marginTop={8} */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Image src={deliveryTruck} boxSize="50px" />
        <h3>تحویل سریع</h3>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Image src={cashOnDelivery} boxSize="50px" />
        <h3>پرداخت در محل</h3>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Image src={headphones} boxSize="50px" />
        <h3>پشتیبانی ۲۴/۷</h3>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Image src={bestSeller} boxSize="50px" />
        <h3>ضمانت اصل بودن کالا</h3>
      </Box>
    </Flex>
  );
};

export default Info;
