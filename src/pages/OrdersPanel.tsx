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
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";

const OrdersPanel = () => {
  const [value, setValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredOrders = useMemo(() => {
    const orders = [
      {
        id: 1,
        name: "علی",
        amount: "920,000",
        orderTime: "20/10/2023",
        status: "waiting",
      },
      {
        id: 2,
        name: "محمد",
        amount: "920,000",
        orderTime: "20/10/2023",
        status: "done",
      },
      {
        id: 3,
        name: "حسین",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 4,
        name: "فاطمه",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 5,
        name: "زهرا",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 6,
        name: "رضا",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 7,
        name: "نگار",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 8,
        name: "سارا",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 9,
        name: "ناهید",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
      {
        id: 10,
        name: "بهاره",
        amount: "920,000",
        orderTime: "20/10/2023",
      },
    ];

    switch (value) {
      case "waiting":
        return orders.filter((order) => order.status === "waiting");
      case "done":
        return orders.filter((order) => order.status === "done");
      default:
        return orders;
    }
  }, [value]);

  const maxPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

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
          مدیریت سفارش‌ها
        </Text>
        <RadioGroup onChange={setValue} value={value} dir="ltr">
          <Stack direction="row" className="text-slate-700">
            <Radio value="waiting" className="bg-blue-300">
              سفارش‌های در انتظار ارسال
            </Radio>
            <Radio value="done" className="bg-blue-300">
              سفارش‌های تحویل شده
            </Radio>
            <Radio value="all" className="bg-blue-300">
              همه‌ی سفارشات
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <TableContainer className="rounded border border-gray-400 p-2">
        <Table variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th style={{ fontSize: "18px", color: "#475569" }}>نام کاربر</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>مجموع مبلغ</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>
                زمان ثبت سفارش
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  paddingRight: "46px",
                }}
              >
                جزئیات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((order) => (
              <Tr key={order.id}>
                <Td>{order.name}</Td>
                <Td>{order.amount}</Td>
                <Td>{order.orderTime}</Td>
                <Td>
                  <button className="underline underline-offset-[5px]">
                    بررسی سفارش
                  </button>
                </Td>
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

export default OrdersPanel;
