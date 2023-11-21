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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import categories from "../constants/categories";
import useNotesHook from "../hooks/useNotesHook";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters" })
    .max(40),
  description: z.string().min(0).max(200),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type FormData = z.infer<typeof schema>;

const AddForm = () => {
  const { addNote } = useNotesHook();
  const [uniqueId, setUniqueId] = useState(uuidv4());
  const [hueRotation, setHueRotation] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter={`blur(10px) hue-rotate(${hueRotation}deg)`}
      transition="background-color 0.3s ease-in-out"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const generateNewId = () => {
    const newId = uuidv4();
    setUniqueId(newId);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    generateNewId();
    if (data) {
      //Didn't use spread operator because of an error
      const newNote = {
        title: data.title,
        description: data.description,
        category: data.category,
        id: uniqueId,
        completed: false,
        date: new Date().toISOString().slice(0, 10),
      };
      addNote(newNote);
    }

    setTimeout(() => {
      toast({
        title: "Note added.",
        description: data.title,
        variant: "solid",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 600);

    onClose();
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title")}
                  autoFocus
                  placeholder="Note title"
                  maxLength={50}
                />
                {errors.title && (
                  <Text color="red.300" mt={2}>
                    {errors.title.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description (optional)</FormLabel>
                <Textarea
                  {...register("description")}
                  placeholder="Description..."
                  maxLength={200}
                />
                {errors.description && (
                  <Text color="red.300" mt={2}>
                    {errors.description.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select {...register("category")}>
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
              <Button
                disabled={!isValid}
                type={"submit"}
                colorScheme="blue"
                mr={3}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddForm;
