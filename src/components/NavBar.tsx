"use client";

import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import SearchInput from "./SearchInput";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} h={'70px'} px={10}>
        <Grid
          templateColumns={"1fr 2fr 1fr"}
          h={'100%'}
          alignItems={"center"}
          maxWidth={"1600px"}
          mx={"auto"}
        >
          <GridItem>
            <Box>Notes App</Box>
          </GridItem>
          <GridItem>
            <SearchInput />
          </GridItem>
          <GridItem justifySelf={'end'}>
              <Stack direction={"row"} spacing={7}>
                <ThemeSwitch />
                <Button leftIcon={<MdAdd />} colorScheme="brand">
                  Add
                </Button>
              </Stack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default NavBar;
