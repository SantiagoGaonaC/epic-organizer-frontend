import React, { useContext, useEffect, useState } from "react";
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
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ITask } from "@/models";
import {
  TaskDeleteServices,
  TaskServiceAxios,
  TaskUpdateServices,
} from "@/services";
import { TaskContext } from "@/context/TaskContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { getColorModeDate } from "@/utilities/Date.color.utilities";

export const useMyModalTask = (
  initialSelectedDate: Date | undefined,
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
  const { updateTask, createTask } = useContext(TaskContext)!;
  const [date, setDate] = useState(new Date());

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
    onDisclosureOpen();
  };

  const onOpen = () => {
    setSelectedTask(null);
    onDisclosureOpen();
  };

  const handleFormSubmit = async () => {
    if (!selectedDate) {
      return;
    }
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        task_title: title,
        category: "Personal",
        description: desc,
        date: selectedDate.toISOString(),
        toggle: toggle,
      };
      await updateTask(selectedTask._id, updatedTask).then(() => {
        fetchTasks();
        if (updateTaskInState) {
          updateTaskInState(updatedTask); // Call the new function here
        }
      });
    } else if (title.trim() !== "") {
      // Validar que el título no esté vacío
      const newTask = {
        _id: "",
        user: "",
        __v: 0,
        task_title: title,
        category: "Personal",
        description: desc,
        date: selectedDate.toISOString(),
        toggle: toggle,
      };
      await createTask(newTask);
    }

    setTitle("");
    setToggle(toggle);
    fetchTasks();
    onClose();
  };

  const onSubmit = () => {
    handleFormSubmit();
  };

  const taskDelete = new TaskDeleteServices();

  const onDelete = async () => {
    if (selectedTask) {
      await taskDelete.deleteTask(selectedTask._id);
      fetchTasks();
      onClose();
    }
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
        <ModalContent
          bg={useColorModeValue("gray.900", "gray.100")}
          color={useColorModeValue("white", "black")}
        >
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
            {selectedDate !== null && (
              <SingleDatepicker
                name="date-input"
                date={selectedDate}
                onDateChange={(date: Date) => setSelectedDate(date)}
                propsConfigs={getColorModeDate()}
              />
            )}
            <Checkbox
              isChecked={toggle}
              isDisabled={false}
              onChange={(e) => setToggle(e.target.checked)}
            >
              Hecho
            </Checkbox>
            <FormControl mt={4}>
              <Editable
                defaultValue={selectedTask?.description || "Detalles"}
                onChange={(e) => setDesc(e)}
              >
                <EditablePreview />
                <EditableTextarea
                  style={{ height: "200px", overflow: "auto" }}
                />
              </Editable>
            </FormControl>
            <IconButton
              border={"none"}
              variant="outline"
              aria-label="Borrar"
              fontSize="15px"
              icon={<DeleteIcon />}
              color={useColorModeValue("black", "white")}
              onClick={onDelete}
              isDisabled={!selectedTask}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return { onOpen, onTaskOpen, ModalComponent, selectedDate, setSelectedDate };
};
