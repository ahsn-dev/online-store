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
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginRequestData {
  username: string;
  password: string;
}

const LoginPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const getLogin = async (data: LoginRequestData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      const cookie = new Cookies();
      cookie.set("adminToken", response.data.token.accessToken);
      cookie.set("refreshToken", response.data.token.refreshToken);
      navigate("/panel");
      return response.data;
    } catch (error) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");
    getLogin(data);
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
        className="h-fit w-2/3"
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
              {error && (
                <Box color="red.500" fontWeight="bold" textAlign="center">
                  {error}
                </Box>
              )}
              <Button
                className="mx-auto mt-20 w-full"
                type="submit"
                isLoading={isLoading}
                loadingText="در حال ورود به پنل کاربری..."
                disabled={!formState.isValid}
              >
                ورود
              </Button>
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
