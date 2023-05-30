import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text whiteSpace="nowrap">
        {colorMode === "dark" ? (
          <MdDarkMode size="24px" />
        ) : (
          <MdLightMode size="24px" />
        )}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
