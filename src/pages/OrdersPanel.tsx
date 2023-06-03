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
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const OrdersPanel = () => {
  const [value, setValue] = React.useState("all");
  return (
    <>
      <HStack className="mb-16 flex justify-between px-4">
        <Text as="h2" className="text-2xl font-bold text-slate-700">
          مدیریت سفارش‌ها
        </Text>
        <RadioGroup onChange={setValue} value={value} dir="ltr">
          <Stack direction="row" className="text-slate-700">
            <Radio value="waiting" className="bg-blue-300">
              سفارش‌های در انتظار ارسال
            </Radio>
            <Radio value="done" className="bg-blue-300">
              سفارش‌های تحویل شده
            </Radio>
            <Radio value="all" className="bg-blue-300">
              همه‌ی سفارشات
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <TableContainer className="rounded border border-gray-400 p-2">
        <Table variant="striped" colorScheme="twitter">
          <Thead className="bg-blue-300 text-xl">
            <Tr className="text-xl">
              <Th style={{ fontSize: "18px", color: "#475569" }}>نام کاربر</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>مجموع مبلغ</Th>
              <Th style={{ fontSize: "18px", color: "#475569" }}>
                زمان ثبت سفارش
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  color: "#475569",
                  paddingRight: "46px",
                }}
              >
                جزئیات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>اکبر زمانی</Td>
              <Td>920,000</Td>
              <Td>20/10/2023</Td>
              <Td>
                <button className="underline underline-offset-[5px]">
                  بررسی سفارش
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>اکبر زمانی</Td>
              <Td>920,000</Td>
              <Td>20/10/2023</Td>
              <Td>
                <button className="underline underline-offset-[5px]">
                  بررسی سفارش
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>اکبر زمانی</Td>
              <Td>920,000</Td>
              <Td>20/10/2023</Td>
              <Td>
                <button className="underline underline-offset-[5px]">
                  بررسی سفارش
                </button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersPanel;
