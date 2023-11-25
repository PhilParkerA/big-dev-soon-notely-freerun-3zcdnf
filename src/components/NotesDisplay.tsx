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
import categories from "../constants/categories";
import { useCategory } from "../contexts/categoryContext";
import { useNotes } from "../contexts/notesContext";
import useSearch from "../hooks/useSearch";
import AllNotes from "./AllNotes";
import CategoryNotes from "./CategoryNotes";
import NoNotes from "./NoNotes";
import ShowCompletedCheckBox from "./ShowCompletedCheckBox";
import TabSelect from "./TabSelect";

const CategoryTabs = () => {
  const { notes } = useNotes();
  const { includesSearch } = useSearch();
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
      <Hide below="md">
        <Wrap as={TabList} className="tab-wrap">
          {categories.map((cat, index) => (
            <WrapItem
              key={index}
            >
              <Tab
                className="cat-tab"
                _selected={{
                  color: "brand.500",
                  fontWeight: "700",
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
      </Hide>
      <TabIndicator
        className="cat-tab-line"
        mt="-1.5px"
        height={{ base: 0, lg: "2px" }}
        bg="brand.500"
        borderRadius="1px"
      />
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
                <AllNotes />
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
                <CategoryNotes category={cat} />
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
