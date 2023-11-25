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
import { useState } from "react";

const NavBar = () => {
  const { setSelectedCategory } = useCategory();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        h={"70px"}
        px={{base: 2, sm: 10}}
        mb={showSearch ? "80px" : 0}
        transition={"margin-bottom 0.25s ease-in-out"}
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
            <SearchInput
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />
          </GridItem>
          <GridItem justifySelf={"end"}>
            <Stack direction={"row"} spacing={{base: 4, sm: 7}} alignItems={"center"}>
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
