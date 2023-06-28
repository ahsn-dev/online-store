// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
//   Stack,
// } from "@chakra-ui/react";
// import { FcViewDetails } from "react-icons/fc";
// import { OrderFormData } from "../entities/OrderFormData";

// const schema = yup.object().shape({
//   name: yup.string().required("نام الزامی است"),
//   family: yup.string().required("نام خانوادگی الزامی است"),
//   address: yup.string().required("آدرس الزامی است"),
//   phoneNumber: yup.string().required("شماره تماس الزامی است"),
//   deliveryDate: yup.string().required("تاریخ تحویل الزامی است"),
// });

// const FinalizePurchase = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<OrderFormData>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async () => {
//     setIsLoading(true);
//     window.location.href = "http://localhost:3003/payment";
//     setIsLoading(false);
//   };

//   return (
//     <Box marginTop={8}>
//       <Box
//         as="h1"
//         fontSize="2xl"
//         fontWeight="bold"
//         mb={16}
//         paddingRight={28}
//         display={"flex"}
//         alignItems={"center"}
//         gap={2}
//       >
//         <FcViewDetails className="text-4xl" />
//         نهایی کردن خرید
//       </Box>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={6} width="60%" marginX="auto">
//           <Flex gap={4}>
//             <Box flex="1" mr={3}>
//               <FormControl isInvalid={!!errors.name}>
//                 <FormLabel htmlFor="name">نام</FormLabel>
//                 <Input
//                   type="text"
//                   id="name"
//                   {...register("name")}
//                   placeholder="نام خود را وارد کنید"
//                 />
//                 <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
//               </FormControl>
//             </Box>
//             <Box flex="1" ml={3}>
//               <FormControl isInvalid={!!errors.family}>
//                 <FormLabel htmlFor="family">نام خانوادگی</FormLabel>
//                 <Input
//                   type="text"
//                   id="family"
//                   {...register("family")}
//                   placeholder="نام خانوادگی خود را وارد کنید"
//                 />
//                 <FormErrorMessage>{errors.family?.message}</FormErrorMessage>
//               </FormControl>
//             </Box>
//           </Flex>

//           <Flex gap={4}>
//             <Box flex="1" mr={3}>
//               <FormControl isInvalid={!!errors.address}>
//                 <FormLabel htmlFor="address">آدرس</FormLabel>
//                 <Input
//                   type="text"
//                   id="address"
//                   {...register("address")}
//                   placeholder="آدرس خود را وارد کنید"
//                 />
//                 <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
//               </FormControl>
//             </Box>
//             <Box flex="1" ml={3}>
//               <FormControl isInvalid={!!errors.phoneNumber}>
//                 <FormLabel htmlFor="phoneNumber">شماره تماس</FormLabel>
//                 <Input
//                   type="tel"
//                   id="phoneNumber"
//                   {...register("phoneNumber")}
//                   placeholder="شماره تماس خود را وارد کنید"
//                 />
//                 <FormErrorMessage>
//                   {errors.phoneNumber?.message}
//                 </FormErrorMessage>
//               </FormControl>
//             </Box>
//           </Flex>

//           <Flex>
//             <Box flex="1" mr={3}>
//               <FormControl isInvalid={!!errors.deliveryDate}>
//                 <FormLabel htmlFor="deliveryDate">تاریخ تحویل</FormLabel>
//                 <Input
//                   type="date"
//                   id="deliveryDate"
//                   {...register("deliveryDate")}
//                   width="49%"
//                 />
//                 <FormErrorMessage>
//                   {errors.deliveryDate?.message}
//                 </FormErrorMessage>
//               </FormControl>
//             </Box>
//           </Flex>

//           <Button
//             type="submit"
//             isLoading={isLoading}
//             loadingText="Processing Payment..."
//             colorScheme="cyan"
//             width="40%"
//             marginX="auto"
//             marginTop="2rem"
//           >
//             پرداخت
//           </Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default FinalizePurchase;

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
import { OrderFormData } from "../entities/OrderFormData";
import useCartStore from "../store";
import { v4 as uuidv4 } from "uuid";
import { Faker, fa } from "@faker-js/faker";
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
  } = useForm<OrderFormData>({
    resolver: yupResolver(schema),
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
        const response = await fetch("http://localhost:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NzYyMTA2OCwiZXhwIjoxNjkwMjEzMDY4fQ.4Md-7MchA4UtX1DZ2ecTffeBHWmQ7sfpt5ukc4K_0QM",
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
        deliveryDate: deliveryDate,
      };

      try {
        const response = await fetch("http://localhost:8000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        const data = await response.json();
        return data.data.order._id; // Return the orderId
      } catch (error) {
        console.error(error, "error");
      }
    };

    const userId = await createUser();
    if (userId) {
      const orderId = await createOrder(userId);
      window.location.href = `http://localhost:3003/payment?orderId=${orderId}`;
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
