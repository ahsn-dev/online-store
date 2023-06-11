import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";

interface Props {
  itemId: string;
}

const EditProductModal = ({ itemId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // const mutation = useMutation(createProduct);
  const [category, setCategory] = useState("");

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [EditProductId, setEditProductId] = useState("");

  const [productData, setProductData] = useState<any>(null);

  const fetchProductData = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: product, isLoading: isLoadingProduct } = useQuery(
    ["product", EditProductId],
    () =>
      fetchProductData(`http://localhost:8000/api/products/${EditProductId}`),
    { enabled: isEditModalOpen }
  );

  useEffect(() => {
    if (product) {
      setProductData(product.data.product);
      console.log(product.data.product.category.name);
    }
  }, [product]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const image = (
      event.currentTarget.elements as unknown as { image: { files: FileList } }
    ).image.files;

    const ProductData = new FormData();
    const elements = event.currentTarget.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >('input:not([type="file"]), select, textarea');
    elements.forEach((element) => {
      ProductData.append(element.name, element.value);
      element.value = ""; // Clear the value of each input element
    });

    for (let i = 0; i < image.length; i++) {
      ProductData.append("images", image[i]);
    }
    console.log(Object.fromEntries(ProductData));
  };

  const fetchData = async (url: string) => {
    const response = await axios.get(url);
    return response.data.data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery(
    ["dataCategory"],
    () => fetchData("http://localhost:8000/api/categories")
  );

  const { data: dataSubCategory } = useQuery(
    ["dataSubCategory", category],
    () =>
      fetchData(`http://localhost:8000/api/subcategories?category=${category}`),
    { enabled: !!category }
  );

  if (isLoadingCategory) {
    return <div>Loading...</div>;
  }

  const updateProduct = async (productData: any) => {
    const response = await axios.patch(
      `http://localhost:8000/api/products/${itemId}`,
      productData,
      {
        headers: {
          "Content-Type": `multipart/form-data;
                boundary=${productData._boundary}`,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NjQwMzg1MCwiZXhwIjoxNjg4OTk1ODUwfQ.V7g8eW4ayiJeXEv-1domsqEqP_1bpZySO8FvlLIScp0"}`,
        },
      }
    );
    return response.data;
  };

  const handleEditProduct = (itemId: string) => {
    setEditProductId(itemId);
    setEditModalOpen(true);
    onOpen();
  };

  return (
    <>
      <FcEditImage
        onClick={() => handleEditProduct(itemId)}
        size={36}
        className="cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex className="flex-col items-end rounded-sm bg-slate-400">
            <ModalCloseButton className="mt-[6px] bg-slate-400 text-slate-800" />
            <ModalHeader className="text-slate-800">
              افزودن/ویرایش کالا
            </ModalHeader>
          </Flex>
          <ModalBody pb={6} className="rounded-sm bg-slate-400">
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box
                as="form"
                onSubmit={handleSubmit}
                className="flex flex-col p-8 text-slate-800"
              >
                <Flex flexWrap="wrap" className="mb-4 gap-4">
                  <FormControl flex="1" mr={2}>
                    <FormLabel>نام</FormLabel>
                    <Input
                      ref={initialRef}
                      style={{ borderColor: "black" }}
                      name="name"
                      defaultValue={productData?.name || ""}
                    />
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel>قیمت</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      name="price"
                      type="number"
                      defaultValue={productData?.price || ""}
                    />
                  </FormControl>
                </Flex>
                <Flex flexWrap="wrap" className="mb-4 gap-4">
                  <FormControl flex="1" mr={2}>
                    <FormLabel>برند</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      name="brand"
                      defaultValue={productData?.brand || ""}
                    />
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel>موجودی</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      name="quantity"
                      type="number"
                      defaultValue={productData?.quantity || ""}
                    />
                  </FormControl>
                </Flex>
                <Flex className="mb-4 gap-4">
                  <FormControl className="pr-2">
                    <FormLabel>توضیحات</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      name="description"
                      defaultValue={productData?.description || ""}
                    />
                  </FormControl>
                  <FormControl className="flex flex-wrap gap-x-4">
                    <FormLabel>انتخاب عکس محصول</FormLabel>
                    <input
                      name="image"
                      type="file"
                      multiple
                      style={{
                        direction: "ltr",
                        border: "1px solid black",
                        padding: "2px",
                        borderRadius: "0.375rem",
                        width: "100%",
                        marginBottom: "8px",
                        fontSize: "14px",
                      }}
                    />
                  </FormControl>
                </Flex>
                <FormControl className="pr-2">
                  <FormLabel>دسته بندی</FormLabel>
                  <Select
                    style={{ borderColor: "black", padding: "0 2rem" }}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">انتخاب دسته بندی</option>
                    {dataCategory?.categories.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {category && (
                  <FormControl className="mt-4 pr-2">
                    <FormLabel>زیر دسته</FormLabel>
                    <Select
                      style={{ borderColor: "black", padding: "0 2rem" }}
                      name="subcategory"
                    >
                      <option value="">انتخاب زیر دسته</option>
                      {dataSubCategory?.subcategories.map(
                        (subcategory: any) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
                <Button
                  type="submit"
                  mt={8}
                  style={{ backgroundColor: "#0F4C75" }}
                  className="mx-auto"
                  onClick={onClose}
                >
                  اضافه کردن محصول
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProductModal;
