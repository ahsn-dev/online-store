import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { Product } from "../entities/Product";

interface Props {
  itemId: string;
  queryKey: string; // the query key used to fetch the product list
  queryClient: QueryClient;
  currentPage: number;
  checkProductTotalPage: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      {
        products: Product[];
        totalProducts: number;
        totalPage: number;
      },
      unknown
    >
  >;
  setCurrentPage: (page: number) => void;
}

const DeleteProductModal = ({
  itemId,
  queryKey,
  queryClient,
  currentPage,
  setCurrentPage,
  checkProductTotalPage,
  refetch,
}: Props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");

  const mutation = useMutation(
    async (productId: string) => {
      await axios.delete(`http://localhost:8000/api/products/${productId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NzYyMTA2OCwiZXhwIjoxNjkwMjEzMDY4fQ.4Md-7MchA4UtX1DZ2ecTffeBHWmQ7sfpt5ukc4K_0QM",
        },
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKey]);
        if (checkProductTotalPage) {
          setCurrentPage(currentPage - 1);
          refetch();
        }
      },
      onError: (error: any) => {
        console.error("Error deleting product:", error);
      },
    }
  );

  const handleDeleteProduct = async (productId: string) => {
    setDeleteModalOpen(true);
    setDeleteProductId(productId);
  };

  const confirmDeleteProduct = async () => {
    try {
      await mutation.mutateAsync(deleteProductId);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const cancelDeleteProduct = () => {
    setDeleteModalOpen(false);
    setDeleteProductId("");
  };

  return (
    <>
      <FcEmptyTrash
        onClick={() => handleDeleteProduct(itemId)}
        size={36}
        className="cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      />

      <Modal isOpen={isDeleteModalOpen} onClose={cancelDeleteProduct}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>آیا از حذف این محصول، مطمئن هستید؟</ModalHeader>
          <ModalBody>
            <Text>عملیات غیر قابل بازگشت می‌باشد.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteProduct}>
              بله
            </Button>
            <Button variant="ghost" onClick={cancelDeleteProduct}>
              خیر
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
