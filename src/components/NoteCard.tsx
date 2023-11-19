import {
  Box,
  Center,
  HStack,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { MouseEvent, useRef } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Note } from "../hooks/useNotesHook";
import Category from "./Category";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {

  // Create a ref for the button
  const otherButtonRef = useRef<HTMLButtonElement | null>(null);

  const initiateDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const cardNode =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement;
    if (cardNode) {
      cardNode?.classList.replace("note-card", "delete-note");
    }
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
                size={{ base: "sm", sm: "md" }}
                isRound={true}
                variant="solid"
                bg={"transparent"}
                aria-label="Done"
                icon={<MdCheckBoxOutlineBlank />}
              />
            </Tooltip>
            <EditForm note={note} />
            <DeleteForm note={note} otherButtonRef={otherButtonRef} />
            <button
              ref={otherButtonRef}
              className="hidden"
              onClick={initiateDelete}
            >
              unseen
            </button>
          </HStack>
        </HStack>
        <Heading
          fontFamily={"Montserrat"}
          fontWeight={"bold"}
          fontSize={{ base: "x;", sm: "2xl" }}
        >
          {note.title}
        </Heading>
        <Text mt={2} fontSize={{ base: 10, sm: "sm" }}>
          {note.description}
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
