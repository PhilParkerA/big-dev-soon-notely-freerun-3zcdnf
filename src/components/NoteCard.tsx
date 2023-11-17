import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  HStack,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import useNotesHook, { Note } from "../hooks/useNotesHook";
import Category from "./Category";
import EditForm from "./EditForm";
import { MouseEvent } from "react";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  const { deleteNote } = useNotesHook();
  const toast = useToast();

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const cardNode =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement;
    cardNode?.classList.replace("note-card", "delete-note");
    setTimeout(() => {
      deleteNote(note);
      toast({
        title: "Note deleted.",
        description: note.title,
        variant: "solid",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }, 600);
    console.log(cardNode);
  };
  return (
    <Center>
      <Box
        p={5}
        w={"100%"}
        height={"240px"}
        bg={useColorModeValue("rgba(255,255,255,0.3)", "rgba(32,32,32,0.1)")}
        boxShadow={"lg"}
        pos={"relative"}
      >
        <HStack justifyContent={"space-between"} mb={5}>
          <Category category={note.category} />
          <HStack spacing={0}>
            <Tooltip placement="top" label="Check">
              <IconButton
                isRound={true}
                variant="solid"
                bg={"transparent"}
                aria-label="Done"
                icon={<MdCheckBoxOutlineBlank />}
              />
            </Tooltip>
            <EditForm note={note} />

            <Tooltip placement="top" label="Delete">
              <IconButton
                onClick={handleDelete}
                isRound={true}
                variant="solid"
                bg={"transparent"}
                aria-label="Done"
                icon={<DeleteIcon />}
              />
            </Tooltip>
          </HStack>
        </HStack>
        <Heading fontFamily={"Montserrat"} fontWeight={"bold"} fontSize={"2xl"}>
          {note.title}
        </Heading>
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
