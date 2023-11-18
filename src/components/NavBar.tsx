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
import { useCategory } from "../contexts/categoryContext";

const NavBar = () => {
  const { setSelectedCategory } = useCategory();
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
          <GridItem onClick={() => setSelectedCategory(0)}>
            <Text fontWeight={"700"} cursor={"pointer"}>
              Notely
            </Text>
          </GridItem>
          <GridItem>
            <SearchInput />
          </GridItem>
          <GridItem justifySelf={"end"}>
            <Stack direction={"row"} spacing={7}>
              <ThemeSwitch />
              <AddForm />
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default NavBar;
