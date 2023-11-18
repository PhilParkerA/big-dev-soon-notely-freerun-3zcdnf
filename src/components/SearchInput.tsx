import { Input, InputGroup, InputLeftElement, Show } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useSearchText } from "../contexts/searchTextContext";

const SearchInput = () => {
  const { setSearchText } = useSearchText();

  return (
    <form>
      <Show above="md">
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            borderRadius={20}
            placeholder="Search notes..."
            variant="filled"
          />
        </InputGroup>
      </Show>
    </form>
  );
};

export default SearchInput;
