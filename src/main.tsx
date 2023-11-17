import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";
import { NotesProvider } from "./contexts/notesContext";
import { CategoryProvider } from "./contexts/categoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <NotesProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </NotesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
