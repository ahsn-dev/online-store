import { useRef } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { colorMode } = useColorMode();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (ref.current) {
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputRightElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="جستجو"
          paddingRight={10}
          variant="filled"
          width={800}
          style={
            colorMode === "dark"
              ? { backgroundColor: "#1E293B" }
              : { backgroundColor: "#E2E4E7" }
          }
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
