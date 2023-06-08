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
import AddProductModal from "../components/AddProductModal";
import axios from "axios";
import { QueryFunction, useQuery } from "@tanstack/react-query";

interface Product {
  _id: string;
  subcategory: string;
  name: string;
  images: string[];
  thumbnail: string;
}

interface ProductsResponse {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  thumbnail: string;
  data: {
    products: Product[];
  };
}

interface Subcategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit) + "...";
};

const ProductsPanel: React.FC = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts: QueryFunction<Product[]> = async () => {
    const [productsResponse, subcategoriesResponse] = await Promise.all([
      axios.get<ProductsResponse>(
        "http://localhost:8000/api/products?limit=all"
      ),
      axios.get<{ data: { subcategories: Subcategory[] } }>(
        "http://localhost:8000/api/subcategories?limit=all"
      ),
    ]);

    const subcategoriesMap: Record<string, string> =
      subcategoriesResponse.data.data.subcategories.reduce(
        (map: Record<string, string>, subcategory) => {
          map[subcategory._id] = subcategory.name;
          return map;
        },
        {}
      );

    const products = productsResponse.data.data.products.map((product) => ({
      ...product,
      subcategory: subcategoriesMap[product.subcategory] || product.subcategory,
    }));

    return products;
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>(["products", "subcategories"], fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
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
      <HStack className="mb-8 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-700">
          مدیریت کالاها
        </Text>
        <AddProductModal />
      </HStack>
      <TableContainer className="rounded border border-gray-400 p-2">
        <Table variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                تصویر
              </Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>نام کالا</Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                دسته بندی
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                عملیات
              </Th>
            </Tr>
          </Thead>
          <Tbody style={{ color: "midnightblue" }}>
            {currentData.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Image
                    src={`http://localhost:8000/images/${item.images[0]}`}
                    className="h-24 w-24 object-contain"
                    alt={item.name}
                  />
                </Td>
                <Td>{truncateText(item.name, 70)}</Td>
                <Td style={{ textAlign: "center" }}>{item.subcategory}</Td>
                <Td>
                  <HStack spacing={2}>
                    <FcEditImage size={36} />
                    <FcEmptyTrash size={36} />
                  </HStack>
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

export default ProductsPanel;
