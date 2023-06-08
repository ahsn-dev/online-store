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
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await fetch(
    "http://localhost:8000/api/products?fields=price,name,quantity&limit=all"
  );
  const data = await response.json();
  return data.data.products;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const formatPrice = (price: number): string => {
  const formattedPrice = price.toLocaleString();
  return formattedPrice;
};

const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit) + "...";
};

const InventoryPanel = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["products"], fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const maxPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

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
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                قیمت
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                موجودی
              </Th>
            </Tr>
          </Thead>
          <Tbody style={{ color: "midnightblue" }}>
            {currentData.map((item: Product) => (
              <Tr key={item._id}>
                <Td>{truncateText(item.name, 80)}</Td>
                <Td style={{ textAlign: "center" }}>
                  {formatPrice(item.price)}
                </Td>
                <Td style={{ textAlign: "center" }}>{item.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="flex justify-center pt-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="mx-2 rounded bg-blue-300 p-2 font-bold text-white"
          >
            صفحه قبلی
          </button>
          {
            <Text className="flex items-center text-2xl text-blue-400">
              {currentPage}
            </Text>
          }
          <button
            disabled={currentPage === maxPages}
            onClick={handleNextPage}
            className="mx-2 rounded bg-blue-300 p-2 font-bold text-white"
          >
            صفحه بعدی
          </button>
        </div>
      </TableContainer>
    </>
  );
};

export default InventoryPanel;
