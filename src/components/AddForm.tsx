import {
  Button,
  FormControl,
  FormLabel,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import categories from "../constants/categories";
import { useNotes } from "../contexts/notesContext";
import useNotesHook from "../hooks/useNotesHook";

const AddForm = () => {
  const { notes } = useNotes();
  const { addNote } = useNotesHook();
  const [uniqueId, setUniqueId] = useState(uuidv4());
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[1]);
  const [completed, setCompleted] = useState(false);

  const generateNewId = () => {
    const newId = uuidv4();
    setUniqueId(newId);
  };

  const handleSave = () => {
    generateNewId();
    if (notes) {
      const newNote = {
        id: uniqueId,
        title,
        description,
        category,
        completed,
        date: new Date().toISOString().slice(0, 10),
      };

      addNote(newNote);
      setTimeout(() => {
        console.log("Updated notes:", notes);
      }, 100);

      console.log("Save note:", newNote);
    }
    // Reset the form state
    setTitle("");
    setDescription("");
    setCategory(categories[1]);
    setCompleted(false);

    // Close the modal
    onClose();
  };

  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        colorScheme="brand"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Add
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Add Note</ModalHeader>
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
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddForm;
