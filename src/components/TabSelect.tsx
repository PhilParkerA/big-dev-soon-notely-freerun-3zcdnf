import { Select } from "@chakra-ui/react";
import categories from "../constants/categories";
import { useCategory } from "../contexts/categoryContext";

const TabSelect = () => {
  const { setSelectedCategory } = useCategory();

  return (
    <Select
      placeholder="All"
      onChange={(e) =>
        setSelectedCategory(
          e.target.value ? categories.findIndex((c) => c === e.target.value) : 0
        )
      }
    >
      {categories.map(
        (cat, index) =>
          index > 0 && (
            <option key={index} value={cat}>
              {cat}
            </option>
          )
      )}
    </Select>
  );
};

export default TabSelect;
