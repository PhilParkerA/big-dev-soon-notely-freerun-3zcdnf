import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import categories from "../constants/categories";
import { useNotes } from "../contexts/notesContext";
import useNotesHook, { Note } from "../hooks/useNotesHook";

interface Props {
  note: Note;
}

const EditForm = ({ note }: Props) => {
  const { notes } = useNotes();
  const { updateNote } = useNotesHook();
  const [hueRotation, setHueRotation] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter={`blur(10px) hue-rotate(${hueRotation}deg)`}
      transition="background-color 0.3s ease-in-out"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [category, setCategory] = useState(note.category);
  const [completed, setCompleted] = useState(note.completed);

  const handleUpdate = () => {
    if (notes) {
      const updatedNote = {
        ...note,
        title,
        description,
        category,
        completed,
        date: new Date().toISOString().slice(0, 10),
      };

      updateNote(updatedNote);

      console.log("Updated note:", updatedNote);
    }

    // Close the modal
    onClose();
  };

  return (
    <>
      <Tooltip placement="top" label="Edit">
        <IconButton
          size={{ base: "sm", sm: "md" }}
          isRound={true}
          variant="solid"
          bg={"transparent"}
          aria-label="Done"
          icon={<FaPencil />}
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        />
      </Tooltip>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(
                  (cat, index) =>
                    index > 0 && (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    )
                )}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditForm;
