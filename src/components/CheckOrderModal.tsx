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
import { useState } from "react";
import { Order } from "../pages/OrdersPanel";
import { formatDate } from "../utils/formatDate";
import { truncateText } from "../utils/truncateText";
import { formatNumberFa } from "../utils/formatNumberFa";

interface Props {
  order: Order;
  ordersRefetch: () => void;
  usersCurrentPage: number;
  setUsersCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckOrderModal = ({
  order,
  ordersRefetch,
  usersCurrentPage,
  setUsersCurrentPage,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const totalItems = order.products.length;
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForCurrentPage = order.products.slice(startIndex, endIndex);

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
                <Text>{`${order.user.firstname} ${order.user.lastname}`}</Text>
                <Text>{order.user.address}</Text>
                <Text>{formatNumberFa(order.user.phoneNumber)}</Text>
                <Text>{formatDate(order.createdAt)}</Text>
                <Text>{formatDate(order.deliveryDate)}</Text>
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
                  {itemsForCurrentPage.map((product, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{truncateText(product.product.name, 39)}</Td>
                        <Td>{product.product.price}</Td>
                        <Td style={{ textAlign: "center" }}>
                          {product.product.quantity}
                        </Td>
                      </Tr>
                    );
                  })}
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
                زمان تحویل: {formatDate(order.deliveryDate)}
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOrderModal;
