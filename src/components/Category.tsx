import { Button, useColorModeValue } from "@chakra-ui/react";
import { useCategory } from "../contexts/categoryContext";
import categories, { categoryColors } from "../constants/categories";

interface Props {
  category: string;
}

const Category = ({ category }: Props) => {
  const { setSelectedCategory } = useCategory();

  const catColors = categoryColors[category]
  return (
    <Button
      className="card-category-button"
      onClick={() =>
        setSelectedCategory(categories.findIndex((c) => c === category))
      }
      size={"xs"}
      rounded={"xl"}
      px={3}
      fontSize={{ base: 10, sm: "xs" }}
      bg={useColorModeValue(catColors[0], catColors[1])}
      color={useColorModeValue(catColors[1], catColors[0])}
      _hover={{
        background: useColorModeValue("brand.700", "white"),
      }}
    >
      {category}
    </Button>
  );
};

export default Category;
