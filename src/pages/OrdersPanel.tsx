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
import CheckOrderModal from "../components/CheckOrderModal";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatPriceFa } from "../utils/formatPrice";
import { formatDate } from "../utils/formatDate";
import { Product } from "../entities/Product";

export interface Order {
  _id: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
  };
  products: {
    product: Product;
    count: number;
  }[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
}

const OrdersPanel = (): JSX.Element => {
  const [value, setValue] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch("http://localhost:8000/api/orders?limit=all");
    const data = await response.json();
    return data.data.orders;
  };

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
    refetch,
  } = useQuery<Order[]>(["orders"], fetchOrders);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    switch (value) {
      case "waiting":
        return orders.filter((order) => order.deliveryStatus === false);
      case "done":
        return orders.filter((order) => order.deliveryStatus === true);
      default:
        return orders;
    }
  }, [orders, value]);

  const maxPages: number = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentData: Order[] = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = (): void => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = (): void => {
    setCurrentPage((prev) => prev - 1);
  };

  if (ordersLoading) {
    return <div>Loading...</div>;
  }

  if (ordersError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <HStack className="mb-16 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-700">
          مدیریت سفارش‌ها
        </Text>
        <RadioGroup
          dir="ltr"
          defaultValue="all"
          onChange={(value) => {
            setValue(value);
            setCurrentPage(
              currentPage > 1 ? (prev) => prev - currentPage + 1 : currentPage
            );
          }}
        >
          <Stack
            direction="row"
            className="text-slate-700"
            style={{ display: "flex", gap: "1rem" }}
          >
            <Radio value="all" className="bg-blue-300">
              همه
            </Radio>
            <Radio value="waiting" className="bg-blue-300">
              در انتظار تحویل
            </Radio>
            <Radio value="done" className="bg-blue-300">
              تحویل داده شده
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>

      <TableContainer className="rounded border border-gray-400 p-2">
        <Table className="w-full" variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                نام کاربر
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                مجموع مبلغ
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                زمان ثبت سفارش
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                جزئیات
              </Th>
            </Tr>
          </Thead>
          <Tbody style={{ color: "midnightblue" }}>
            {currentData.map((order) => (
              <Tr key={order._id}>
                <Td style={{ textAlign: "center" }}>
                  {order.user.firstname} {order.user.lastname}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  {formatPriceFa(order.totalPrice)}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  {formatDate(order.createdAt)}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  {order.products.length > 0 && (
                    <CheckOrderModal
                      order={order}
                      ordersRefetch={refetch}
                      usersCurrentPage={currentPage}
                      setUsersCurrentPage={setCurrentPage}
                    />
                  )}
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
          <Text className="flex items-center text-2xl text-blue-400">
            {currentPage} / {maxPages}
          </Text>
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
