import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search notes..."
          variant="filled"
          
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;

