import { Box, useColorModeValue } from "@chakra-ui/react";
import CategoryTabs from "./components/CategoryTabs";
import Footer from "./components/Footer";
import HeadingComp from "./components/HeadingComp";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")} h={"100%"}>
      <NavBar/>
      <Box
        mx={"auto"}
        px={{base: 2, sm: 10}}
        my={"50px"}
        maxW={"1600px"}
        className="main-body"
      >
        <HeadingComp/>
        <CategoryTabs/>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
