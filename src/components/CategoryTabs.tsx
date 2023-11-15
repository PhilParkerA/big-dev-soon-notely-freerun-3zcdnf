import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import categories from "../constants/categories";
import useNotes from "../hooks/useNotes";
import NoteCard from "./NoteCard";
import NoteCardContainer from "./NoteCardContainer";
import NotesGrid from "./NotesGrid";

interface Props {
  setSelectedCategory: (category: number) => void;
}

const CategoryTabs = ({ setSelectedCategory }: Props) => {
  const { notes } = useNotes();

  const handleTabChange = (category: number) => {
    setSelectedCategory(category);
  };

  return (
    <Tabs mt={5} variant={"unstyled"} onChange={handleTabChange}>
      <TabList>
        <Tab _selected={{ color: "brand.500" }}>All</Tab>
        {categories.map((cat, index) => (
          <Tab key={index} _selected={{ color: "brand.500" }}>
            {cat}
          </Tab>
        ))}
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="brand.500"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel>
          <NotesGrid>
            {notes?.map((note) => (
              <NoteCardContainer key={note.id}>
                <NoteCard note={note} />
              </NoteCardContainer>
            ))}
          </NotesGrid>
        </TabPanel>
        {categories.map((cat, index) => (
          <TabPanel key={index}>
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
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CategoryTabs;
