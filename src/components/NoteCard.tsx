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
import { MouseEvent, useRef, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import useNotesHook, { Note } from "../hooks/useNotesHook";
import Category from "./Category";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  const { updateNote } = useNotesHook();
  const [isCompleted, setIsCompleted] = useState(false);

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
                icon={isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                onClick={() => {
                  setIsCompleted(!isCompleted);
                  const updatedNote = { ...note, completed: !note.completed };
                  updateNote(updatedNote);
                }}
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
