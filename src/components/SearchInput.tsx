import { useRef } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchInput = () =>
  {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
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
          />
        </InputGroup>
      </form>
    );
  };

export default SearchInput;
