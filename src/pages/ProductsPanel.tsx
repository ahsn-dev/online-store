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
            <Tr>
              <Td>
                <Image src={mouse} className="w-16" />
              </Td>
              <Td>Corsair Ironclaw RGB 18000 DPI Optical Gaming Mouse</Td>
              <Td>ماوس</Td>
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
            <Tr>
              <Td>
                <Image src={headphone} className="w-16" />
              </Td>
              <Td>
                Beats by Dr. Dre Studio3 Skyline Over-Ear Noise Cancelling
                Bluetooth Headphones
                {/* - Midnight Black */}
              </Td>
              <Td>هدفون</Td>
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
            <Tr>
              <Td>
                <Image src={ipad} className="w-16" />
              </Td>
              <Td>
                SteelSeries Apex Pro Backlit Mechanical OmniPoint Gaming
                Keyboard - English
              </Td>
              <Td>کیبورد</Td>
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
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsPanel;
