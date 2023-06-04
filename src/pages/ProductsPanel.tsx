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
  Image,
} from "@chakra-ui/react";
import { FcEditImage, FcEmptyTrash } from "react-icons/fc";
import mouse from "../assets/products/mouse.png";
import headphone from "../assets/products/headphone.png";
import ipad from "../assets/products/ipad.png";
import AddProductModal from "../components/AddProductModal";

const ProductsPanel = () => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const data = [
    {
      id: 1,
      image: mouse,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      category: "ماوس",
    },
    {
      id: 2,
      image: headphone,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      category: "هدفون",
    },
    {
      id: 3,
      image: ipad,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      category: "کیبورد",
    },
    {
      id: 1,
      image: mouse,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      category: "ماوس",
    },
    {
      id: 2,
      image: headphone,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      category: "هدفون",
    },
    {
      id: 3,
      image: ipad,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      category: "کیبورد",
    },
    {
      id: 4,
      image: mouse,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      category: "ماوس",
    },
    {
      id: 5,
      image: headphone,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      category: "هدفون",
    },
    {
      id: 6,
      image: ipad,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      category: "کیبورد",
    },
    {
      id: 7,
      image: mouse,
      name: "Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse",
      category: "ماوس",
    },
    {
      id: 8,
      image: headphone,
      name: "Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling Bluetooth Headphones",
      category: "هدفون",
    },
    {
      id: 9,
      image: ipad,
      name: "SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming Keyboard - English",
      category: "کیبورد",
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
          مدیریت کالاها
        </Text>
        <AddProductModal />
      </HStack>
      <TableContainer className="rounded border border-gray-400 p-2">
        <Table variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th style={{ fontSize: "18px", color: "#475569" }}>تصویر</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>نام کالا</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>دسته بندی</Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  paddingRight: "40px",
                }}
              >
                عملیات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Image src={item.image} className="w-16" />
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>
                  <div className="flex items-center gap-x-4">
                    <button>
                      <FcEditImage className="text-3xl" />
                    </button>
                    <button>
                      <FcEmptyTrash className="text-3xl" />
                    </button>
                  </div>
                </Td>
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

export default ProductsPanel;
