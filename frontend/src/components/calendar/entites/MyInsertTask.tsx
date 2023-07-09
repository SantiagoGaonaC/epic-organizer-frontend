import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { useMyModalTask } from "./useMyModalTask";
import { useEffect, useState } from "react";
import { IMyInsertTaskProps, ITask } from "@/models";

export const MyInsertTask = ({
  selectedDate,
  setTasks,
  fetchTasks,
}: IMyInsertTaskProps) => {
  const updateTaskInState = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const {
    onOpen,
    ModalComponent,
    selectedDate: modalSelectedDate,
    setSelectedDate: setModalSelectedDate,
  } = useMyModalTask(
    selectedDate || undefined,
    setTasks,
    fetchTasks,
    updateTaskInState
  );

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
