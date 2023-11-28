import { ThemeConfig, extendTheme, useColorModeValue } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: useColorModeValue("gray.100", "gray.700"), // Dark and light mode background colors
      },
    }),
  },
  config,
  colors: {
    primary: {
      50: "#f0e3f7",
      100: "#d0bdf0",
      200: "#b08ae8",
      300: "#8f57e0",
      400: "#7f54f6",
      500: "#6936f5", // Your primary color here
      600: "#4809f2",
      700: "#390a87",
      800: "#280864",
      900: "#170640",
    },
    grey: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
    brand: {
      50: "#E5F7FA",
      100: "#C2E4F5",
      200: "#99D2EE",
      300: "#6EB9E5",
      400: "#4A9ACD",
      500: "#11b6ca", // Teal
      600: "#0E9AB1",
      700: "#0A7C92",
      800: "#086377",
      900: "#064D5B",
    },
  },
});

export default theme;
