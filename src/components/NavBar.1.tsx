"use client";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AddForm from "./AddForm";
import SearchInput from "./SearchInput";
import ThemeSwitch from "./ThemeSwitch";
import { useNotes } from "../contexts/notesContext";

export const NavBar = () => {
  const { notes } = useNotes();

  const { addNote } = useNotesHook();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        h={"70px"}
        px={10}
      >
        <Grid
          templateColumns={"1fr 2fr 1fr"}
          h={"100%"}
          alignItems={"center"}
          maxWidth={"1600px"}
          mx={"auto"}
        >
          <GridItem>
            <Text fontWeight={"700"} cursor={"pointer"}>
              Notes App
            </Text>
          </GridItem>
          <GridItem>
            <SearchInput />
          </GridItem>
          <GridItem justifySelf={"end"}>
            <Stack direction={"row"} spacing={7}>
              <ThemeSwitch />
              <AddForm notes={notes} addNote={addNote} />
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
