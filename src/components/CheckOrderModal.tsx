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

const CheckOrderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <button onClick={onOpen} className="underline underline-offset-[5px]">
        بررسی سفارش
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <Flex className="flex-col items-end rounded-sm bg-slate-400">
            <ModalCloseButton className="mt-[6px] bg-slate-400 text-slate-800" />
            <ModalHeader className="text-slate-800">نمایش سفارش</ModalHeader>
          </Flex>
          <ModalBody>
            <Flex
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              gap="1rem"
              marginTop="1rem"
              marginBottom="2rem"
              marginRight="8rem"
            >
              <HStack
                spacing={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Text>نام مشتری:</Text>
                <Text>آدرس:</Text>
                <Text>تلفن:</Text>
                <Text>زمان تحویل:</Text>
                <Text>زمان سفارش:</Text>
              </HStack>
              <HStack
                spacing={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text>اکبر زمانی</Text>
                <Text>تهران، میدان آزادی، انتهای خیابان الوند</Text>
                <Text>09123411818</Text>
                <Text>12/10/2023</Text>
                <Text>10/10/2023</Text>
              </HStack>
            </Flex>

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
                      تعداد
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
                      i === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } rounded-md px-3 py-1`}
                    onClick={() => handlePageChange(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose} className="mx-auto">
              تحویل شد
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOrderModal;
