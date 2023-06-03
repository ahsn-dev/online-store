import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    mode: "onChange", // enable onChange mode to validate the form on every change
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Perform login logic here
    setIsLoading(false);
  };

  return (
    <Flex className="h-screen">
      <Box
        maxW="md"
        mx="auto"
        mt={32}
        p={6}
        borderWidth={1}
        borderRadius="md"
        className="h-3/5 w-2/3"
      >
        <div>
          <Text as={"h1"} fontSize="xl" fontWeight="bold" mb={4}>
            ورود به پنل مدیریت فروشگاه
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} mt="2rem">
              <FormControl isInvalid={!!formState.errors.username}>
                <FormLabel htmlFor="username">نام کاربری</FormLabel>
                <Input
                  id="username"
                  placeholder="نام کاربری خود را وارد کنید"
                  {...register("username", {
                    required: "نام کاربری الزامی است",
                  })}
                />
                <FormErrorMessage>
                  {formState.errors.username?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formState.errors.password}>
                <FormLabel htmlFor="password">رمز عبور</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                  })}
                />
                <FormErrorMessage>
                  {formState.errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <Link to="/panel">
                <Button
                  className="mx-auto mt-20 w-full"
                  type="submit"
                  isLoading={isLoading}
                  loadingText="در حال ورود به پنل کاربری..."
                  disabled={!formState.isValid} // disable the button if the form is invalid
                >
                  ورود
                </Button>
              </Link>
            </Stack>
          </form>
          <Box mt={6}>
            <Link to="/homePage">بازگشت به سایت</Link>
          </Box>
        </div>
      </Box>
    </Flex>
  );
};

export default LoginPanel;
