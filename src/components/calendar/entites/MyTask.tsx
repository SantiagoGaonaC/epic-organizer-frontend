import { ITask } from "@/models";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  handleTaskClick: (task: ITask) => void;
  handleCheckboxChange: (task: ITask) => void;
  tasks: ITask[];
}

function MyTask({ tasks, handleTaskClick, handleCheckboxChange }: Props) {
  return (
    <div className="mt-7">
      {tasks.map((task) => (
        <Box
          key={task._id}
          className="m-1 list-outside border p-1 text-left text-xs "
          onClick={() => handleTaskClick(task)}
        >
          <Flex>
            <Flex
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Checkbox
                id={task._id}
                defaultChecked={task.toggle}
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(task);
                }}
              />
            </Flex>
            <Box>
              <Text fontSize="md" ml={1}>
                {task.task_title}
              </Text>
              <Text className="p-1">{task.category}</Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </div>
  );
}

export default MyTask;
