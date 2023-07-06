import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { useMyModalTask } from "./useMyModalTask";
import { ITask } from "@/models/Task.models";
import { useEffect } from "react";

export const MyInsertTask = ({
  selectedDate,
  setTasks,
  fetchTasks,
}: {
  selectedDate?: Date | null;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  fetchTasks: () => Promise<ITask[]>;
}) => {
  const {
    onOpen,
    ModalComponent,
    selectedDate: modalSelectedDate,
    setSelectedDate: setModalSelectedDate,
  } = useMyModalTask(selectedDate || undefined, setTasks, fetchTasks);

  useEffect(() => {
    setModalSelectedDate(selectedDate === undefined ? null : selectedDate); // Update the selectedDate in the useMyModalTask hook
  }, [selectedDate, setModalSelectedDate]);

  return (
    <>
      <IconButton
        color={useColorModeValue("white", "black")}
        variant="outline"
        size="xs"
        aria-label="Add Task"
        icon={<AddIcon />}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
        }}
        onClick={onOpen}
      />
      {ModalComponent}
    </>
  );
};
