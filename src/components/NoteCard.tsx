import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  HStack,
  Heading,
  useColorModeValue,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Category from "./Category";
import { Note } from "../hooks/useNotes";

interface Props{
  note: Note
}

const NoteCard = ({note}: Props) => {
  return (
    <Center>
      <Box
        p={5}
        rounded={"lg"}
        w={"100%"}
        height={"240px"}
        bg={useColorModeValue("white", "rgba(32,32,32,0.1)")}
        boxShadow={"lg"}
        pos={"relative"}
      >
        <HStack justifyContent={"space-between"} mb={5}>
          <Category category={note.category}/>
          <HStack spacing={0}>
            <IconButton
              isRound={true}
              variant="solid"
              bg={"transparent"}
              aria-label="Done"
              icon={<MdCheckBoxOutlineBlank />}
            />
            <IconButton
              isRound={true}
              variant="solid"
              bg={"transparent"}
              aria-label="Done"
              icon={<FaPencil />}
            />
            <IconButton
              isRound={true}
              variant="solid"
              bg={"transparent"}
              aria-label="Done"
              icon={<DeleteIcon />}
            />
          </HStack>
        </HStack>
        <Heading fontSize={"2xl"}>{note.title}</Heading>
        <Text mt={2} fontSize={"sm"}>
          {note.text}
        </Text>
        <Text
          color={"gray"}
          position={"absolute"}
          right={5}
          bottom={4}
          fontSize={"2xs"}
        >
          {note.date}
        </Text>
      </Box>
    </Center>
  );
};

export default NoteCard;
