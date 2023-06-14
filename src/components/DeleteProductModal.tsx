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
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";

interface Props {
  itemId: string;
  queryKey: string; // the query key used to fetch the product list
  queryClient: QueryClient; // the query client instance
}

const DeleteProductModal = ({ itemId, queryKey, queryClient }: Props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");

  const handleDeleteProduct = async (productId: string) => {
    setDeleteModalOpen(true);
    setDeleteProductId(productId);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/products/${deleteProductId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NjQ5Nzc1NywiZXhwIjoxNjg5MDg5NzU3fQ.EBYv0Kj6kD1oFbhmsULf4Q6B-eAX0dU-A5bAbj0VBT4",
          },
        }
      );
      await queryClient.invalidateQueries([queryKey]); // invalidate the query to refetch the data
      //   refetch();
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
