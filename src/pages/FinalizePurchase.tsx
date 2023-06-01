import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FcViewDetails } from "react-icons/fc";

type OrderFormData = {
  name: string;
  family: string;
  address: string;
  phoneNumber: string;
  deliveryDate: string;
};

const schema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  family: yup.string().required("نام خانوادگی الزامی است"),
  address: yup.string().required("آدرس الزامی است"),
  phoneNumber: yup.string().required("شماره تماس الزامی است"),
  deliveryDate: yup.string().required("تاریخ تحویل الزامی است"),
});

const FinalizePurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    // TODO: Implement payment logic here
    setIsLoading(false);
  };

  return (
    <Box marginTop={16}>
      <Box
        as="h1"
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
        paddingRight={28}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <FcViewDetails className="text-3xl" />
        نهایی کردن خرید
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6} width="60%" marginX="auto">
          <Flex gap={4}>
            <Box flex="1" mr={3}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">نام</FormLabel>
                <Input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="نام خود را وارد کنید"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box flex="1" ml={3}>
              <FormControl isInvalid={!!errors.family}>
                <FormLabel htmlFor="family">نام خانوادگی</FormLabel>
                <Input
                  type="text"
                  id="family"
                  {...register("family")}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
                <FormErrorMessage>{errors.family?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex gap={4}>
            <Box flex="1" mr={3}>
              <FormControl isInvalid={!!errors.address}>
                <FormLabel htmlFor="address">آدرس</FormLabel>
                <Input
                  type="text"
                  id="address"
                  {...register("address")}
                  placeholder="آدرس خود را وارد کنید"
                />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box flex="1" ml={3}>
              <FormControl isInvalid={!!errors.phoneNumber}>
                <FormLabel htmlFor="phoneNumber">شماره تماس</FormLabel>
                <Input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="شماره تماس خود را وارد کنید"
                />
                <FormErrorMessage>
                  {errors.phoneNumber?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex>
            <Box flex="1" mr={3}>
              <FormControl isInvalid={!!errors.deliveryDate}>
                <FormLabel htmlFor="deliveryDate">تاریخ تحویل</FormLabel>
                <Input
                  type="date"
                  id="deliveryDate"
                  {...register("deliveryDate")}
                  width="49%"
                />
                <FormErrorMessage>
                  {errors.deliveryDate?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Processing Payment..."
            colorScheme="cyan"
            width="40%"
            marginX="auto"
            marginTop="2rem"
          >
            پرداخت
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FinalizePurchase;
