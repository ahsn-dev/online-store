import { Tr, Td } from "@chakra-ui/react";
import { truncateText } from "../utils/truncateText";
import { Product } from "../entities/ProductsPanel";
import { useEffect, useState } from "react";
import { EditedData } from "../entities/EditedData";

interface Props {
  item: Product;
  edit: EditedData[];
  setEdit: React.Dispatch<React.SetStateAction<EditedData[]>>;
}

const TrComponent = ({ item, edit, setEdit }: Props) => {
  const [editedData, setEditedData] = useState<EditedData>({
    id: item._id,
    price: item.price,
    quantity: item.quantity,
  });

  useEffect(() => {
    const checkValue = edit.find((d) => d.id === item._id);
    if (checkValue) {
      setEditedData(checkValue);
    }
  }, []);

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
          type="number"
          value={editedData.price}
          name="price"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            const newEditedData = { ...editedData, price: value };
            setEditedData(newEditedData);
            const findEditedItem = edit.findIndex(
              (item) => item.id === editedData.id
            );
            const copyEdit = [...edit];
            if (findEditedItem !== -1) {
              copyEdit[findEditedItem].price = value;
            } else {
              copyEdit.push(newEditedData);
            }
            setEdit(copyEdit);
          }}
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
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            const newEditedData = { ...editedData, quantity: value };
            setEditedData(newEditedData);
            const findEditedItem = edit.findIndex(
              (item) => item.id === editedData.id
            );
            const copyEdit = [...edit];
            if (findEditedItem !== -1) {
              copyEdit[findEditedItem].quantity = value;
            } else {
              copyEdit.push(newEditedData);
            }
            setEdit(copyEdit);
          }}
        />
      </Td>
    </Tr>
  );
};

export default TrComponent;
