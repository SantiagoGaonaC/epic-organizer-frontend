import React, { useEffect, useState } from "react";
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
import { TaskServiceAxios, TaskUpdateServices } from "@/services";

export const useMyModalTask = (
  initialSelectedDate: Date | undefined,
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  fetchTasks: () => Promise<ITask[]>,
  updateTaskInState: (updatedTask: ITask) => void
) => {
  const { isOpen, onOpen: onDisclosureOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate || null
  );
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(false);
  const [desc, setDesc] = useState("");
  const taskService = new TaskServiceAxios();
  const updateTaskService = new TaskUpdateServices();

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.task_title);
      setDesc(selectedTask.description);
      setSelectedDate(new Date(selectedTask.date));
      setToggle(selectedTask.toggle);
    }
  }, [selectedTask]);

  const onTaskOpen = (task: ITask) => {
    setSelectedTask(task);
    onDisclosureOpen(); // Use the renamed function here
  };

  const onOpen = () => {
    setSelectedTask(null);
    onDisclosureOpen(); // Use the renamed function here
  };

  const handleFormSubmit = async () => {
    if (!selectedDate) {
      return;
    }
    if (selectedTask) {
      // si se seleccionó una tarea, la actualizamos
      const updatedTask = {
        ...selectedTask,
        task_title: title,
        category: "Personal",
        description: desc,
        date: selectedDate.toISOString(),
        toggle: toggle,
      };
      await updateTaskService.updateTask(selectedTask._id, updatedTask);
      if (updateTaskInState) {
        updateTaskInState(updatedTask); // Call the new function here
      }
    } else {
      // de lo contrario, creamos una nueva tarea
      const newTask = await taskService.createTask(
        title,
        "Personal",
        desc,
        selectedDate.toISOString(),
        toggle
      );
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTitle("");
    setToggle(false);
    onClose();
    fetchTasks();
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
              value={title} // Actualiza este valor
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
              isChecked={toggle}
              isDisabled={false}
              onChange={(e) => setToggle(e.target.checked)}
            >
              Hecho
            </Checkbox>
            <FormControl mt={4}>
              <Editable
                defaultValue="D e t a l l e s . . ."
                onChange={(e) => setDesc(e)}
              >
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

  return { onOpen, onTaskOpen, ModalComponent, selectedDate, setSelectedDate };
};
