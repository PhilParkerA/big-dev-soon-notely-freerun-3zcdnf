import { Input, InputGroup, InputLeftElement, Show } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form>
      <Show above="md">
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
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
