import { Button, useColorModeValue } from "@chakra-ui/react";
import { useCategory } from "../contexts/categoryContext";
import categories from "../constants/categories";

interface Props {
  category: string;
}

const Category = ({ category }: Props) => {
  const { setSelectedCategory } = useCategory();
  return (
    <Button
      onClick={() =>
        setSelectedCategory(categories.findIndex((c) => c === category))
      }
      size={"xs"}
      rounded={"xl"}
      px={3}
      bg={useColorModeValue("brand.500", "brand.100")}
      color={useColorModeValue("white", "brand.700")}
      _hover={{
        background: useColorModeValue("brand.700", "white"),
      }}
    >
      {category}
    </Button>
  );
};

export default Category;
