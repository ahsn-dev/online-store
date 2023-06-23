import { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../entities/ProductsPanel";
import TrComponent from "../components/TrComponent";
import { EditedData } from "../entities/EditedData";
import { toast } from "react-toastify";
import { Product } from "../entities/Product";

const InventoryPanel = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [edit, setEdit] = useState<EditedData[]>([]);

  useEffect(() => {
    // console.log(edit);
  }, [edit]);

  const fetchProducts = async (page: number) => {
    const [productsResponse] = await Promise.all([
      axios.get<ProductsResponse>(
        `http://localhost:8000/api/products?page=${page}&limit=6&fields=price,name,quantity`
      ),
    ]);

    const products: Product[] = productsResponse.data.data.products.map(
      (product: Product) => ({
        ...product,
      })
    );

    const totalProducts: number = productsResponse.data.total;
    const totalPage: number = productsResponse.data.total_pages;

    return { products, totalProducts, totalPage };
  };

  const {
    data: result = { products: [], totalProducts: 0, totalPage: 0 },
    isLoading,
    isError,
    refetch,
  } = useQuery(["products", currentPage], () => fetchProducts(currentPage));

  const { products = [], totalProducts = 0, totalPage = 0 } = result;

  useEffect(() => {
    if (!products) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const patchProduct = async (item: EditedData) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/products/${item.id}`,
        {
          price: item.price,
          quantity: item.quantity,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NjQ5Nzc1NywiZXhwIjoxNjg5MDg5NzU3fQ.EBYv0Kj6kD1oFbhmsULf4Q6B-eAX0dU-A5bAbj0VBT4",
          },
        }
      );
      return item;
    } catch {
      console.log("error");
    }
  };

  const mutation = useMutation(patchProduct, {
    onSuccess: () => {
      refetch();
      setEdit([]);
    },
  });

  const handleSave = async () => {
    await Promise.all(
      edit.map(async (item) => {
        await patchProduct(item);
        return mutation.mutateAsync(item);
      })
    );
    if (!mutation.error) {
      toast.success("ویرایش با موفقیت انجام شد.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
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
      <HStack className="mb-16 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-700">
          مدیریت موجودی و قیمت‌ها
        </Text>
        <Button
          onClick={() => handleSave()}
          style={{ backgroundColor: "#3382B7" }}
          className="disabled:bg-slate-500"
          disabled={!edit || mutation.isLoading}
        >
          {mutation.isLoading ? "در حال ذخیره‌سازی..." : "ذخیره"}
        </Button>
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
            {products.map((item: Product) => (
              <TrComponent
                item={item}
                key={item._id}
                edit={edit}
                setEdit={setEdit}
              />
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
            {totalPage}/{currentPage}
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

export default InventoryPanel;
