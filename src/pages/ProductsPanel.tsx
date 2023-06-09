import { useEffect, useState } from "react";
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
import AddProductModal from "../components/AddProductModal";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductsResponse, Subcategory } from "../entities/ProductsPanel";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import { truncateText } from "../utils/truncateText";
import { Product } from "../entities/Product";
import { BASE_URL, IMAGE_URL } from "../constants";

const ProductsPanel: React.FC = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = async (page: number) => {
    const [productsResponse, subcategoriesResponse] = await Promise.all([
      axios.get<ProductsResponse>(BASE_URL + `/products?page=${page}&limit=3`),
      axios.get<{ data: { subcategories: Subcategory[] } }>(
        BASE_URL + "/subcategories?limit=all"
      ),
    ]);

    const subcategoriesMap: Record<string, string> =
      subcategoriesResponse.data.data.subcategories.reduce(
        (map: Record<string, string>, subcategory: Subcategory) => {
          map[subcategory._id] = subcategory.name;
          return map;
        },
        {}
      );

    const products: Product[] = productsResponse.data.data.products.map(
      (product: Product) => ({
        ...product,
        subcategory:
          subcategoriesMap[product.subcategory as string] ||
          product.subcategory,
      })
    );

    const totalProducts: number = productsResponse.data.total;
    const totalPage: number = productsResponse.data.total_pages;

    return { products, totalProducts, totalPage };
  };

  const queryClient = useQueryClient();

  const {
    data: result = { products: [], totalProducts: 0, totalPage: 0 },
    isLoading,
    isError,
    refetch,
  } = useQuery(["products", "subcategories", currentPage], () =>
    fetchProducts(currentPage)
  );

  const { products = [], totalProducts = 0, totalPage = 0 } = result;

  useEffect(() => {
    if (!products) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  const maxPages: number = Math.ceil(totalProducts / itemsPerPage);

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
        <AddProductModal
          checkProductTotalPage={products.length >= itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          refetch={refetch}
          totalPage={totalPage}
        />
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
            {products.map((item: Product) => (
              <Tr key={item._id}>
                {item.images && item.images[0] && (
                  <Td>
                    <Image
                      src={IMAGE_URL + `/${item.images[0]}`}
                      className="h-24 w-24 object-contain"
                      alt={item.name}
                    />
                  </Td>
                )}

                <Td>{truncateText(item.name, 70)}</Td>
                <Td style={{ textAlign: "center" }}>{item.subcategory}</Td>
                <Td>
                  <HStack spacing={2} className="flex justify-center">
                    <EditProductModal
                      itemId={item._id ?? ""}
                      refetch={refetch}
                    />
                    <DeleteProductModal
                      itemId={item._id ?? ""}
                      queryKey="products"
                      queryClient={queryClient}
                      checkProductTotalPage={products.length <= 1}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      refetch={refetch}
                    />
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
              {currentPage} / {totalPage}
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
