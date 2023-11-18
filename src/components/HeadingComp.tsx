import { Heading } from "@chakra-ui/react";
import categories from "../constants/categories";
import { useCategory } from "../contexts/categoryContext";

const HeadingComp = () => {
  const { selectedCategory } = useCategory();
  return (
    <Heading fontFamily={"Montserrat"} fontWeight={"bold"} textAlign={{base: 'center', lg: 'start'}}>
      {selectedCategory?categories[selectedCategory]:"Your"} notes
    </Heading>
  );
};

export default HeadingComp;
