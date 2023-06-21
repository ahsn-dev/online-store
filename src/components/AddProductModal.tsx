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
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Subcategory, Category } from "../entities/ProductsPanel";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../entities/Product";

interface Props {
  currentPage: number;
  checkProductTotalPage: boolean;
  // fetchProducts: (page: number) => Promise<{
  //   products: Product[];
  //   totalProducts: number;
  //   totalPage: number;
  // }>;
  totalPage: number;
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

interface IFormInput {
  [key: string]: number | string | boolean | undefined;
  name: string;
  price: number;
  brand: string;
  quantity: number;
  description: string;
  image: string;
  category: string;
  subcategory: string;
}

const createProduct = async (productData: any) => {
  const response = await axios.post(
    "http://localhost:8000/api/products",
    productData,
    {
      headers: {
        "Content-Type": `multipart/form-data;
          boundary=${productData._boundary}`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZmZGE0ODA3MjkyNTdiOTExOTBhNCIsImlhdCI6MTY4NjQ5Njg3NywiZXhwIjoxNjg5MDg4ODc3fQ.p7IrkVVTSR0pZoq7wjeCR7Ju8R6aTVqmfo_FRBGtqz4",
      },
    }
  );
  return response.data;
};

const AddProductModal = ({
  currentPage,
  setCurrentPage,
  checkProductTotalPage,
  refetch,
  totalPage,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");

  const mutation = useMutation(createProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

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

  const submitAddForm: SubmitHandler<IFormInput> = (data) => {
    const ProductData = new FormData();

    for (let i = 0; i < data.image.length; i++) {
      ProductData.append("images", data.image[i]);
    }

    for (const key in data) {
      if (key !== "image") {
        ProductData.append(key, data[key] as string);
      }
    }

    mutation.mutate(ProductData, {
      onSuccess: () => {
        if (checkProductTotalPage) {
          refetch();
        } else {
          setCurrentPage(currentPage + totalPage);
        }
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} style={{ backgroundColor: "#3382B7" }}>
        افزودن کالا
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex className="flex-col items-end rounded-sm bg-slate-400">
            <ModalCloseButton className="mt-[6px] bg-slate-400 text-slate-800" />
            <ModalHeader className="text-slate-800">افزودن کالا</ModalHeader>
          </Flex>
          <ModalBody pb={6} className="rounded-sm bg-slate-400">
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box
                as="form"
                onSubmit={handleSubmit(submitAddForm)}
                className="flex flex-col p-8 text-slate-800"
              >
                <Flex flexWrap="wrap" className="mb-4 gap-4">
                  <FormControl flex="1" mr={2}>
                    <FormLabel>نام</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-700">نام الزامی است</span>
                    )}
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel>قیمت</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      type="number"
                      {...register("price", { required: true })}
                    />
                    {errors.price && (
                      <span className="text-red-700">قیمت الزامی است</span>
                    )}
                  </FormControl>
                </Flex>
                <Flex flexWrap="wrap" className="mb-4 gap-4">
                  <FormControl flex="1" mr={2}>
                    <FormLabel>برند</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      {...register("brand", { required: true })}
                    />
                    {errors.brand && (
                      <span className="text-red-700">برند الزامی است</span>
                    )}
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel>موجودی</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      {...register("quantity", { required: true })}
                      type="number"
                    />
                    {errors.quantity && (
                      <span className="text-red-700">موجودی الزامی است</span>
                    )}
                  </FormControl>
                </Flex>
                <Flex className="mb-4 gap-4">
                  <FormControl className="pr-2">
                    <FormLabel>توضیحات</FormLabel>
                    <Input
                      style={{ borderColor: "black" }}
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <span className="text-red-700">توضیحات الزامی است</span>
                    )}
                  </FormControl>
                  <FormControl className="flex flex-wrap gap-x-4">
                    <FormLabel>انتخاب عکس محصول</FormLabel>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      accept="image/*"
                      // multiple
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
                    {errors.image && (
                      <span className="text-red-700">
                        انتخاب عکس الزامی است
                      </span>
                    )}
                  </FormControl>
                </Flex>
                <FormControl className="pr-2">
                  <FormLabel>دسته بندی</FormLabel>
                  <Select
                    {...register("category", { required: true })}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ borderColor: "black", padding: "0 2rem" }}
                  >
                    <option value="">انتخاب دسته بندی</option>
                    {dataCategory?.categories.map((category: Category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  {errors.category && (
                    <span className="text-red-700">
                      انتخاب دسته بندی الزامی است
                    </span>
                  )}
                </FormControl>
                {category && (
                  <FormControl className="mt-4 pr-2">
                    <FormLabel>زیر دسته</FormLabel>
                    <Select
                      {...register("subcategory", { required: true })}
                      style={{ borderColor: "black", padding: "0 2rem" }}
                    >
                      <option value="">انتخاب زیر دسته</option>
                      {dataSubCategory?.subcategories.map(
                        (subcategory: Subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        )
                      )}
                    </Select>
                    {errors.subcategory && (
                      <span className="text-red-700">
                        انتخاب زیر دسته الزامی است
                      </span>
                    )}
                  </FormControl>
                )}
                <Button
                  type="submit"
                  mt={8}
                  style={{ backgroundColor: "#0F4C75" }}
                  className="mx-auto"
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

export default AddProductModal;
