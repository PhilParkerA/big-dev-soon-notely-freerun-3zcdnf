import { Center, VStack, Image, Text } from "@chakra-ui/react";

import NoNotesSvg from "../assets/no-notes-illustration.svg";
import NoSearchResultsSvg from "../assets/no-search-results-illustration.svg";
import { useSearchText } from "../contexts/searchTextContext";
import { useIsChecked } from "../contexts/IsCheckedContext";

const NoNotes = () => {
  const { searchText } = useSearchText();
  const { isChecked } = useIsChecked();
  return (
    <Center height={"50vh"}>
      <VStack>
        <Image
          src={searchText ? NoSearchResultsSvg : NoNotesSvg}
          alt="No notes"
          boxSize={"4xs"}
        />
        <Text mt={3} fontWeight={"700"}>
          {searchText
            ? "No notes found ..."
            : `You don't have any ${isChecked ? "completed" : ""} notes`}
        </Text>
      </VStack>
    </Center>
  );
};

export default NoNotes;
