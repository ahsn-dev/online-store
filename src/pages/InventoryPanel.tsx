import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";

const InventoryPanel = () => {
  return (
    <>
      <HStack className="mb-16 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-600">
          مدیریت موجودی و قیمت‌ها
        </Text>
        <Button style={{ backgroundColor: "#3382B7" }}>ذخیره</Button>
      </HStack>
      <TableContainer className="rounded border border-gray-400 p-2">
        <Table variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th style={{ fontSize: "18px", color: "#475569" }}>کالا</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>قیمت</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>موجودی</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse</Td>
              <Td>1000</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>
                Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling
                Bluetooth Headphones
                {/* - Midnight Black */}
              </Td>
              <Td>8000</Td>
              <Td>4</Td>
            </Tr>
            <Tr>
              <Td>
                SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming
                Keyboard - English
              </Td>
              <Td>7000</Td>
              <Td>7</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryPanel;
