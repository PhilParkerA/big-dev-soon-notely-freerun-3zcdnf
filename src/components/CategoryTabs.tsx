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

const CategoryTabs = () => {
  const { notes } = useNotes();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleTabChange = (category: number) => {
    setSelectedCategory(category);
  };

  return (
    <Tabs
      mt={5}
      variant={"unstyled"}
      index={selectedCategory}
      onChange={handleTabChange}
    >
      <TabList>
        {categories.map((cat) => (
          <Tab
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
            <TabPanel key={index}>
              {notes && notes.length > 0 ? (
                <NotesGrid>
                  {notes?.map((note) => (
                    <NoteCardContainer key={note.id}>
                      <NoteCard note={note} />
                    </NoteCardContainer>
                  ))}
                </NotesGrid>
              ) : (
                <Center height={"50vh"}>
                  <VStack>
                    <Image src={NoNotesSvg} alt="No notes" boxSize={"4xs"} />
                    <Text mt={3} fontWeight={"700"}>
                      You don't have any notes
                    </Text>
                  </VStack>
                </Center>
              )}
            </TabPanel>
          ) : (
            <TabPanel key={index}>
              {notes &&
              notes?.filter((note) => note.category === cat).length > 0 ? (
                <NotesGrid>
                  {notes?.map(
                    (note) =>
                      note.category === cat && (
                        <NoteCardContainer key={note.id}>
                          <NoteCard note={note} />
                        </NoteCardContainer>
                      )
                  )}
                </NotesGrid>
              ) : (
                <Center height={"50vh"}>
                  <VStack>
                    <Image src={NoNotesSvg} alt="No notes" boxSize={"4xs"} />
                    <Text mt={3} fontWeight={"700"}>
                      You don't have any notes
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
