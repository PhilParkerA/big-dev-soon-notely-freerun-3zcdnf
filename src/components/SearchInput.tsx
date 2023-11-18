import { Input, InputGroup, InputLeftElement, Show } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchText } from "../contexts/searchTextContext";

const SearchInput = () => {
  const { searchText, setSearchText } = useSearchText();

  return (
    <form>
      <Show above="md">
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(searchText);
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
