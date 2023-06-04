import { useState } from "react";
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
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const data = [
    {
      id: 1,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      price: 1000,
      quantity: 200,
    },
    {
      id: 2,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      price: 8000,
      quantity: 4,
    },
    {
      id: 3,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      price: 7000,
      quantity: 700,
    },
    {
      id: 4,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      price: 1000,
      quantity: 2,
    },
    {
      id: 5,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      price: 8000,
      quantity: 400,
    },
    {
      id: 6,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      price: 7000,
      quantity: 7,
    },
    {
      id: 7,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      price: 1000,
      quantity: 2000,
    },
    {
      id: 8,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      price: 8000,
      quantity: 4,
    },
    {
      id: 9,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      price: 7000,
      quantity: 7,
    },
    {
      id: 10,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      price: 1000,
      quantity: 2,
    },
    {
      id: 11,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      price: 8000,
      quantity: 4000,
    },
    {
      id: 12,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      price: 7000,
      quantity: 7,
    },
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <HStack className="mb-16 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-700">
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
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  paddingRight: "48px",
                }}
              >
                موجودی
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.price}</Td>
                <Td style={{ textAlign: "center" }}>{item.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`mx-2 ${
                i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded-md px-3 py-1`}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </TableContainer>
    </>
  );
};

export default InventoryPanel;
