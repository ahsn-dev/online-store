import { Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageNotFound from "../assets/page-error.png";

const ErrorPage = () => {
  const error = useRouteError();
  const { colorMode } = useColorMode();

  return (
    <div
      style={
        colorMode === "dark"
          ? { backgroundColor: "#0f172a" }
          : { backgroundColor: "#f3f4f5" }
      }
    >
      <NavBar />
      <Box padding={5} height="100%">
        <Box>
          {isRouteErrorResponse(error) ? (
            <div className="flex flex-col items-center gap-y-4">
              <Image
                src={PageNotFound}
                boxSize="400px"
                objectFit={"cover"}
                width="48%"
                style={{ margin: "0 auto", marginTop: "4rem" }}
              />
              <Text as="h1" className="text-4xl font-bold text-[#96CAF1]">
                !!! Page Not Found
              </Text>
            </div>
          ) : (
            <Text as="h1" className="text-4xl font-bold text-[#96CAF1]">
              An unexpected error occurred.
            </Text>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default ErrorPage;
