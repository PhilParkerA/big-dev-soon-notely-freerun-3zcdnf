import {
  Center,
  Hide,
  Show,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import categories from "../constants/categories";
import { useIsChecked } from "../contexts/IsCheckedContext";
import { useCategory } from "../contexts/categoryContext";
import { useNotes } from "../contexts/notesContext";
import { useSearchText } from "../contexts/searchTextContext";
import { Note } from "../hooks/useNotesHook";
import NoNotes from "./NoNotes";
import NoteCard from "./NoteCard";
import NoteCardContainer from "./NoteCardContainer";
import NotesGrid from "./NotesGrid";
import ShowCompletedCheckBox from "./ShowCompletedCheckBox";
import TabSelect from "./TabSelect";

const CategoryTabs = () => {
  const { notes, setNotes } = useNotes();
  const { searchText } = useSearchText();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const { isChecked } = useIsChecked();

  const [originalNotes, setOriginalNotes] = useState(notes);
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [unCompletedNotes, setUnCompletedNotes] = useState(0);

  useEffect(() => {
    setOriginalNotes(notes);
  }, [isChecked ? null : notes]);

  useEffect(() => {
    if (notes === originalNotes) {
      if (originalNotes && !updatingNotes) {
        setUpdatingNotes(true);
        setNotes((prevNotes) =>
          isChecked
            ? prevNotes?.filter((n) => n.completed === true)
            : originalNotes
        );
        setUpdatingNotes(false);
      }
    } else {
      //This is where you left off
    }
  }, [isChecked, notes]);

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
      <Hide below="md">
        <Wrap as={TabList}>
          {categories.map((cat, index) => (
            <WrapItem
              key={index}
              display={{ sm: "flex" }}
              width={{ sm: 100, lg: "max-content" }}
              justifyContent={"center"}
            >
              <Tab
                justifySelf={"center"}
                _selected={{
                  color: "brand.500",
                  fontWeight: "700",
                  borderBottom: { sm: "2px", lg: "none" },
                }}
                _hover={{
                  color: "brand.500",
                }}
              >
                {cat}
              </Tab>
            </WrapItem>
          ))}
        </Wrap>
        <TabIndicator
          mt="-1.5px"
          height={{ base: 0, lg: "2px" }}
          bg="brand.500"
          borderRadius="1px"
        />
      </Hide>
      <Show below="md">
        <TabSelect />
      </Show>
      <Hide above="md">
        <Center>
          <ShowCompletedCheckBox />
        </Center>
      </Hide>
      <TabPanels>
        {categories.map((cat, index) =>
          index === 0 ? (
            //output all notes or no notes
            <TabPanel key={index}>
              {notes &&
              notes?.filter((note) => includesSearch(note)).length > 0 ? (
                <NotesGrid>
                  {notes
                    ?.map(
                      (note) =>
                        includesSearch(note) &&
                        note.completed !== true && (
                          <NoteCardContainer key={note.id}>
                            <NoteCard note={note} key={note.id} />
                          </NoteCardContainer>
                        )
                    )
                    .reverse()}
                  {notes
                    ?.map(
                      (note) =>
                        includesSearch(note) &&
                        note.completed === true && (
                          <NoteCardContainer key={note.id}>
                            <NoteCard note={note} key={note.id} />
                          </NoteCardContainer>
                        )
                    )
                    .reverse()}
                </NotesGrid>
              ) : (
                <NoNotes />
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
                <NoNotes />
              )}
            </TabPanel>
          )
        )}
      </TabPanels>
    </Tabs>
  );
};

export default CategoryTabs;
