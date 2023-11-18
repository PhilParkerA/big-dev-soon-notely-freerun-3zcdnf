import {
  Box,
  Center,
  Image,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import categories from "../constants/categories";
import { useCategory } from "../contexts/categoryContext";
import { useNotes } from "../contexts/notesContext";
import NoteCard from "./NoteCard";
import NoteCardContainer from "./NoteCardContainer";
import NotesGrid from "./NotesGrid";
import NoNotesSvg from "../assets/no-notes-illustration.svg";
import NoSearchResultsSvg from "../assets/no-search-results-illustration.svg";
import { Note } from "../hooks/useNotesHook";
import { useSearchText } from "../contexts/searchTextContext";

const CategoryTabs = () => {
  const { notes } = useNotes();
  const { searchText, setSearchText } = useSearchText();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleTabChange = (category: number) => {
    setSelectedCategory(category);
  };

  const includesSearch = (note: Note) => {
    if (note) {
      const titleIncludesSearch =
        searchText &&
        note.title &&
        note.title.toLowerCase().includes(searchText.toLowerCase());
      const descriptionIncludesSearch =
        searchText &&
        note.description &&
        note.description.toLowerCase().includes(searchText.toLowerCase());

      return searchText
        ? titleIncludesSearch || descriptionIncludesSearch
        : true;
    }
  };

  return (
    <Tabs
      mt={5}
      variant={"unstyled"}
      index={selectedCategory}
      onChange={handleTabChange}
    >
      <TabList>
        {categories.map((cat, index) => (
          <Tab
            key={index}
            _selected={{
              color: "brand.500",
              fontWeight: "700",
              borderBottom: "2px",
            }}
            _hover={{
              color: "brand.500",
            }}
          >
            {cat}
          </Tab>
        ))}
      </TabList>
      {/* <Show above="lg"> */}
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="brand.500"
        borderRadius="1px"
      />
      {/* </Show> */}
      <TabPanels>
        {categories.map((cat, index) =>
          index === 0 ? (
            //output all notes or no notes
            <TabPanel key={index}>
              {notes &&
              notes?.filter((note) => includesSearch(note)).length > 0 ? (
                <NotesGrid>
                  {notes?.map(
                    (note) =>
                      includesSearch(note) && (
                        <NoteCardContainer key={note.id}>
                          <NoteCard note={note} />
                        </NoteCardContainer>
                      )
                  )}
                </NotesGrid>
              ) : (
                <Center height={"50vh"}>
                  <VStack>
                    <Image
                      src={searchText ? NoSearchResultsSvg : NoNotesSvg}
                      alt="No notes"
                      boxSize={"4xs"}
                    />
                    <Text mt={3} fontWeight={"700"}>
                      You don't have any notes
                    </Text>
                  </VStack>
                </Center>
              )}
            </TabPanel>
          ) : (
            //output notes by categories or no notes if category has no notes
            <TabPanel key={index}>
              {notes &&
              notes?.filter(
                (note) => includesSearch(note) && note.category === cat
              ).length > 0 ? (
                <NotesGrid>
                  {notes?.map(
                    (note) =>
                      note.category === cat &&
                      includesSearch(note) && (
                        <NoteCardContainer key={note.id}>
                          <NoteCard note={note} />
                        </NoteCardContainer>
                      )
                  )}
                </NotesGrid>
              ) : (
                <Center height={"50vh"}>
                  <VStack>
                    <Image
                      src={searchText ? NoSearchResultsSvg : NoNotesSvg}
                      alt="No notes"
                      boxSize={"4xs"}
                    />
                    <Text mt={3} fontWeight={"700"}>
                      {searchText
                        ? "No search results found"
                        : "You don't have any notes"}
                    </Text>
                  </VStack>
                </Center>
              )}
            </TabPanel>
          )
        )}
      </TabPanels>
    </Tabs>
  );
};

export default CategoryTabs;
