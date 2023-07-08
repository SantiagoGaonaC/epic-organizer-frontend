import React, { useState } from "react";
import {
  FormControl,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  Checkbox,
  Editable,
  EditablePreview,
  EditableTextarea,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ITask } from "@/models";
import { TaskServiceAxios } from "@/services/createTask.services";

export const useMyModalTask = (
  initialSelectedDate: Date | undefined,
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  fetchTasks: () => Promise<ITask[]>
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate || null
  );
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(false);
  const taskService = new TaskServiceAxios();

  const handleFormSubmit = async () => {
    if (!selectedDate) {
      return;
    }

    const newTask = await taskService.createTask(
      title,
      "Personal",
      "Ir al body",
      selectedDate.toISOString(),
      toggle
    );

    setTitle("");
    setToggle(false);
    onClose();

    fetchTasks().then((updatedTasks) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  };

  const onSubmit = () => {
    handleFormSubmit(); // call handleFormSubmit when form is submitted
  };

  const handleTitleSubmit = (nextValue: string) => {
    setTitle(nextValue);
  };

  const ModalComponent = (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onSubmit} // use onSubmit handler for onClose
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Editable
              submitOnBlur={true}
              defaultValue="Título de la tarea"
              onSubmit={handleTitleSubmit} // Pass the submit handler function here
              onChange={(e) => setTitle(e)}
            >
              <EditablePreview />
              <EditableTextarea />
            </Editable>
            <Tag
              size={"lg"}
              key={"lg"}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>Green</TagLabel>
              <TagCloseButton />
            </Tag>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <DatePicker
              dateFormat="MM/dd/yyyy"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
            />
            <Checkbox
              isDisabled={false}
              onChange={(e) => setToggle(e.target.checked)}
            >
              Hecho
            </Checkbox>
            <FormControl mt={4}>
              <Editable defaultValue="D e t a l l e s . . .">
                <EditablePreview />
                <EditableTextarea
                  style={{ height: "200px", overflow: "auto" }}
                />
              </Editable>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return { onOpen, ModalComponent, selectedDate, setSelectedDate };
};
