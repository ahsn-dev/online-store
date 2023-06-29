import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Order, User } from "../pages/OrdersPanel";
import { Product } from "../entities/Product";
import { formatPrice } from "../utils/formatPrice";
import { truncateText } from "../utils/truncateText";

interface Props {
  order: Order;
  user?: User;
  ordersRefetch: () => void;
  usersCurrentPage: number;
  setUsersCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckOrderModal = ({
  order,
  user,
  ordersRefetch,
  usersCurrentPage,
  setUsersCurrentPage,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [products, setProducts] = useState<Product[]>([]);

  const fetchOrder = async (id: string): Promise<Product[]> => {
    const response = await fetch(`http://localhost:8000/api/orders/${id}`);
    const data = await response.json();

    // Transform the data to extract the required properties
    const products = data.data.order.products.map((product: Product) => ({
      name: product.product?.name,
      price: product.product?.price,
      count: product.count,
    }));

    return products;
  };

  const handleDeliveryStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deliveryStatus: true,
          }),
        }
      );

      if (response.ok) {
        ordersRefetch();
        setUsersCurrentPage(
          usersCurrentPage > 1
            ? (prev) => prev - usersCurrentPage + 1
            : usersCurrentPage
        );
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetchOrder(order._id);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [order._id]);

  const createdAtDate = order.createdAt.slice(0, 10);
  const deliveryDate = order.deliveryDate.slice(0, 10);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the products array based on the current page
  const currentPageProducts = products.slice(startIndex, endIndex);

  const totalItems = products.length;
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <button onClick={onOpen} className="underline underline-offset-[5px]">
        بررسی سفارش
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent marginTop={"4"}>
          <Flex className="flex-col items-end rounded-sm bg-slate-400">
            <ModalCloseButton className="mt-[6px] bg-slate-400 text-slate-800" />
            <ModalHeader className="text-slate-800">نمایش سفارش</ModalHeader>
          </Flex>
          <ModalBody>
            <Flex
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap="4rem"
              marginY={8}
            >
              <HStack
                spacing={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  fontSize: "18px",
                  fontWeight: "800",
                }}
              >
                <Text>نام مشتری:</Text>
                <Text>آدرس:</Text>
                <Text>تلفن:</Text>
                <Text>زمان سفارش:</Text>
                <Text>زمان تحویل:</Text>
              </HStack>
              <HStack
                spacing={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                <Text>{`${user?.firstname} ${user?.lastname}`}</Text>
                <Text>{user?.address}</Text>
                <Text>{user?.phoneNumber}</Text>
                <Text>{createdAtDate}</Text> <Text>{deliveryDate}</Text>
              </HStack>
            </Flex>

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
                      تعداد
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPageProducts.map((product, index) => (
                    <Tr key={index}>
                      <Td>{truncateText(product.name, 39)}</Td>
                      <Td>{formatPrice(product.price)}</Td>
                      <Td style={{ textAlign: "center" }}>{product.count}</Td>
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
                  {currentPage} / {totalPage}
                </Text>
                <button
                  disabled={currentPage >= totalPage}
                  onClick={handleNextPage}
                  className="mx-2 rounded bg-blue-300 p-2 font-bold text-white"
                >
                  صفحه بعدی
                </button>
              </div>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            {!order.deliveryStatus ? (
              <Button
                colorScheme="blue"
                onClick={handleDeliveryStatus}
                className="mx-auto"
              >
                تحویل شد
              </Button>
            ) : (
              <Text className="mx-auto text-lg">
                زمان تحویل: {deliveryDate}
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOrderModal;
