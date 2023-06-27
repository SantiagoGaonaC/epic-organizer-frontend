import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { MyModalTask } from "./MyModalTask";

export const MyInsertTask = () => {
  const { onOpen, ModalComponent } = MyModalTask();

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
