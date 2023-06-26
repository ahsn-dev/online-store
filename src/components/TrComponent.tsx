import { Tr, Td } from "@chakra-ui/react";
import { truncateText } from "../utils/truncateText";
import { useEffect, useState } from "react";
import { EditedData } from "../entities/EditedData";
import { Product } from "../entities/Product";

interface Props {
  item: Product;
  edit: EditedData[];
  setEdit: React.Dispatch<React.SetStateAction<EditedData[]>>;
}

const TrComponent = ({ item, edit, setEdit }: Props) => {
  const [editedData, setEditedData] = useState<EditedData>({
    id: item._id || "",
    price: item.price,
    quantity: item.quantity || 0,
  });

  useEffect(() => {
    const checkValue = edit.find((d) => d.id === item._id);
    if (checkValue) {
      setEditedData(checkValue);
    }
  }, [edit, item._id]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    const newEditedData = { ...editedData, price: value };
    setEditedData(newEditedData);
    updateEditData(newEditedData);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const newEditedData = { ...editedData, quantity: value };
    setEditedData(newEditedData);
    updateEditData(newEditedData);
  };

  const updateEditData = (newData: EditedData) => {
    const findEditedItem = edit.findIndex((item) => item.id === editedData.id);
    const copyEdit = [...edit];
    if (findEditedItem !== -1) {
      copyEdit[findEditedItem] = newData;
    } else {
      copyEdit.push(newData);
    }
    setEdit(copyEdit);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      // Reset the input value to the original value
      setEditedData({
        id: item._id || "",
        price: item.price,
        quantity: item.quantity || 0,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <Tr>
      <Td>{truncateText(item.name, 60)}</Td>
      <Td style={{ textAlign: "center" }}>
        <input
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            color: "#191970",
          }}
          type="text"
          value={formatPrice(editedData.price)}
          name="price"
          onChange={handlePriceChange}
          onKeyDown={handleKeyDown}
        />
      </Td>
      <Td style={{ textAlign: "center" }}>
        <input
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            color: "#191970",
          }}
          type="number"
          name="quantity"
          value={editedData.quantity}
          onChange={handleQuantityChange}
          onKeyDown={handleKeyDown}
        />
      </Td>
    </Tr>
  );
};

export default TrComponent;
