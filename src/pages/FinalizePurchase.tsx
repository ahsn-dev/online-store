import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { OrderFormData } from "../entities/OrderFormData";
import useCartStore from "../store";
import { v4 as uuidv4 } from "uuid";
import { Faker, fa } from "@faker-js/faker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { BASE_URL } from "../constants";

interface MyDateObject extends DateObject {
  unix: number;
}

const faker = new Faker({ locale: [fa] });

const schema = yup.object().shape({
  firstname: yup.string().required("نام الزامی است"),
  lastname: yup.string().required("نام خانوادگی الزامی است"),
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
    control,
    setValue,
  } = useForm<OrderFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const onSubmit = async (formData: OrderFormData) => {
    setIsLoading(true);

    const { firstname, lastname, address, phoneNumber, deliveryDate } =
      formData;

    const createUser = async () => {
      const user = {
        firstname: firstname,
        lastname: lastname,
        username: faker.internet.userName(),
        password: uuidv4(),
        phoneNumber: phoneNumber,
        address: address,
        role: "USER",
      };

      try {
        const response = await fetch(BASE_URL + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        return data.data.user._id;
      } catch (error) {
        console.error(error, "Failed to create user.");
      }
    };

    const createOrder = async (userId: string) => {
      const cartItems = useCartStore.getState().cartItems;

      const products = cartItems.map((item) => ({
        product: item.id,
        count: item.quantity,
      }));

      const order = {
        user: userId,
        products: products,
        deliveryStatus: false,
        deliveryDate: +deliveryDate * 1000,
      };

      localStorage.setItem("order", JSON.stringify(order));
    };

    const userId = await createUser();
    if (userId) {
      await createOrder(userId);
      window.location.href = `https://online-shop-payment.vercel.app`;
    }
    setIsLoading(false);
  };

  return (
    <Box marginTop={8}>
      <Box
        as="h1"
        fontSize="2xl"
        fontWeight="bold"
        mb={16}
        paddingRight={28}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <FcViewDetails className="text-4xl" />
        نهایی کردن خرید
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6} width="60%" marginX="auto">
          <Flex gap={4}>
            <Box flex="1" mr={3}>
              <FormControl isInvalid={!!errors.firstname}>
                <FormLabel htmlFor="firstname">نام</FormLabel>
                <Input
                  type="text"
                  id="firstname"
                  {...register("firstname")}
                  placeholder="نام خود را وارد کنید"
                />
                <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box flex="1" ml={3}>
              <FormControl isInvalid={!!errors.lastname}>
                <FormLabel htmlFor="lastname">نام خانوادگی</FormLabel>
                <Input
                  type="text"
                  id="lastname"
                  {...register("lastname")}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
                <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
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
                <Controller
                  control={control}
                  name="deliveryDate"
                  rules={{ required: true }} //optional
                  render={({ field: { name } }) => (
                    <div className="w-full">
                      <DatePicker
                        name={name}
                        className="w-full "
                        calendar={persian}
                        locale={persian_fa}
                        minDate={new Date().setDate(8)}
                        plugins={[weekends()]}
                        inputClass="custom-input"
                        placeholder="تاریخ تحویل را انتخاب کنید"
                        onChange={(date) =>
                          setValue(
                            "deliveryDate",
                            (date as MyDateObject)?.unix?.toString()
                          )
                        }
                      />
                      <FormErrorMessage>
                        {errors.deliveryDate?.message}
                      </FormErrorMessage>
                    </div>
                  )}
                />
              </FormControl>
            </Box>
          </Flex>

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="در حال پردازش پرداخت..."
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
